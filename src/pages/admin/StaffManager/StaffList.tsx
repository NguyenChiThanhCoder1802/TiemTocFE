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

import { getStaffListApi,updateStaffStatusApi } from '../../../api/AdminAPI'
import UpdateStaffDialog from "./UpdateStaffDialog"

import type { Staff } from '../../../types/Staff/Staff'
import CreateStaffDialog from "./CreateStaffDialog"


/* ===================== HELPERS ===================== */


const renderWorkingStatus = (status: Staff["workingStatus"]) => {
  switch (status) {
    case "active":
      return <Chip color="success" label="Đang làm" />;

    case "off":
      return <Chip color="warning" label="Nghỉ phép" />;

    case "resigned":
      return <Chip color="error" label="Đã nghỉ việc" />;

    default:
      return null;
  }
};

/* ===================== COMPONENT ===================== */

const StaffList = () => {
  const [staffs, setStaffs] = useState<Staff[]>([])
  const [openCreate, setOpenCreate] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null)
  const fetchStaffs = async () => {
    const res = await getStaffListApi(false)
    setStaffs(res.data.data)
  }
  const handleChangeStatus = async (
    id: string,
    status: Staff["workingStatus"]
) => {
    try {
        await updateStaffStatusApi(id, status);
        fetchStaffs();
    } catch (err) {
        console.log(err);
    }
}
  useEffect(() => {
    fetchStaffs()
  }, [])
  
  return (
    <Box>
      {/* ===== HEADER ===== */}
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h6">Danh sách nhân viên</Typography>

       <Stack direction="row" spacing={2}>
    <Button
      variant="contained"
      color="primary"
      onClick={() => setOpenCreate(true)}
    >
      Thêm nhân viên
    </Button>
  </Stack>
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
           <TableCell>Trạng thái làm việc</TableCell>
            <TableCell>Hành động</TableCell>
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

                {/* Working status */}
              <TableCell>
                {renderWorkingStatus(staff.workingStatus)}
              </TableCell>
              <TableCell>
              <Stack direction="row" spacing={1}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => {
                    setSelectedStaff(staff)
                    setOpenEdit(true)
                  }}
                >
                  Sửa
                </Button>

                <Stack direction="row" spacing={1}>
  {staff.workingStatus !== "active" && (
    <Button
      size="small"
      color="success"
      variant="outlined"
      onClick={() =>
        handleChangeStatus(staff._id, "active")
      }
    >
      Đi làm
    </Button>
  )}

  {staff.workingStatus !== "off" && (
    <Button
      size="small"
      color="warning"
      variant="outlined"
      onClick={() =>
        handleChangeStatus(staff._id, "off")
      }
    >
      Nghỉ phép
    </Button>
  )}

  {staff.workingStatus !== "resigned" && (
    <Button
      size="small"
      color="error"
      variant="outlined"
      onClick={() =>
        handleChangeStatus(staff._id, "resigned")
      }
    >
      Nghỉ việc
    </Button>
  )}
</Stack>
              </Stack>
            </TableCell>
            </TableRow>
          ))}
      <CreateStaffDialog
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreated={fetchStaffs}
      />
      <UpdateStaffDialog
      open={openEdit}
      onClose={() => setOpenEdit(false)}
      staff={selectedStaff}
      onUpdated={fetchStaffs}
    />

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
