"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { getAppointmentSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { FormFieldType } from "./PatientForm";
import { SelectItem } from "../ui/select";
import { createAppointment, updateAppointment } from "@/lib/actions/appointment.actions";
import { Appointment, Doctor, Patient } from "@/types/appwrite.types";
import Image from "next/image";

const AppointmentForm = ({
    userId, patient, type, appointment, doctors, setOpen
}: {
    userId: string;
    patient: Patient;
    type: "create" | "cancel" | "schedule";
    doctors: Doctor[];
    appointment?: Appointment;
    setOpen?: (open: boolean) => void
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment?.primaryPhysician?.$id || patient.primaryPhysician.$id,
      schedule: appointment ? new Date(appointment.schedule) : new Date(Date.now()),
      reason: appointment ? appointment.reason : '',
      note: appointment?.note || '',
      cancellationReason: appointment?.cancellationReason || '',
    },
  });

  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    setIsLoading(true);

    let status;
      switch (type) {
        case 'schedule':
            status = 'scheduled';
            break;
        case 'cancel':
            status = 'cancelled';
            break;
        default:
            status = 'pending';
      }

    try {
        if (type === "create" && patient) {
            const appointmentData = {
                userId,
                patient: patient.$id,
                primaryPhysician: values.primaryPhysician,
                schedule: new Date(values.schedule),
                reason: values.reason!,
                note: values.note,
                status: status as Status
            }
            const appointment = await createAppointment(appointmentData);

            if(appointment) {
                form.reset();
                router.push(`/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`);
            }
        } else {
          const appointmentToUpdate = {
            userId,
            appointmentId: appointment?.$id!,
            appointment: {
              primaryPhysician: values?.primaryPhysician,
              schedule: new Date(values?.schedule),
              status: status as Status,
              cancellationReason: values?.cancellationReason
            },
            type
          }

          const updatedAppointment = await updateAppointment(appointmentToUpdate);

          if (updatedAppointment) {
            setOpen && setOpen(false);
            form.reset();
        } 
      }
    } catch (error) {
        console.error(error);
      }
    }

  let buttonLabel;

  switch (type) {
    case "create":
      buttonLabel = "Request Appointment";
      break;
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;
    case "schedule":
        buttonLabel = "Request Appointment";
        break;
    default:
      break;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
       {type === 'create' && <section className="mb-12 space-y-4">
          <h1 className="header">New Appointment</h1>
          <p className="text-dark-700">Request a new appointment fast and easy, with your choosen doctor.</p>
        </section>}

        {type !== "cancel" && (
            <>
             <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="primaryPhysician"
          label="Select a doctor"
          placeholder="Select a physician"
        >
            {doctors.map((doctor) => (
                <SelectItem className="cursor-pointer hover:bg-dark-300 hover:text-cyan-600" key={doctor.$id} value={doctor.$id}>
                <div className="flex cursor-ponter items-center gap-2">
                    <Image
                    src={doctor.identificationDocumentUrl}
                    alt={doctor.name}
                    width={32}
                    height={32}
                    className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name} - {doctor.specialty}</p>
                </div>
                </SelectItem>
          ))}
        </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="schedule"
            label="Expected Appointment Date"
            showTimeSelect
            dateFormat="MM/dd/yyyy - h:mm aa"
          />

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="Reason for appointment"
                placeholder="Enter reason for appointment"
            />

            <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="Note"
                placeholder="Enter notes"
            />
          </div>
            </>
        )}

        {type === "cancel" && (
            <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="cancellationReason"
                label="Reason for cancellation"
                placeholder="Enter reason for cancellation"
            />
        )}

        <SubmitButton isLoading={isLoading} className={`${type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'} w-full`}> {buttonLabel} </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
