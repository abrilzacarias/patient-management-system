import Link from 'next/link'
import React from 'react'
import Image from "next/image";
import { getAppointment } from '@/lib/actions/appointment.actions';
import { Doctors } from '@/constants';
import { formatDateTime } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const SuccessPage = async ({ params: { userId }, searchParams }: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string);
  const appointment = await getAppointment(appointmentId!);

  return (
    <div className='flex h-screen max-h-screen px-[5%]'>
      <div className="success-img">
        <Link href='/' className='hover:cursor-pointer hover:text-cyan-600 hover:font-bold'>
            Go back
        </Link>

        <section className="flex flex-col items-center">
            <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
            />
            <h2 className="header mb-6 max-w-[600px] text-center">
                Your <span className='text-cyan-600'>appointment request</span> has been succesfully submitted!
            </h2>
            <p>We will be in touch shortly to confirm.</p>
        </section>
        
        <section className='request-details'>
            <p>Requested appointment details:</p>
            <div className="flex items-center gap-3">
                <Image 
                  src={appointment.primaryPhysician?.identificationDocumentUrl!}
                  alt="doctor"
                  width={100}
                  height={100}
                  className='size-6'
                />
                <p className='whitespace-nowrap'>Dr. {appointment.primaryPhysician?.name}</p>
            </div>
            <div className="flex gap-2">
              <Image
                src="/assets/icons/calendar.svg"
                height={24}
                width={24}
                alt="calendar"
              />
              <p>{formatDateTime(appointment.schedule).dateTime}</p>
            </div>
        </section>

        <Button className='bg-cyan-600 hover:bg-cyan-700' asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>

      </div>
    </div>
  )
}

export default SuccessPage
