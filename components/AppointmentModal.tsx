import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { Button } from "./ui/button"
import { PatientFormValidation } from "@/lib/validation"
import { Appointment, Patient } from "@/types/appwrite.types"
import AppointmentForm from "./forms/AppointmentForm"
import Image from "next/image";
import { useDoctors } from "@/hooks/useDoctors";

const AppointmentModal = (
    { type, patient, userId, appointment }: 
    { type: 'schedule' | 'cancel' ,
    patient: Patient,
    userId: string,
    appointment?: Appointment
  }) => {
  const [open, setOpen] = useState(false)
  const doctors = useDoctors();
  


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className={`capitalize 
              ${type === 'schedule' ? 'text-cyan-600 hover:text-cyan-700' : ''} 
              ${type === 'cancel' ? 'hover:opacity-80' : ''}`}>
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">{type} Appointment</DialogTitle>
          <DialogDescription>
            Please fill in the following form to {type} an appointment
          </DialogDescription>
        </DialogHeader>

        <AppointmentForm 
          userId={userId}
          patient={patient}
          type={type}
          appointment={appointment}
          setOpen={setOpen}
          doctors={doctors}
        />
      </DialogContent>
    </Dialog>

  )
}

export default AppointmentModal
