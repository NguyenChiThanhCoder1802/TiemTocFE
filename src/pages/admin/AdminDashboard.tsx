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
  PieChart,
  Pie,
  Cell
} from 'recharts'

import LogoutIcon from '@mui/icons-material/Logout'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import useAuth from '../../hooks/useAuth'

import {
  getAdminDashboardStat,
  getRevenueDashboardApi,
  getOnlineRevenueByMonthApi,
  getOnlinePaymentStatsApi
} from '../../api/AdminAPI'

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
  const [revenue, setRevenue] = useState<any>(null)
  const [revenueByMonth, setRevenueByMonth] = useState<any[]>([])
  const [paymentStats, setPaymentStats] = useState<any[]>([])

  const [fetching, setFetching] = useState(true)

  /* ================= FETCH DATA ================= */

  useEffect(() => {
    if (!isAdmin) return

    const fetchData = async () => {
      try {
        const [
          statData,
          revenueData,
          monthRevenue,
          paymentStatData
        ] = await Promise.all([
          getAdminDashboardStat(),
          getRevenueDashboardApi(),
          getOnlineRevenueByMonthApi(new Date().getFullYear()),
          getOnlinePaymentStatsApi()
        ])

        setStat(statData)
        setRevenue(revenueData)
        setRevenueByMonth(monthRevenue)
        setPaymentStats(paymentStatData)
      } finally {
        setFetching(false)
      }
    }

    fetchData()
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

  /* ================= CHART DATA ================= */

  const topServiceChart =
    stat?.topServices.topBooking.map((s) => ({
      name: s.name,
      booking: s.bookingCount,
    })) || []

  const revenueMonthChart =
    revenueByMonth.map((m) => ({
      month: `T${m._id.month}`,
      revenue: m.revenue,
    })) || []

  const paymentPieChart =
    paymentStats.map((p) => ({
      name: p._id,
      value: p.count
    })) || []

  const COLORS = ['#00C49F', '#FF8042', '#FFBB28']

  /* ================= UI ================= */

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
          label="Doanh thu"
          value={`${revenue?.totalRevenue?.toLocaleString() ?? 0} đ`}
        />

        <StatCard
          label="Đơn hàng"
          value={revenue?.totalOrders ?? 0}
        />
      </Box>

      {/* ================= TOP SERVICE ================= */}

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography fontWeight={600} mb={2}>
            Top dịch vụ được đặt nhiều nhất
          </Typography>

          {topServiceChart.length === 0 ? (
            <Typography color="text.secondary">
              Chưa có dữ liệu
            </Typography>
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <ReBarChart data={topServiceChart}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="booking" fill="#d2a679" />
              </ReBarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* ================= REVENUE BY MONTH ================= */}

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography fontWeight={600} mb={2}>
            Doanh thu VNPay theo tháng
          </Typography>

          <ResponsiveContainer width="100%" height={320}>
            <ReBarChart data={revenueMonthChart}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#8884d8" />
            </ReBarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* ================= PAYMENT STATS ================= */}

      <Card>
        <CardContent>
          <Typography fontWeight={600} mb={2}>
            Trạng thái thanh toán VNPay
          </Typography>

          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={paymentPieChart}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >
                {paymentPieChart.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

    </Box>
  )
}

export default AdminDashboard