import { Chip } from '@mui/material'

const colorMap = {
  open: 'info',
  in_progress: 'warning',
  resolved: 'success',
  closed: 'default',
  low: 'default',
  medium: 'info',
  high: 'warning',
  urgent: 'error',
}

export default function StatusChip({ label, size = 'small' }) {
  const color = colorMap[label] || 'default'
  return <Chip size={size} label={label} color={color} />
}
