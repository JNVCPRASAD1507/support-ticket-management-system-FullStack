import { useEffect, useState, useCallback } from 'react'
import { Stack, Typography, IconButton, Alert } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import { listTickets, getTicket, listComments } from '../api'
import TicketTable from '../components/Tickets/TicketTable'
import TicketDetailDialog from '../components/Tickets/TicketDetailDialog'
import Loading from '../components/common/Loading'

export default function TicketsPage() {
  const [rows, setRows] = useState([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [open, setOpen] = useState(false)
  const [detail, setDetail] = useState(null)
  const [comments, setComments] = useState([])

  const load = useCallback(async () => {
    setBusy(true)
    setError('')
    try {
      const data = await listTickets(1, 50)
      setRows(data.items || [])
    } catch (e) {
      setError(e.message)
    } finally {
      setBusy(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const openTicket = async (id) => {
    try {
      const [ticket, commentList] = await Promise.all([
        getTicket(id),
        listComments(id).catch(() => []),
      ])
      setDetail(ticket)
      setComments(commentList || [])
      setOpen(true)
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <Typography variant="h4" fontWeight={700}>
          Tickets
        </Typography>
        <IconButton onClick={load} aria-label="Refresh">
          <RefreshIcon />
        </IconButton>
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

      {busy ? (
        <Loading />
      ) : (
        <TicketTable tickets={rows} onView={openTicket} />
      )}

      <TicketDetailDialog
        open={open}
        onClose={() => setOpen(false)}
        detail={detail}
        comments={comments}
        setComments={setComments}
        onStatusUpdated={load}
        onError={setError}
        onNotice={setNotice}
      />
    </>
  )
}
