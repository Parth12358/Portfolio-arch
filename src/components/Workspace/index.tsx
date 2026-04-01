import TileGrid from '../TileGrid'

interface Props { id: number }

export default function Workspace({ id }: Props) {
  return (
    <div style={{ width: '100%', height: '100%', background: 'var(--bg0)' }}>
      <TileGrid workspaceId={id} />
    </div>
  )
}
