import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchServices } from '../../api/servicesAPI'
import type { ServiceCard } from '../../types/HairService/ServiceCard'
import ItemCardList from '../../components/Services/ItemCardList'

const ResultPage = () => {
  const [searchParams] = useSearchParams()
  const search = searchParams.get('search') || ''

  const [services, setServices] = useState<ServiceCard[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true)

        const data = await fetchServices({ search })

        setServices(data as ServiceCard[])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadServices()
  }, [search])

  return (
    <ItemCardList
      items={services}
      title={`Kết quả tìm kiếm: "${search}"`}
      linkPrefix="services"
      loading={loading}
      maxItems={services.length}
    />
  )
}

export default ResultPage