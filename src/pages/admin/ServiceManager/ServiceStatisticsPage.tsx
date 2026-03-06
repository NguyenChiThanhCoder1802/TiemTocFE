// import { Box, Typography, Grid, Card, CardContent } from '@mui/material'
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer
// } from 'recharts'
// import { useEffect, useState } from 'react'
// import { fetchServiceStatistics } from '../../../api/servicesAPI'

// const StatCard = ({ title, value }: { title: string; value: number }) => (
//   <Card sx={{ borderRadius: 3 }}>
//     <CardContent>
//       <Typography variant="body2" color="text.secondary">
//         {title}
//       </Typography>
//       <Typography variant="h4" fontWeight={700}>
//         {value}
//       </Typography>
//     </CardContent>
//   </Card>
// )

// const ServiceStatisticsPage = () => {
//   const [data, setData] = useState<any>(null)

//   useEffect(() => {
//     fetchServiceStatistics().then(setData)
//   }, [])

//   if (!data) return null

//   return (
//     <Box>
//       <Typography variant="h5" fontWeight={700} mb={3}>
//         📊 Thống kê dịch vụ
//       </Typography>

//       {/* KPI */}
//       <Grid container spacing={2} mb={3}>
//         <Grid item xs={12} md={4}>
//           <StatCard title="Tổng số dịch vụ" value={data.totalServices} />
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <StatCard
//             title="Dịch vụ có booking cao nhất"
//             value={data.topBooking[0]?.bookingCount || 0}
//           />
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <StatCard
//             title="Conversion cao nhất"
//             value={Math.round(
//               (data.topConversion[0]?.conversionRate || 0) * 100
//             )}
//           />
//         </Grid>
//       </Grid>

//       {/* TOP BOOKING */}
//       <Card sx={{ mb: 4, borderRadius: 3 }}>
//         <CardContent>
//           <Typography fontWeight={600} mb={2}>
//             🔥 Top dịch vụ được đặt nhiều
//           </Typography>

//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={data.topBooking}>
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="bookingCount" />
//             </BarChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>

//       {/* TOP VIEW */}
//       <Card sx={{ mb: 4, borderRadius: 3 }}>
//         <CardContent>
//           <Typography fontWeight={600} mb={2}>
//             👀 Top dịch vụ được xem nhiều
//           </Typography>

//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={data.topView}>
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="viewCount" />
//             </BarChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>

//       {/* CONVERSION */}
//       <Card sx={{ borderRadius: 3 }}>
//         <CardContent>
//           <Typography fontWeight={600} mb={2}>
//             🎯 Tỉ lệ chuyển đổi (Booking / View)
//           </Typography>

//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={data.topConversion}>
//               <XAxis dataKey="name" />
//               <YAxis tickFormatter={(v) => `${v * 100}%`} />
//               <Tooltip formatter={(v: number) => `${(v * 100).toFixed(1)}%`} />
//               <Bar dataKey="conversionRate" />
//             </BarChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>
//     </Box>
//   )
// }

// export default ServiceStatisticsPage
