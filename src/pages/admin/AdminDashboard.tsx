import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
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
import { useEffect, useState } from 'react'

import useAuth from '../../hooks/useAuth'
import { getAdminDashboardStat } from '../../api/AdminAPI'
import type { AdminDashboardStat } from '../../types/Admin/stat'

/* ================= STAT CARD ================= */

const StatCard = ({
  label,
  value,
}: {
  label: string
  value: string | number
}) => (
  <Card sx={{ flex: 1, minWidth: 220 }}>
    <CardContent>
      <Typography color="text.secondary" fontSize={14}>
        {label}
      </Typography>
      <Typography variant="h4" fontWeight={700}>
        {value}
      </Typography>
    </CardContent>
  </Card>
)

/* ================= DASHBOARD ================= */

const AdminDashboard = () => {
  const { logout, isAdmin, loading } = useAuth()
  const navigate = useNavigate()

  const [stat, setStat] = useState<AdminDashboardStat | null>(null)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    if (!isAdmin) return

    getAdminDashboardStat()
      .then(setStat)
      .finally(() => setFetching(false))
  }, [isAdmin])

  /* ===== AUTH GUARD ===== */
  if (loading || fetching)
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    )

  if (!isAdmin) {
    navigate('/403')
    return null
  }

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  /* ===== CHART DATA ===== */
  const chartData =
    stat?.topServices.topBooking.map((s) => ({
      name: s.name,
      booking: s.bookingCount,
    })) || []

  return (
    <Box>
      {/* ================= HEADER ================= */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          Admin Dashboard
        </Typography>

        <LogoutIcon
          onClick={handleLogout}
          sx={{
            cursor: 'pointer',
            color: 'error.main',
          }}
        />
      </Box>

      {/* ================= STATS ================= */}
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          flexWrap: 'wrap',
          mb: 4,
        }}
      >
        <StatCard
          label="Tổng dịch vụ"
          value={stat?.overview.totalServices ?? 0}
        />

        <StatCard
          label="Tổng booking"
          value={stat?.performance.totalBooking ?? 0}
        />

        <StatCard
          label="Conversion rate"
          value={`${(
            (stat?.performance.avgConversionRate ?? 0) * 100
          ).toFixed(1)}%`}
        />

        <StatCard
          label="Rating trung bình"
          value={(stat?.performance.avgRating ?? 0).toFixed(1)}
        />
      </Box>

      {/* ================= CHART ================= */}
      <Card>
        <CardContent>
          <Typography fontWeight={600} mb={2}>
            Top dịch vụ được đặt nhiều nhất
          </Typography>

          {chartData.length === 0 ? (
            <Typography color="text.secondary">
              Chưa có dữ liệu
            </Typography>
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <ReBarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="booking" fill="#d2a679" />
              </ReBarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

export default AdminDashboard
