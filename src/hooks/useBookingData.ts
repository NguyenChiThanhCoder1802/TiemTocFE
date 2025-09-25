import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { fetchServices } from '../api/apiService';
import { getProfile } from '../api/profileApi';
import { getCombos } from '../api/comboAPI';
import type { Service } from '../types/Service';
import type { ComboDto } from '../types/Combo';

const LOCAL_STORAGE_KEY = 'temporaryBookingServices';

export function useBookingData(id?: string) {
  const { enqueueSnackbar } = useSnackbar();
  const [form, setForm] = useState({
    customerName: '',
    phone: '',
    appointmentTime: '',
    note: '',
  });
  const [services, setServices] = useState<Service[]>([]);
  const [serviceIds, setServiceIds] = useState<number[]>([]);
  const [comboList, setComboList] = useState<ComboDto[]>([]);
  const [selectedComboIds, setSelectedComboIds] = useState<number[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Load profile, services, and combos
  useEffect(() => {
    const loadData = async () => {
      try {
        const [profile, allServices, combos] = await Promise.all([
          getProfile(),
          fetchServices(),
          getCombos()
        ]);

        setServices(allServices);
        setComboList(combos);

        if (profile?.fullName) setForm(prev => ({ ...prev, customerName: profile.fullName || '' }));
        if (profile?.phoneNumber) setForm(prev => ({ ...prev, phone: profile.phoneNumber || '' }));

        const storedIds = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedIds) setServiceIds(JSON.parse(storedIds));
      } catch {
        enqueueSnackbar('Lỗi khi tải dữ liệu', { variant: 'error' });
      }
    };

    loadData();
  }, [enqueueSnackbar]);

  // Tính tổng giá
  useEffect(() => {
    if (id && !isNaN(Number(id))) {
      const selectedId = Number(id);
      setServiceIds([selectedId]);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([selectedId]));
    }

    const serviceTotal = services
      .filter(s => serviceIds.includes(s.id))
      .reduce((sum, s) => sum + s.price, 0);

    const comboTotal = comboList
      .filter(c => selectedComboIds.includes(c.id))
      .reduce((sum, c) => sum + c.discountedPrice, 0);

    setTotalPrice(serviceTotal + comboTotal);
  }, [serviceIds, selectedComboIds, services, comboList, id]);

  return {
    form,
    setForm,
    services,
    serviceIds,
    setServiceIds,
    comboList,
    selectedComboIds,
    setSelectedComboIds,
    totalPrice
  };
}
