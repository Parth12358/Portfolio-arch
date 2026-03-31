export type FSFile = { type: 'file'; content: string }
export type FSDir  = { type: 'dir';  children: Record<string, FSNode> }
export type FSNode = FSFile | FSDir

export const FILESYSTEM: FSDir = {
  type: 'dir',
  children: {
    '~': {
      type: 'dir',
      children: {
        projects: {
          type: 'dir',
          children: {
            'project-one': {
              type: 'dir',
              children: {
                'README.md': { type: 'file', content: '# project-one\nA CLI tool built with Rust.\n\nFeatures:\n- Fast\n- Minimal\n- Open source' },
                'main.rs':   { type: 'file', content: 'fn main() {\n    println!("Hello, world!");\n}' },
              },
            },
            'project-two': {
              type: 'dir',
              children: {
                'README.md': { type: 'file', content: '# project-two\nPython automation scripts.\n\nUsage: python main.py' },
                'main.py':   { type: 'file', content: '#!/usr/bin/env python3\nprint("hello from project-two")' },
              },
            },
            'project-three': {
              type: 'dir',
              children: {
                'README.md':      { type: 'file', content: '# project-three\nHyprland dotfiles & rice configs.' },
                'hyprland.conf':  { type: 'file', content: '# Hyprland config\nmonitor=,preferred,auto,1\nexec-once=waybar' },
              },
            },
          },
        },
        'about.txt':   { type: 'file', content: 'name: Parth\nrole: linux nerd & open source builder\nos: Arch Linux\nwm: Hyprland\neditor: neovim\nshell: zsh' },
        'contact.txt': { type: 'file', content: 'github:  github.com/Parth12358\nemail:   user@mail.com\ndiscord: user#0000' },
        '.dotfiles': {
          type: 'dir',
          children: {
            'hyprland.conf': { type: 'file', content: '# Hyprland config\nmonitor=,preferred,auto,1' },
            nvim: {
              type: 'dir',
              children: {
                'init.lua': { type: 'file', content: '-- neovim config\nvim.opt.number = true\nvim.opt.relativenumber = true' },
              },
            },
          },
        },
      },
    },
  },
}
