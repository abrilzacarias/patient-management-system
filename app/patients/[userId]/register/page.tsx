import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";

interface SearchParamProps {
  params: {
    userId: string;
  };
}

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <RegisterForm user={user} />
        </div>
      </section>

      <Image
        src="/assets/register-img.jpg"
        height={500}
        width={700}
        alt="patient"
        className="side-img max-w-[390px]"
        priority
      />
    </div>
  );
};

export default Register;
