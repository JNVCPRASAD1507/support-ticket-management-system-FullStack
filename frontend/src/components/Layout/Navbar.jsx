import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { useAuth } from '../../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
          Support Desk
        </Typography>
        <Typography sx={{ mr: 2 }}>
          {user?.name || user?.email} · {user?.role}
        </Typography>
        <Button color="inherit" startIcon={<LogoutIcon />} onClick={logout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  )
}
