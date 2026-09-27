import { useEffect, useState, useCallback } from 'react'
import {
  Stack,
  Typography,
  IconButton,
  Alert,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import { listNotifications } from '../api'
import Loading from '../components/common/Loading'

export default function NotificationsPage() {
  const [rows, setRows] = useState([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setBusy(true)
    setError('')
    try {
      const data = await listNotifications()
      setRows(Array.isArray(data) ? data : data.items || [])
    } catch (e) {
      setError(e.message)
    } finally {
      setBusy(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <Typography variant="h4" fontWeight={700}>
          Notifications
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

      {busy ? (
        <Loading />
      ) : (
        <Paper sx={{ overflow: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Notification</TableCell>
                <TableCell>Details</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow hover key={row.id || i}>
                  <TableCell>{row.title || row.message || 'Notification'}</TableCell>
                  <TableCell>{row.message || row.content || '—'}</TableCell>
                  <TableCell>{row.created_at || '—'}</TableCell>
                </TableRow>
              ))}
              {!rows.length && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No records found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      )}
    </>
  )
}
