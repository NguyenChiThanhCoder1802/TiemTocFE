import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Chip,
  Box
} from '@mui/material'

import {
  LocalOffer,
  ContentCopy,
  CalendarMonth
} from '@mui/icons-material'


import { useState } from 'react'

import type { DiscountCard } from '../../types/Discount/Discount'



interface Props {
  discount: DiscountCard
}



export function UserDiscountCard({
  discount
}:Props){


  const [copied,setCopied] = useState(false)



  const expired =
    new Date(discount.endDate) < new Date()



  const outOfStock =
    discount.usedQuantity >= discount.quantity



  const disabled =
    expired ||
    outOfStock ||
    !discount.isActive




  const renderDiscountText =()=>{


    if(discount.discountType === 'percent'){

      return (
        <>
          Giảm 
          <b>
            {' '}
            {discount.discountValue}%
          </b>


          {
            discount.maxDiscountAmount &&

            <Typography
              component="span"
              variant="body2"
            >
              {' '}
              tối đa {
                discount.maxDiscountAmount
                .toLocaleString()
              }đ
            </Typography>

          }

        </>
      )

    }


    return (
      <>
        Giảm
        <b>
          {' '}
          {
            discount.discountValue
            .toLocaleString()
          }đ
        </b>
      </>
    )

  }




  const handleCopy = async()=>{

    await navigator.clipboard
    .writeText(discount.code)


    setCopied(true)


    setTimeout(()=>{
      setCopied(false)
    },2000)

  }




return (

<Card

sx={{

height:'100%',

borderRadius:3,


overflow:'hidden',


background:

disabled

?

'#eeeeee'

:

'linear-gradient(135deg,#2c1810,#5c3b22)',



color:'#fff',



border:

'1px solid rgba(222,184,135,.3)',



opacity:
disabled ? .6 : 1,



transition:'all .3s ease',



'&:hover':{

transform:
disabled
?'none'
:'translateY(-8px)',


boxShadow:
'0 15px 35px rgba(0,0,0,.25)'

}

}}

>


<CardContent>


<Stack spacing={2}>


<Box
display="flex"
alignItems="center"
gap={1}
>


<LocalOffer
sx={{
color:'#deb887'
}}
/>


<Typography
variant="h6"
fontWeight={800}
sx={{
color:'#deb887',
letterSpacing:1
}}
>

{discount.code}

</Typography>


</Box>





<Box

sx={{

background:
'rgba(222,184,135,.15)',

borderRadius:2,

p:2

}}

>


<Typography

variant="h5"

fontWeight={800}

sx={{

color:'#fff'

}}

>

{renderDiscountText()}


</Typography>


</Box>






{
discount.minValue > 0 &&

<Typography
variant="body2"
sx={{
color:'rgba(255,255,255,.8)'
}}
>

Đơn tối thiểu:

{' '}

{
discount.minValue
.toLocaleString()
}

đ


</Typography>

}




<Box
display="flex"
alignItems="center"
gap={1}
>


<CalendarMonth
fontSize="small"
sx={{
color:'#deb887'
}}
/>


<Typography
variant="body2"
sx={{
color:'rgba(255,255,255,.8)'
}}
>

HSD:

{' '}

{
new Date(
discount.endDate
)
.toLocaleDateString()
}


</Typography>


</Box>






<Stack
direction="row"
justifyContent="space-between"
alignItems="center"
>


<Chip

label={

expired
?
'Hết hạn'

:

outOfStock
?
'Hết lượt'

:

'Còn dùng'

}


sx={{

background:

expired || outOfStock

?

'#777'

:

'#deb887',



color:

expired || outOfStock

?

'#fff'

:

'#3b2416',



fontWeight:700

}}

/>




<Button

variant="contained"

disabled={disabled}

startIcon={
<ContentCopy/>
}


onClick={handleCopy}


sx={{

background:
'linear-gradient(135deg,#deb887,#8b5e34)',


color:'#1a110b',


fontWeight:700,


textTransform:'none',


'&:hover':{

background:
'linear-gradient(135deg,#e7c59a,#9c6b3e)'

}

}}

>


{
copied
?
'Đã sao chép'
:
'Sao chép mã'
}


</Button>


</Stack>




</Stack>


</CardContent>


</Card>


)


}