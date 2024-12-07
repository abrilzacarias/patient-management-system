'use client'
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
import { Doctor } from "@/types/appwrite.types";
import { columnsDoctor } from "./table/columns"
import { DataTable } from "./table/DataTable"
import DoctorForm from "./forms/DoctorForm"

const DoctorsModal = ({ doctors }: { doctors: Doctor[] }) => {
  const [open, setOpen] = useState(false)
  const [openAdd, setOpenAdd] = useState(false)

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" className={'capitalize bg-cyan-600 hover:bg-cyan-700'}>
            Doctors
          </Button>
        </DialogTrigger>
        <DialogContent className="shad-dialog max-w-xl max-h-[80vh] overflow-y-auto"> {/* Modal más pequeño */}
          <DialogHeader className="my-3 space-y-3">
            <DialogTitle className="capitalize">Doctors</DialogTitle>
            <DialogDescription>
              <Button 
                variant="ghost" 
                className={'capitalize bg-cyan-600 hover:bg-cyan-700'} 
                onClick={() => setOpenAdd(true)}
              >
                Add Doctor
              </Button>
            </DialogDescription>
          </DialogHeader>

          <DataTable 
            columns={columnsDoctor}
            data={doctors} 
          />
        </DialogContent>
      </Dialog>

      <Dialog open={openAdd} onOpenChange={setOpenAdd}>
        <DialogContent className="shad-dialog overflow-y-auto max-h-[90vh]">

          <DoctorForm />

        </DialogContent>
      </Dialog>
    </>
  )
}

export default DoctorsModal
