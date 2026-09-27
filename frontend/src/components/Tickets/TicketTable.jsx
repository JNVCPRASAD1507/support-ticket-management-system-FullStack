import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@mui/material'
import StatusChip from '../common/StatusChip'

export default function TicketTable({ tickets, onView }) {
  return (
    <Paper sx={{ overflow: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Ticket</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Created</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {tickets.map((row) => (
            <TableRow hover key={row.id}>
              <TableCell>{row.ticket_number || row.id}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>
                <StatusChip label={row.status} />
              </TableCell>
              <TableCell>{row.priority}</TableCell>
              <TableCell>
                {row.created_at ? new Date(row.created_at).toLocaleString() : '—'}
              </TableCell>
              <TableCell>
                <Button onClick={() => onView(row.id)}>View</Button>
              </TableCell>
            </TableRow>
          ))}
          {!tickets.length && (
            <TableRow>
              <TableCell colSpan={6} align="center">
                No records found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  )
}
