import { useEffect, useState } from 'react'

import {
  Box,
  Typography,
  CircularProgress
} from '@mui/material'


import { fetchCombos } from '../api/ComboAPI'


import { 
  useHairServices 
} from '../hooks/useHairServices'


import {
  useStaffs
} from '../hooks/useStaffs'



import StaffCardList from '../components/staff/StaffCardList'
import ItemCardList from '../components/Services/ItemCardList'
import ComboCardList from '../components/comboService/ComboCardList'

import Banner from '../components/banner/Banner'


import type { Combo } from '../types/Combo/Combo'



const HomePage = () => {


  // ==========================
  // SERVICES
  // ==========================

  const {
    latest,
    loading: loadingServices
  } = useHairServices()



  // ==========================
  // STAFF
  // ==========================

  const {
    staffs,
    loading: loadingStaffs,
    error: staffError

  } = useStaffs()



  // ==========================
  // COMBO
  // ==========================

  const [combos,setCombos] = useState<Combo[]>([])


  const [
    loadingCombos,
    setLoadingCombos
  ] = useState(true)



  const [error,setError] = useState<string | null>(null)




  // ==========================
  // LOAD COMBO
  // ==========================


  useEffect(()=>{


    const loadCombo = async()=>{


      try {


        setLoadingCombos(true)


        const data = await fetchCombos({
          isActive:true
        })


        setCombos(data)



      } catch(error){


        console.error(error)


        setError(
          "Không thể tải combo"
        )


      } finally {


        setLoadingCombos(false)

      }


    }



    loadCombo()


  },[])




  const loading =
    loadingServices ||
    loadingStaffs ||
    loadingCombos




  return (

    <>


      <Banner />


      <Box
        sx={{
          px:{
            xs:2,
            md:3
          },
          pt:3
        }}
      >



        {
          (error || staffError) &&

          <Typography
            color="error"
            mb={2}
          >
            {
              error ||
              staffError
            }
          </Typography>

        }




        {
          loading ?


          (

            <Box
              display="flex"
              justifyContent="center"
              mt={5}
            >

              <CircularProgress />

            </Box>

          )


          :

          (

          <>



          {/* SERVICES */}

          <ItemCardList

            items={latest}

            title="Dịch vụ mới nhất"

            linkPrefix="services"

            loading={loadingServices}

            maxItems={8}

          />






          {/* COMBO */}


          <ComboCardList

            items={combos}

            title="Combo tiết kiệm"

            linkPrefix="combos"

            loading={loadingCombos}

          />






          {/* STAFF */}


          <StaffCardList

            staffs={staffs}

            title="Đội ngũ nhân viên"

          />



          </>

          )

        }



      </Box>


    </>

  )

}


export default HomePage