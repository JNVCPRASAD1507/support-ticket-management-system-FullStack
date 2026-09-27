import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Stack, Typography, Alert } from '@mui/material'
import CreateTicketForm from '../components/Tickets/CreateTicketForm'

export default function CreateTicketPage() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const handleSuccess = (msg) => {
    setNotice(msg)
    setError('')
    setTimeout(() => navigate('/tickets'), 800)
  }

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4" fontWeight={700}>
          Create ticket
        </Typography>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}
      {notice && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setNotice('')}>
          {notice}
        </Alert>
      )}

      <CreateTicketForm onSuccess={handleSuccess} onError={setError} />
    </>
  )
}
