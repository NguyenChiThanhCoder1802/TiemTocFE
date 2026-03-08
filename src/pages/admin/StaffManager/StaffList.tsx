import { useEffect, useState } from 'react'

import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Button,
  Chip,
  Stack,
  Avatar
} from '@mui/material'

import { getStaffListApi } from '../../../api/AdminAPI'
import type { Staff } from '../../../types/Staff/Staff'
import StaffApprovalDialog from './StaffApprovalDialog'

/* ===================== HELPERS ===================== */


const renderWorkingStatus = (status: Staff['workingStatus']) => {
  switch (status) {
    case 'active':
      return <Chip label="Đang làm" color="success" size="small" />
    case 'off':
      return <Chip label="Nghỉ" color="warning" size="small" />
    case 'resigned':
      return <Chip label="Đã nghỉ việc" size="small" />
    default:
      return null
  }
}

/* ===================== COMPONENT ===================== */

const StaffList = () => {
  const [staffs, setStaffs] = useState<Staff[]>([])
  const [openApproval, setOpenApproval] = useState(false)
  
  const fetchStaffs = async () => {
    const res = await getStaffListApi(false)
    setStaffs(res.data.data)
  }

  useEffect(() => {
    fetchStaffs()
  }, [])

  return (
    <Box>
      {/* ===== HEADER ===== */}
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h6">Danh sách nhân viên</Typography>

        <Button
          variant="contained"
          color="secondary"
           onClick={() => setOpenApproval(true)}
        >
          Duyệt nhân viên
        </Button>
        <StaffApprovalDialog
            open={openApproval}
            onClose={() => setOpenApproval(false)}
            onApproved={fetchStaffs}
            />
      </Stack>

      {/* ===== TABLE ===== */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Ảnh</TableCell>
            <TableCell>Tên</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Vị trí</TableCell> 
            <TableCell>Kinh nghiệm</TableCell>
            <TableCell>Kỹ năng</TableCell>
           <TableCell>Trạng thái làm việc</TableCell>
            <TableCell>Online</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {staffs.map(staff => (
            <TableRow key={staff._id} hover>
              {/* Avatar */}
              <TableCell>
                <Avatar
                  src={staff.avatar}
                  alt={staff.name}
                  sx={{ width: 36, height: 36 }}
                />
              </TableCell>

              {/* Basic info */}
              <TableCell>{staff.name}</TableCell>
              <TableCell>{staff.email}</TableCell>
              <TableCell>{staff.position}</TableCell>

              

              {/* Experience */}
              <TableCell>{staff.experienceYears} năm</TableCell>

              {/* Skills */}
              <TableCell>
                {staff.skills.length ? staff.skills.join(', ') : '-'}
              </TableCell>
                {/* Working status */}
              <TableCell>
                {renderWorkingStatus(staff.workingStatus)}
              </TableCell>

            </TableRow>
          ))}

          {!staffs.length && (
            <TableRow>
              <TableCell colSpan={9} align="center">
                <Typography variant="body2" color="text.secondary">
                  Không có nhân viên
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Box>
  )
}

export default StaffList
