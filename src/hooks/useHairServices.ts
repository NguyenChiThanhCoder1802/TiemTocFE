import { useEffect, useState } from 'react'
import {
  getFeaturedServices,
  getLatestServices,
  getMostFavoritedServices
} from '../api/servicesAPI'

import type { ServiceCard } from '../types/HairService/ServiceCard'


export const useHairServices = () => {

  const [featured, setFeatured] = useState<ServiceCard[]>([])
  const [latest, setLatest] = useState<ServiceCard[]>([])
  const [popular, setPopular] = useState<ServiceCard[]>([])

  const [loading, setLoading] = useState(true)


  useEffect(() => {

    const loadServices = async () => {
      try {

        setLoading(true)

        const [
          featuredData,
          latestData,
          popularData
        ] = await Promise.all([
          getFeaturedServices(8),
          getLatestServices(8),
          getMostFavoritedServices(8)
        ])


        setFeatured(featuredData)
        setLatest(latestData)
        setPopular(popularData)


      } catch(error){
        console.error(
          "Load services error:",
          error
        )
      }
      finally{
        setLoading(false)
      }
    }


    loadServices()

  }, [])


  return {
    featured,
    latest,
    popular,
    loading
  }
}