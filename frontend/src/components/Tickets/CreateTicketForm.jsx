import { useState } from 'react'
import { Paper, Stack, TextField, MenuItem, Button } from '@mui/material'
import { createTicket } from '../../api'

const PRIORITIES = ['low', 'medium', 'high', 'urgent']

export default function CreateTicketForm({ onSuccess, onError }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) return
    setSubmitting(true)
    try {
      await createTicket({ title, description, priority })
      setTitle('')
      setDescription('')
      setPriority('medium')
      onSuccess?.('Ticket created')
    } catch (e) {
      onError?.(e.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Paper sx={{ p: 3, maxWidth: 700 }}>
      <Stack spacing={2}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Description"
          multiline
          minRows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <TextField
          select
          label="Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          {PRIORITIES.map((p) => (
            <MenuItem key={p} value={p}>
              {p}
            </MenuItem>
          ))}
        </TextField>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!title.trim() || !description.trim() || submitting}
        >
          Create ticket
        </Button>
      </Stack>
    </Paper>
  )
}
