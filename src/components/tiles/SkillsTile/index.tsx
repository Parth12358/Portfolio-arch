import { useEffect, useState } from 'react'
import { CONFIG } from '../../../data/config'

export default function SkillsTile() {
  const [animated, setAnimated] = useState(false)
  useEffect(() => { setTimeout(() => setAnimated(true), 100) }, [])

  return (
    <div style={{ padding: '4px 0' }}>
      <div style={{ fontSize: 10, color: 'var(--fg4)', letterSpacing: 1, marginBottom: 12 }}>
        SKILLS — proficiency
      </div>
      {CONFIG.skills.map(skill => (
        <div key={skill.name} style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--fg)', marginBottom: 3 }}>
            <span>{skill.name}</span>
            <span style={{ color: 'var(--fg4)' }}>{skill.level}%</span>
          </div>
          <div style={{ height: 5, background: 'var(--bg0)', borderRadius: 2, overflow: 'hidden', border: '1px solid var(--bg3)' }}>
            <div style={{
              height: '100%',
              width: animated ? `${skill.level}%` : '0%',
              background: skill.color,
              borderRadius: 2,
              transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            }} />
          </div>
        </div>
      ))}
    </div>
  )
}
