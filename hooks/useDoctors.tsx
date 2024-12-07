import { useState, useEffect } from 'react';
import { Doctor } from '@/types/appwrite.types';
import { getDoctors } from '@/lib/actions/doctor.actions';

export function useDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    async function loadDoctors() {
      const fetchedDoctors = await getDoctors();
      setDoctors(fetchedDoctors);
    }
    loadDoctors();
  }, []);

  return doctors;
}
