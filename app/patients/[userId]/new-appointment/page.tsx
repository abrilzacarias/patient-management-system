import AppointmentForm from "@/components/forms/AppointmentForm";
import PatientForm from "@/components/forms/PatientForm";
import { getPatient } from "@/lib/actions/patient.actions";
import Link from "next/dist/client/link";
import Image from "next/image";

export default async function NewAppointment({ params: { userId } }: SearchParamProps) {
    const patient = await getPatient(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 felx-col py-10">
          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient.$id}
          />
        </div>

      </section>

      <Image
        src="/assets/appointment-patient.jpg"
        height={500}
        width={700}
        alt="patient"
        className="side-img max-w-[390px] bg-bottom"
        priority
      />
    </div>
  );
}
