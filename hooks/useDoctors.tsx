import { useState, useEffect, useRef } from 'react';
import { Doctor } from '@/types/appwrite.types';
import { getDoctors } from '@/lib/actions/doctor.actions';

let cachedDoctors: Doctor[] | null = null; 

export function useDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>(cachedDoctors || []);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current && !cachedDoctors) {
      hasFetched.current = true;
      async function loadDoctors() {
        const fetchedDoctors = await getDoctors();
        cachedDoctors = fetchedDoctors;
        setDoctors(fetchedDoctors);
      }
      loadDoctors();
    }
  }, []);

  return doctors;
}
