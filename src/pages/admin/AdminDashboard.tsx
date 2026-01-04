import {
  Box,
  Typography,
  Card,
  CardContent,
} from '@mui/material'
import {
  ResponsiveContainer,
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'
import LogoutIcon from '@mui/icons-material/Logout'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

// DỮ LIỆU GIẢ
const chartData = [
  { name: 'T1', revenue: 120 },
  { name: 'T2', revenue: 200 },
  { name: 'T3', revenue: 150 },
  { name: 'T4', revenue: 300 },
  { name: 'T5', revenue: 280 },
  { name: 'T6', revenue: 350 },
]

const StatCard = ({
  label,
  value,
}: {
  label: string
  value: number
}) => (
  <Card sx={{ flex: 1 }}>
    <CardContent>
      <Typography color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h4" fontWeight={700}>
        {value}
      </Typography>
    </CardContent>
  </Card>
)

const AdminDashboard = () => {
  const { logout, isAdmin, loading } = useAuth()
  const navigate = useNavigate()

  if (loading) return null

  if (!isAdmin) {
    navigate('/403')
    return null
  }

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <Box>
      {/* HEADER */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          Dashboard
        </Typography>

        <LogoutIcon
          onClick={handleLogout}
          sx={{
            cursor: 'pointer',
            color: 'error.main',
          }}
        />
      </Box>

      {/* STATS */}
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          flexWrap: 'wrap',
          mb: 4,
        }}
      >
        <StatCard label="Tổng dịch vụ" value={24} />
        <StatCard label="Người dùng" value={312} />
        <StatCard label="Doanh thu (triệu)" value={128} />
      </Box>

      {/* CHART */}
      <Card>
        <CardContent>
          <Typography fontWeight={600} mb={2}>
            Doanh thu 6 tháng
          </Typography>

          <ResponsiveContainer width="100%" height={300}>
            <ReBarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#d2a679" />
            </ReBarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Box>
  )
}

export default AdminDashboard
