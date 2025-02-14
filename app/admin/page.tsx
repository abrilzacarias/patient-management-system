import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import { getDoctors } from "@/lib/actions/doctor.actions";
import AdminContent from "@/components/AdminContent"; 
import { revalidatePath } from "next/cache";

export default async function AdminPage() {
    revalidatePath("/admin");
    const appointments = await getRecentAppointmentList();
    const doctors = await getDoctors();

    return <AdminContent appointments={appointments} doctors={doctors} />;
}
