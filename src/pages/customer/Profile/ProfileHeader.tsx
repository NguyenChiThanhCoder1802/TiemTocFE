import { 
  Box, 
  Typography, 
  Button, 
  Divider 
} from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'
import { useState } from 'react'

import useAuth from '../../../hooks/useAuth'
import AvatarSection from './AvatarSection'
import ProfileTabs from './ProfileTabs'
import UpdateProfileDialog from './UpdateProfileDialog'

import type { ProfileTab } from '../../../types/Profile/ProfileTab'


interface ProfileHeaderProps {
  activeTab: ProfileTab
  onTabChange: (tab: ProfileTab) => void
}


const ProfileHeader = ({
  activeTab,
  onTabChange
}: ProfileHeaderProps) => {

  const { user } = useAuth()

  const [open, setOpen] = useState(false)


  if (!user) return null


  return (

    <Box
      sx={{
        width: '100%',
        bgcolor: '#fff',
        borderRadius: 2,

        boxShadow:
          '0 4px 20px rgba(0,0,0,0.08)',

        overflow: 'visible'
      }}
    >


      {/* ================= PROFILE INFO ================= */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',

          px: {
            xs: 2,
            md: 5
          },

          py: 3,

          gap: 4,

          minHeight: 160,


          flexDirection: {
            xs: 'column',
            sm: 'row'
          }
        }}
      >


        {/* Avatar */}
        <Box
          sx={{
            width: 130,
            height: 130,

            flexShrink: 0,

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

            position: 'relative',
            zIndex: 2
          }}
        >

          <AvatarSection user={user}/>

        </Box>




        {/* Information */}
        <Box
          sx={{
            flex: 1,

            display:'flex',

            flexDirection:'column',

            gap: 1,


            alignItems:{
              xs:'center',
              sm:'flex-start'
            }
          }}
        >



          {/* Name + Edit */}
          <Box
            sx={{
              display:'flex',

              alignItems:'center',

              gap:1,

              flexWrap:'wrap'
            }}
          >


            <Typography
              fontWeight={700}
              fontSize={24}
            >
              {user.name}
            </Typography>



            <Button
              variant="outlined"

              size="small"

              startIcon={
                <EditIcon/>
              }

              onClick={()=>{
                setOpen(true)
              }}

              sx={{
                borderRadius:2,

                textTransform:'none',

                fontSize:13
              }}
            >

              Chỉnh sửa

            </Button>


          </Box>




          {/* Role */}
          <Typography
            color="text.secondary"

            fontSize={14}
          >
            {user.role}
          </Typography>




          {/* Booking */}
          <Typography
            color="#d59b5a"

            fontWeight={600}

            fontSize={14}
          >

            Đã đặt được 10 lần

          </Typography>



        </Box>


      </Box>





      {/* ================= DIVIDER ================= */}

      <Divider />





      {/* ================= TABS ================= */}

      <Box
        sx={{
          px:2,

          py:0.5
        }}
      >

        <ProfileTabs
          value={activeTab}

          onChange={onTabChange}
        />

      </Box>





      {/* ================= DIALOG ================= */}

      <UpdateProfileDialog

        open={open}

        onClose={()=>{
          setOpen(false)
        }}

      />


    </Box>

  )
}


export default ProfileHeader