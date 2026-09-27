import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Stack,
  TextField,
  MenuItem,
  Button,
  Paper,
} from '@mui/material'
import { updateTicketStatus, addComment, listComments } from '../../api'

const STATUS_OPTIONS = ['open', 'in_progress', 'resolved', 'closed']

export default function TicketDetailDialog({
  open,
  onClose,
  detail,
  comments,
  setComments,
  onStatusUpdated,
  onError,
  onNotice,
}) {
  const [status, setStatus] = useState('open')
  const [comment, setComment] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (detail?.status) {
      setStatus(detail.status)
    }
    setComment('')
  }, [detail])

  const handleStatusUpdate = async () => {
    if (!detail) return
    setSaving(true)
    try {
      await updateTicketStatus(detail.id, status)
      onNotice?.('Status updated')
      onStatusUpdated?.()
      onClose()
    } catch (e) {
      onError?.(e.message)
    } finally {
      setSaving(false)
    }
  }

  const handleAddComment = async () => {
    if (!detail || !comment.trim()) return
    try {
      await addComment(detail.id, comment)
      setComment('')
      const next = await listComments(detail.id)
      setComments(next || [])
    } catch (e) {
      onError?.(e.message)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        {detail?.ticket_number} · {detail?.title}
      </DialogTitle>
      <DialogContent dividers>
        <Typography sx={{ whiteSpace: 'pre-wrap', mb: 2 }}>
          {detail?.description}
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
          <TextField
            select
            size="small"
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {STATUS_OPTIONS.map((s) => (
              <MenuItem value={s} key={s}>
                {s}
              </MenuItem>
            ))}
          </TextField>
          <Button onClick={handleStatusUpdate} variant="contained" disabled={saving}>
            Update status
          </Button>
        </Stack>

        <Typography variant="h6">Comments</Typography>
        {(comments || []).map((c) => (
          <Paper key={c.id} sx={{ p: 1.5, my: 1 }}>
            {c.content || c.body}
            <Typography variant="caption" display="block">
              {c.created_at || ''}
            </Typography>
          </Paper>
        ))}

        <TextField
          fullWidth
          multiline
          minRows={2}
          label="Add comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{ mt: 2 }}
        />
        <Button
          sx={{ mt: 1 }}
          onClick={handleAddComment}
          disabled={!comment.trim()}
        >
          Post comment
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}
