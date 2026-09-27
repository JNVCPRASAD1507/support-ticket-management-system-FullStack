import { Drawer, List, ListItemButton, ListItemText } from '@mui/material'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'
import AddIcon from '@mui/icons-material/Add'
import CategoryIcon from '@mui/icons-material/Category'
import PeopleIcon from '@mui/icons-material/People'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const navItems = [
  { path: '/tickets', label: 'Tickets', icon: <ConfirmationNumberIcon /> },
  { path: '/tickets/create', label: 'Create ticket', icon: <AddIcon /> },
  { path: '/categories', label: 'Categories', icon: <CategoryIcon /> },
  { path: '/users', label: 'Users', icon: <PeopleIcon />, adminOnly: true },
  { path: '/notifications', label: 'Notifications', icon: <NotificationsIcon /> },
]

const drawerWidth = 220

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAdmin } = useAuth()

  const items = navItems.filter((item) => !item.adminOnly || isAdmin)

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          top: 64,
          height: 'calc(100% - 64px)',
          boxSizing: 'border-box',
        },
      }}
    >
      <List>
        {items.map((item) => (
          <ListItemButton
            key={item.path}
            selected={
              location.pathname === item.path ||
              (item.path === '/tickets' && location.pathname.startsWith('/tickets/') && location.pathname !== '/tickets/create')
            }
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            <ListItemText sx={{ ml: 1 }} primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  )
}
