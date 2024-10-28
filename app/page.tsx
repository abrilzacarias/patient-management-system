import PatientForm from '@/components/ui/forms/PatientForm'
import Link from 'next/dist/client/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className='flex h-screen max-h-screen'>
      <section className='remove-scrollbar container my-auto'>
        <div className='sub-container max-w-[496px]'>
          <PatientForm />
        </div>

        <Link href="/?admin=true" className="text-green-500">
        Admin
        </Link>
      </section>

      <Image 
      src="/assets/home-patient.jpg" 
      height={500}
      width={700}
      alt="patient"
      className="side-img max-w-[50%]"
      priority  
      />
    </div>
  )
}
