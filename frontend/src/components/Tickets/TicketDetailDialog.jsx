import { useState, useEffect, useMemo } from 'react'
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
  Alert,
} from '@mui/material'
import { updateTicketStatus, addComment, listComments } from '../../api'

// Must match backend: backend/app/services/ticket_workflow_service.py
const ALLOWED_TRANSITIONS = {
  open: ['open', 'in_progress'],
  in_progress: ['in_progress', 'resolved'],
  resolved: ['resolved', 'closed', 'in_progress'],
  closed: ['closed'],
}

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
  const [localError, setLocalError] = useState('')

  const currentStatus = detail?.status || 'open'

  const allowedOptions = useMemo(() => {
    return ALLOWED_TRANSITIONS[currentStatus] || [currentStatus]
  }, [currentStatus])

  useEffect(() => {
    if (detail?.status) {
      setStatus(detail.status)
    }
    setComment('')
    setLocalError('')
  }, [detail])

  const handleStatusUpdate = async () => {
    if (!detail) return
    if (status === detail.status) {
      setLocalError('Status is already set to this value.')
      return
    }
    if (!allowedOptions.includes(status)) {
      setLocalError(
        `Cannot change status from "${detail.status}" to "${status}". Allowed: ${allowedOptions.join(', ')}`
      )
      return
    }
    setSaving(true)
    setLocalError('')
    try {
      await updateTicketStatus(detail.id, status)
      onNotice?.('Status updated')
      onStatusUpdated?.()
      onClose()
    } catch (e) {
      setLocalError(e.message)
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
      setLocalError(e.message)
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

        {localError && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setLocalError('')}>
            {localError}
          </Alert>
        )}

        <Stack direction="row" spacing={2} alignItems="center" mb={1}>
          <TextField
            select
            size="small"
            label="Status"
            value={allowedOptions.includes(status) ? status : currentStatus}
            onChange={(e) => setStatus(e.target.value)}
            sx={{ minWidth: 180 }}
          >
            {allowedOptions.map((s) => (
              <MenuItem value={s} key={s}>
                {s}
              </MenuItem>
            ))}
          </TextField>
          <Button
            onClick={handleStatusUpdate}
            variant="contained"
            disabled={saving || status === currentStatus}
          >
            Update status
          </Button>
        </Stack>
        <Typography variant="caption" color="text.secondary" display="block" mb={2}>
          Flow: open → in_progress → resolved → closed
        </Typography>

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