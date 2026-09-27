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
import { listCategories } from '../api'
import Loading from '../components/common/Loading'

export default function CategoriesPage() {
  const [rows, setRows] = useState([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setBusy(true)
    setError('')
    try {
      const data = await listCategories(false)
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
          Categories
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
                <TableCell>Category</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow hover key={row.id || i}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.description || '—'}</TableCell>
                  <TableCell>
                    {String(row.is_active ?? row.active ?? '—')}
                  </TableCell>
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
