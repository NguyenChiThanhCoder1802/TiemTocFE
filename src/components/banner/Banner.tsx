import {
  Box,
  Typography,
  Chip,
  Button,
  Paper,
  Stack,
  Divider
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import {
  Clock,
  Timer,
  CalendarDays,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  ArrowRight
} from 'lucide-react'

import { BUSINESS_CONFIG } from '../../config/businessConfig'


const Banner = () => {
 const navigate = useNavigate()

  const formatHour = (hour:number) => {
    return `${hour.toString().padStart(2,'0')}:00`
  }


  const features = [
    'Không lo chờ đợi khi đến salon',
    'Dễ dàng đổi lịch trước thời gian quy định',
    'Nhận ưu đãi độc quyền khi đặt online'
  ]


  return (

    <Paper
      elevation={6}
      sx={{
        width:'100%',
        background:
        'linear-gradient(135deg,#2c1810,#3b2416,#5c3b22)',
        color:'#fff',
        borderRadius:1,
        p:{
          xs:3,
          md:5
        },
        border:
        '1px solid rgba(222,184,135,.25)',
        overflow:'hidden',
        position:'relative'
      }}
    >


      {/* Background */}

      <Box
        sx={{
          position:'absolute',
          top:-80,
          right:-80,
          width:300,
          height:300,
          borderRadius:'50%',
          background:
          'radial-gradient(circle,rgba(222,184,135,.2),transparent)'
        }}
      />



      {/* Main Layout */}

      <Box
        sx={{
          display:'flex',
          flexDirection:{
            xs:'column',
            lg:'row'
          },
          gap:4,
          alignItems:'center'
        }}
      >



        {/* LEFT */}

        <Box
          sx={{
            flex:1,
            width:'100%'
          }}
        >

          <Stack spacing={2.5}>


            <Chip
              icon={<Sparkles size={15}/>}
              label="Hệ Thống Đặt Lịch Tự Động"
              sx={{
                width:'fit-content',
                bgcolor:'#deb887',
                color:'#1a110b',
                fontWeight:700
              }}
            />



            <Typography
              variant="h3"
              fontWeight={800}
              sx={{
                color:'#deb887',
                fontSize:{
                  xs:'2rem',
                  md:'3rem'
                }
              }}
            >
              Đặt lịch tại Hair Salon Premium
            </Typography>



            <Typography
              variant="body1"
              sx={{
                color:'rgba(255,255,255,.85)',
                lineHeight:1.7
              }}
            >
              Trải nghiệm dịch vụ chăm sóc và tạo kiểu tóc
              chuyên nghiệp.
              Đặt lịch nhanh chóng, chọn thời gian phù hợp
              và chủ động lịch trình của bạn.
            </Typography>




            {/* Config */}

            <Box
              sx={{
                display:'flex',
                flexWrap:'wrap',
                gap:1.5
              }}
            >


              <Chip
                icon={<Clock size={16}/>}
                label={
                  `Giờ mở cửa:
                  ${formatHour(BUSINESS_CONFIG.openHour)}
                  -
                  ${formatHour(BUSINESS_CONFIG.closeHour)}`
                }
                sx={chipStyle}
              />



              <Chip
                icon={<Timer size={16}/>}
                label={
                  `Slot:
                  ${BUSINESS_CONFIG.slotMinutes} phút`
                }
                sx={chipStyle}
              />



              <Chip
                icon={<CalendarDays size={16}/>}
                label={
                  `Đặt trước:
                  ${BUSINESS_CONFIG.maxBookingDays} ngày`
                }
                sx={chipStyle}
              />



              <Chip
                icon={<ShieldCheck size={16}/>}
                label={
                  `Tối thiểu:
                  ${BUSINESS_CONFIG.minAdvanceMinutes} phút`
                }
                sx={chipStyle}
              />

            </Box>




          <Button
                variant="contained"
                endIcon={<ArrowRight/>}
                onClick={() => navigate('/customer/booking')}
                sx={{
                    width:'fit-content',
                    background:
                    'linear-gradient(135deg,#deb887,#8b5e34)',
                    color:'#1a110b',
                    fontWeight:800,
                    px:4,
                    py:1.5,
                    borderRadius:2,
                    textTransform:'none',

                    '&:hover': {
                    background:
                    'linear-gradient(135deg,#e5c396,#9c6b3e)',
                    transform:'translateY(-2px)',
                    boxShadow:'0 8px 20px rgba(222,184,135,.35)'
                    },

                    transition:'all .3s ease'
                }}
                >
                ĐẶT LỊCH NGAY
                </Button>



          </Stack>

        </Box>






        {/* RIGHT CARD */}

        <Box
          sx={{
            flex:0.6,
            width:{
              xs:'100%',
              lg:'40%'
            }
          }}
        >


          <Paper
            sx={{
              bgcolor:'rgba(26,17,11,.7)',
              backdropFilter:'blur(10px)',
              borderRadius:3,
              p:3,
              border:
              '1px solid rgba(222,184,135,.2)'
            }}
          >


            <Typography
              fontWeight={700}
              sx={{
                color:'#deb887'
              }}
            >
              Đặc quyền khi đặt online
            </Typography>



            <Divider
              sx={{
                my:2,
                borderColor:'rgba(255,255,255,.15)'
              }}
            />



            <Stack spacing={2}>


              {
                features.map((item,index)=>(

                  <Box
                    key={index}
                    sx={{
                      display:'flex',
                      gap:1,
                      alignItems:'flex-start'
                    }}
                  >

                    <CheckCircle2
                      size={18}
                      color="#deb887"
                    />


                    <Typography
                      variant="body2"
                      color="rgba(255,255,255,.85)"
                    >
                      {item}
                    </Typography>


                  </Box>

                ))
              }


            </Stack>


          </Paper>


        </Box>


      </Box>


    </Paper>

  )
}



const chipStyle = {
  bgcolor:'#fff',
  color:'#3b2416',
  fontWeight:600,
  flex: {
    xs:'1 1 100%',
    sm:'1 1 calc(50% - 12px)'
  }
}



export default Banner