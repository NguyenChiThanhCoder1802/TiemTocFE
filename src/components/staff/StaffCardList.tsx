import {
  Box,
  Card,
  Typography,
  Chip,
  Stack
} from '@mui/material'

import { useNavigate } from 'react-router-dom'
import type { Staff } from '../../types/Staff/Staff'


interface Props {
  staffs: Staff[]
  selectedStaffId?: string
  onSelect?: (staff: Staff | null) => void
  title?: string
  availability?: Record<string, boolean>
}



const StaffCardList = ({
  staffs,
  selectedStaffId,
  onSelect,
  title,
  availability = {}
}: Props) => {


  const navigate = useNavigate()



  return (

    <Box mt={6}>


      {
        title && (

          <Typography
            variant="h5"
            fontWeight={700}
            mb={3}
          >
            {title}
          </Typography>

        )
      }



      <Box
        sx={{
          display:'flex',
          flexWrap:'wrap',
          gap:3
        }}
      >


      {
        staffs.map(staff => {


          const isSelected =
            staff._id === selectedStaffId


          const isAvailable =
            availability[staff.slug] !== false



          return (

            <Card
              key={staff._id}

              onClick={()=>{
                if(!isAvailable) return

                onSelect?.(
                  isSelected ? null : staff
                )
              }}


              sx={{

                width:{
                  xs:'100%',
                  sm:260,
                  md:280
                },


                cursor:
                isAvailable
                ? 'pointer'
                :'not-allowed',


                opacity:
                isAvailable ? 1 : .5,


                overflow:'hidden',


                border:
                isSelected
                ? '2px solid #d2a679'
                :'1px solid #eee',


                boxShadow:
                isSelected
                ? '0 8px 25px rgba(210,166,121,.35)'
                : '0 4px 15px rgba(0,0,0,.08)',


                transition:'all .3s ease',


                '&:hover':{

                  transform:
                  isAvailable
                  ? 'translateY(-8px)'
                  :'none',

                  boxShadow:
                  '0 12px 30px rgba(0,0,0,.15)'
                }

              }}

            >



              {/* IMAGE */}

              <Box
                sx={{
                  height:260,
                  overflow:'hidden',
                  cursor:'pointer'
                }}

                onClick={(e)=>{

                  e.stopPropagation()

                  navigate(
                    `/staffs/${staff.slug}`
                  )

                }}

              >

                <Box
                  component="img"
                  src={
                    staff.avatar ||
                    '/default-avatar.png'
                  }
                  alt={staff.name}

                  sx={{
                    width:'100%',
                    height:'100%',
                    objectFit:'cover',

                    transition:
                    'transform .4s ease',

                    '&:hover':{
                      transform:'scale(1.08)'
                    }
                  }}
                />


              </Box>




              {/* CONTENT */}

              <Box
                sx={{
                  p:2.5
                }}
              >


                <Stack spacing={1}>



                  <Typography
                    variant="h6"
                    fontWeight={700}
                    textAlign="center"
                  >
                    {staff.name}
                  </Typography>




                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                  >
                    {staff.experienceYears}
                    {' '}
                    năm kinh nghiệm
                  </Typography>




                  <Box
                    display="flex"
                    justifyContent="center"
                    gap={1}
                    alignItems="center"
                  >


                    <Typography
                      fontWeight={600}
                    >
                      ⭐
                      {' '}
                      {staff.ratingAverage.toFixed(1)}
                    </Typography>


                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      (
                      {staff.completedBookings}
                      {' '}
                      lượt)
                    </Typography>


                  </Box>





                  {
                    !isAvailable && (

                      <Chip
                        label="Đã kín lịch"
                        color="error"
                        size="small"
                        sx={{
                          mx:'auto'
                        }}
                      />

                    )
                  }




                  {
                    isAvailable &&
                    isSelected && (

                      <Chip
                        label="Đã chọn stylist"
                        color="primary"
                        size="small"
                        sx={{
                          mx:'auto'
                        }}
                      />

                    )
                  }


                </Stack>


              </Box>


            </Card>

          )

        })
      }


      </Box>


    </Box>

  )
}



export default StaffCardList