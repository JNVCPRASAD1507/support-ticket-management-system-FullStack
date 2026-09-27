import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

export default function AppLayout() {
  return (
    <Box>
      <Navbar />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, minWidth: 0, py: 4, px: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
