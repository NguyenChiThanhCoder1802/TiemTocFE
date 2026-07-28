import { useEffect, useState } from 'react'

import {
  fetchPublicStaffs
} from '../api/staffAPI'

import type { Staff } from '../types/Staff/Staff'


export const useStaffs = () => {

  const [staffs,setStaffs] = useState<Staff[]>([])

  const [loading,setLoading] = useState(true)

  const [error,setError] = useState<string | null>(null)


  useEffect(()=>{

    const loadStaffs = async()=>{

      try {

        setLoading(true)

        const data = await fetchPublicStaffs()

        setStaffs(data)

      } catch(error) {

        console.error(error)

        setError(
          'Không thể tải danh sách nhân viên'
        )

      } finally {

        setLoading(false)

      }

    }


    loadStaffs()


  },[])


  return {
    staffs,
    loading,
    error
  }

}