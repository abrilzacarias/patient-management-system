import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";

interface SearchParamProps {
  params: {
    userId: string;
  };
}

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);

  return (
    <div className="flex h-screen max-h-screen">
        <section className="remove-scrollbar container flex flex-col justify-between py-8 pb-8">
          <div className="sub-container max-w-[800px]">
            <RegisterForm user={user} />
          <div className="pb-10"></div>
          </div>
        </section>

      <Image
        src="/assets/images/register-img.jpg"
        height={1000}
        width={1000}
        alt="patient"
        className="max-w-[390px]"
        priority
      />
    </div>
  );
};

export default Register;
