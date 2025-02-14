import PatientForm from "@/components/forms/PatientForm";
import Link from "next/dist/client/link";
import Image from "next/image";
import dynamic from "next/dynamic";

const PasskeyModal = dynamic(() => import("@/components/PasskeyModal"), { ssr: false });

export default function Home( {searchParams}: SearchParamProps) {
  const isAdmin = searchParams?.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
    {isAdmin && <PasskeyModal />}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <PatientForm />
        </div>

        <div className="flex justify-end mt-4">
          <Link href="/?admin=true" className="text-cyan-600 hover:text-cyan-700">
            Admin
          </Link>
        </div>
      </section>

      <Image
        src="/assets/home-patient.webp"
        height={500}
        width={700}
        alt="patient"
        className="side-img max-w-[50%]"
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 700px"
      />
    </div>
  );
}
