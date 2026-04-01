import { useState, useCallback } from 'react'
import { FILESYSTEM } from '../data/filesystem'
import type { FSNode } from '../data/filesystem'

function getNode(path: string): FSNode | null {
  const parts = path.replace(/^~\/?/, '').split('/').filter(Boolean)
  let node: FSNode = FILESYSTEM.children['~']
  for (const part of parts) {
    if (node.type !== 'dir') return null
    const child = node.children[part]
    if (!child) return null
    node = child
  }
  return node
}

function resolvePath(cwd: string, input: string): string {
  if (input === '~' || input === '') return '~'
  if (input.startsWith('~')) return input
  if (input === '..') {
    const parts = cwd.split('/').filter(Boolean)
    if (parts.length <= 1) return '~'
    parts.pop()
    return parts.join('/')
  }
  return cwd === '~' ? `~/${input}` : `${cwd}/${input}`
}

export interface TermLine {
  type: 'input' | 'output' | 'error' | 'dir'
  text: string
}

export function useTerminal() {
  const [cwd, setCwd] = useState('~')
  const [history, setHistory] = useState<TermLine[]>([
    { type: 'output', text: 'welcome to portfolio terminal. type `help` for commands.' },
  ])

  const push = (lines: TermLine[]) => setHistory(h => [...h, ...lines])

  const run = useCallback((raw: string) => {
    const input = raw.trim()
    push([{ type: 'input', text: `${cwd} ❯ ${input}` }])

    if (!input) return

    const [cmd, ...args] = input.split(' ')
    const arg = args.join(' ')

    switch (cmd) {
      case 'pwd':
        push([{ type: 'output', text: cwd }])
        break

      case 'ls': {
        const node = getNode(cwd)
        if (!node || node.type !== 'dir') {
          push([{ type: 'error', text: `ls: cannot access '${cwd}'` }])
        } else {
          const entries = Object.entries(node.children).map(([name, n]) =>
            n.type === 'dir'
              ? { type: 'dir' as const, text: `${name}/` }
              : { type: 'output' as const, text: name }
          )
          push(entries.length ? entries : [{ type: 'output', text: '(empty)' }])
        }
        break
      }

      case 'cd': {
        if (!arg || arg === '~') { setCwd('~'); break }
        const target = resolvePath(cwd, arg)
        const node = getNode(target)
        if (!node || node.type !== 'dir') {
          push([{ type: 'error', text: `cd: no such directory: ${arg}` }])
        } else {
          setCwd(target)
        }
        break
      }

      case 'cat': {
        if (!arg) { push([{ type: 'error', text: 'cat: missing operand' }]); break }
        const target = resolvePath(cwd, arg)
        const node = getNode(target)
        if (!node) {
          push([{ type: 'error', text: `cat: ${arg}: no such file` }])
        } else if (node.type === 'dir') {
          push([{ type: 'error', text: `cat: ${arg}: is a directory` }])
        } else {
          push(node.content.split('\n').map(t => ({ type: 'output' as const, text: t })))
        }
        break
      }

      case 'echo':
        push([{ type: 'output', text: arg }])
        break

      case 'clear':
        setHistory([])
        break

      case 'help':
        push([
          { type: 'output', text: 'available commands:' },
          { type: 'output', text: '  ls              list directory contents' },
          { type: 'output', text: '  cd <dir>        change directory' },
          { type: 'output', text: '  cat <file>      print file contents' },
          { type: 'output', text: '  echo <text>     print text' },
          { type: 'output', text: '  pwd             print working directory' },
          { type: 'output', text: '  clear           clear terminal' },
          { type: 'output', text: '  help            show this message' },
        ])
        break

      default:
        push([{ type: 'error', text: `command not found: ${cmd}. try \`help\`` }])
    }
  }, [cwd])

  return { history, cwd, run }
}
