import AppointmentForm from "@/components/forms/AppointmentForm";
import { getDoctors } from "@/lib/actions/doctor.actions";
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";

export default async function NewAppointment({ params: { userId } }: SearchParamProps) {
  const patient = await getPatient(userId);
  const doctors = await getDoctors();

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[740px] flex-1 justify-between">
          <AppointmentForm
            type="create"
            userId={userId}
            patient={patient}
            doctors={doctors}
          />
        </div>

      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1500}
        width={1500}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
        priority
      />
    </div>
  );
}
