'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getDoctors } from "@/lib/actions/doctor.actions"


interface Doctor {
  id: string
  name: string
  identificationDocumentUrl: string
  specialty: string
}

interface DoctorCellProps {
  doctorName: Doctor | string
}

export function DoctorCell({ doctorName }: DoctorCellProps) {
  const [doctor, setDoctor] = useState<Doctor | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchDoctor() {
      try {
        setIsLoading(true)
        const doctors = await getDoctors()
        const foundDoctor = doctors.find((doc: Doctor) => doc.name === doctorName)
        if (foundDoctor) {
          setDoctor(foundDoctor)
        } else {
          setError(`Doctor ${doctorName} not found`)
        }
      } catch (error) {
        console.error('Error fetching doctor:', error)
        setError('Failed to fetch doctor information')
      } finally {
        setIsLoading(false)
      }
    }

    fetchDoctor()
  }, [doctorName])

  if (isLoading) {
    return (
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-dark-400 animate-pulse"></div>
        <div className="h-4 w-24 bg-dark-400 animate-pulse"></div>
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500 text-sm">{error}</div>
  }

  if (!doctor) {
    return <div className="text-gray-500 text-sm">Doctor information not available.</div>
  }

  return (
    <div className="flex items-center gap-3">
      <Image 
        src={doctor.identificationDocumentUrl}
        height={32}
        width={32}
        alt={`Dr. ${doctor.name}`}
        className="rounded-full"
      />
      <div>
        <p className="text-sm font-medium">Dr. {doctor.name}</p>
        <p className="text-xs text-gray-500">{doctor.specialty}</p>
      </div>
    </div>
  )
}

