import { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  Button
} from '@mui/material'
import { getAllUsersApi } from '../../../api/AuthAPI'
import type { User } from '../../../types/Auth/User'


const Account = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  const loadUsers = async () => {
    setLoading(true)
    try {
      const data = await getAllUsersApi()
      setUsers(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

 

 

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box p={4}>
      <Typography variant="h4" mb={3}>
        Quản lý tài khoản
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Avatar</TableCell>
            <TableCell>Tên</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Ngày tạo</TableCell>
            <TableCell>Hành động</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map(user => (
            <TableRow key={user._id}>
              <TableCell>
                <Avatar src={user.avatar} />
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button variant="contained" sx={{ mt: 2 }}>
        Thêm tài khoản mới
      </Button>
    </Box>
  )
}

export default Account
