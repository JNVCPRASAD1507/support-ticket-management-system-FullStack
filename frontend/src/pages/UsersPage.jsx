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
import { Navigate } from 'react-router-dom'
import { listUsers } from '../api'
import { useAuth } from '../context/AuthContext'
import Loading from '../components/common/Loading'

export default function UsersPage() {
  const { isAdmin } = useAuth()
  const [rows, setRows] = useState([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setBusy(true)
    setError('')
    try {
      const data = await listUsers(1, 100)
      setRows(data.items || [])
    } catch (e) {
      setError(e.message)
    } finally {
      setBusy(false)
    }
  }, [])

  useEffect(() => {
    if (isAdmin) load()
  }, [load, isAdmin])

  if (!isAdmin) {
    return <Navigate to="/tickets" replace />
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
          Users
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
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow hover key={row.id || i}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.role}</TableCell>
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
