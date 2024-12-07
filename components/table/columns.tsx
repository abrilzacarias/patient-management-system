"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../ui/button"
import { MoreHorizontal } from "lucide-react"
import StatusBadge from "../StatusBadge"
import { formatDateTime } from "@/lib/utils"
import { Doctors } from "@/constants"
import Image from "next/image";
import AppointmentModal from "../AppointmentModal"
import { Appointment, Doctor } from "@/types/appwrite.types"
import { useEffect, useState } from "react"
import { DoctorCell } from "../DoctorCell"


export const columns: ColumnDef<Appointment>[] = [
 {
    header: "ID",
    cell: ({row}) => <p className="text-14-medium"> {row.index + 1}</p>
 },
 {
    accessorKey: "patient",
    header: "Patient",
    cell: ({row}) => <p className="text-14-medium capitalize"> {row.original.patient.name}</p>
},
{
    accessorKey: "status",
    header: "Status",
    cell: ({row}) => (
      <div className="min-w-[115px]">
        <StatusBadge status={row.original.status} />
      </div>    
    )
},
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({row}) => <p className="text-14-regular min-w-[100px]"> {formatDateTime(row.original.schedule).dateTime}</p>
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({row}) => {
  
      return (
          <div className="flex items-center gap-3">
              <Image 
                  src={(row.original.primaryPhysician as Doctor).identificationDocumentUrl}
                  height={100}
                  width={100}
                  alt={(row.original.primaryPhysician as Doctor).name}
                  className="size-8"
              />
              <p className="whitespace-nowrap">
                  Dr. {(row.original.primaryPhysician as Doctor).name}
              </p>

          </div>
      )
  }
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row: { original: data } }) => {
      return (
        <div className="flex gap-1">
            <AppointmentModal 
              type="schedule"
              patient={data.patient}
              userId={data.userId}
              appointment={data}
            />
            <AppointmentModal 
              type="cancel"
              patient={data.patient}
              userId={data.userId}
              appointment={data}
            />
        </div>
      )
    },
  },
]

export const columnsDoctor: ColumnDef<Doctor>[] = [
  {
     header: "ID",
     cell: ({row}) => <p className="text-14-medium"> {row.index + 1}</p>
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({row}) => {
      const [imgError, setImgError] = useState(false);
      return (
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 flex-shrink-0">
            {!imgError ? (
              <Image
                src={row.original.identificationDocumentUrl}
                alt={`Dr. ${row.original.name}`}
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-full"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-full">
                <span className="text-gray-500 text-xs">No img</span>
              </div>
            )}
          </div>
          <p className="text-14-medium capitalize">{row.original.name}</p>
        </div>
      )
    }
  },
  {
    accessorKey: "specialty",
    header: "Specialty",
    cell: ({row}) => <p className="text-14-medium capitalize"> {row.original.specialty}</p>
  },
 ]