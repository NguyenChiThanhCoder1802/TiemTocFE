import {
  Box,
  Typography,
  Card,
  CardMedia
} from '@mui/material'

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import type { ServiceCard } from '../../types/HairService/ServiceCard'

import StarIcon from '@mui/icons-material/Star'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'


const MotionBox = motion(Box)


interface HairServiceCardProps {
  item: ServiceCard
  index: number
  linkPrefix: string
}



const HairServiceCard = ({
  item,
  index,
  linkPrefix
}: HairServiceCardProps) => {


  const imageUrl = item.images?.[0] || '/placeholder.png'


  // ================= BADGE SALE =================

  const isSale = item.finalPrice < item.price


  const discountPercent = isSale
    ? Math.round(
        ((item.price - item.finalPrice) / item.price) * 100
      )
    : 0


  const badgeLabel = isSale
    ? `-${discountPercent}%`
    : ''


  const badgeColor = isSale
    ? '#d2a679'
    : '#f57c00'



  return (

    <MotionBox

      initial={{
        opacity:0,
        y:24
      }}

      animate={{
        opacity:1,
        y:0
      }}

      transition={{
        delay:index * 0.06
      }}

      sx={{
        width:'100%',
        height:'100%'
      }}

    >


      <Card

        sx={{

          height:'100%',

          display:'flex',

          flexDirection:'column',

          borderRadius:1,

          overflow:'hidden',

          boxShadow:
          '0 4px 14px rgba(0,0,0,0.08)',


          transition:'0.3s',


          '&:hover':{

            transform:'translateY(-6px)',

            boxShadow:
            '0 12px 28px rgba(0,0,0,0.15)',


            '& img':{

              transform:'scale(1.06)'

            }

          }

        }}

      >



        {/* ================= IMAGE ================= */}

        <Box
          sx={{
            position:'relative'
          }}
        >

          <Link
            to={`/${linkPrefix}/${item.slug}`}
          >

            <CardMedia

              component="img"

              image={imageUrl}

              alt={item.name}


              sx={{

                height:200,

                objectFit:'cover',

                transition:
                'transform .5s ease'

              }}

            />


          </Link>



          {
            isSale && (

              <Box

                sx={{

                  position:'absolute',

                  top:12,

                  left:12,


                  px:1.2,

                  py:0.4,


                  borderRadius:10,


                  fontSize:11,

                  fontWeight:700,


                  color:'#fff',


                  backgroundColor:badgeColor,


                  boxShadow:
                  '0 4px 10px rgba(0,0,0,.25)',

                }}

              >

                {badgeLabel}

              </Box>

            )
          }


        </Box>





        {/* ================= CONTENT ================= */}

        <Box

          sx={{

            p:2,


            flex:1,


            display:'flex',

            flexDirection:'column'

          }}

        >



          {/* NAME + PRICE */}

          <Box

            sx={{

              display:'flex',

              justifyContent:'space-between',

              alignItems:'center',

              gap:1

            }}

          >


            <Typography

              fontWeight={700}

              sx={{

                fontSize:16,

                flex:1,

                overflow:'hidden',

                textOverflow:'ellipsis',

                whiteSpace:'nowrap'

              }}

            >

              {item.name}

            </Typography>



            <Typography

              fontWeight={700}

              sx={{

                color:'primary.main',

                whiteSpace:'nowrap'

              }}

            >

              {
                new Intl.NumberFormat('vi-VN')
                .format(
                  item.finalPrice ?? item.price
                )
              }

              đ

            </Typography>



          </Box>







          {/* DESCRIPTION */}

          <Typography

            variant="body2"

            sx={{

              mt:1,


              color:'text.secondary',


              lineHeight:1.5,


              display:'-webkit-box',

              WebkitLineClamp:2,

              WebkitBoxOrient:'vertical',

              overflow:'hidden',


              minHeight:42

            }}

          >

            {
              item.description ||
              'Dịch vụ chăm sóc tóc chuyên nghiệp tại salon'
            }


          </Typography>







          {/* DURATION */}

          {
            item.duration && (

              <Typography

                variant="caption"

                sx={{

                  mt:1,

                  color:'text.secondary'

                }}

              >

                ⏱ Thời gian:
                {' '}
                {item.duration} phút


              </Typography>

            )
          }









          {/* ================= META ================= */}

          <Box

            sx={{

              mt:'auto',

              pt:2,


              display:'flex',

              justifyContent:'center',

              alignItems:'center',


              gap:1,


              color:'text.secondary'

            }}

          >



            {/* Rating */}

            <Box

              sx={{

                display:'flex',

                alignItems:'center',

                gap:.3

              }}

            >


              <StarIcon

                sx={{

                  fontSize:16,

                  color:'#f5a623'

                }}

              />


              <Typography

                variant="body2"

                fontWeight={600}

              >

                {
                  item.ratingAverage?.toFixed(1)
                  || '0.0'
                }

              </Typography>


              <Typography

                variant="caption"

              >

                (
                {item.ratingCount || 0}
                )

              </Typography>


            </Box>





            <Typography>
              •
            </Typography>





            {/* Views */}

            <Box

              sx={{

                display:'flex',

                alignItems:'center',

                gap:.3

              }}

            >

              <VisibilityIcon

                sx={{

                  fontSize:16

                }}

              />


              <Typography

                variant="body2"

              >

                {
                  item.viewCount || 0
                }

              </Typography>


            </Box>







            <Typography>
              •
            </Typography>






            {/* Booking */}

            <Box

              sx={{

                display:'flex',

                alignItems:'center',

                gap:.3

              }}

            >

              <EventAvailableIcon

                sx={{

                  fontSize:16

                }}

              />


              <Typography

                variant="body2"

              >

                {
                  item.bookingCount || 0
                }


              </Typography>


            </Box>



          </Box>



        </Box>



      </Card>



    </MotionBox>

  )

}



export default HairServiceCard