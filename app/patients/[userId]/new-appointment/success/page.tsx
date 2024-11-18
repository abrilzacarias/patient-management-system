import Link from 'next/link'
import React from 'react'
import Image from "next/image";

function SuccessPage() {
  return (
    <div className='flex h-screen max-h-screen px-[5%]'>
      <div className="success-img">
        <Link href='/'>
            <Image 
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt='logo'
            className='h-10 w-fit' />
        </Link>

        <section className="flex flex-col items-center">
            <Image
            src="/assets/gifs/success.svg"
            height={300}
            width={280}
            alt="success"
            />
            <h2 className="header mb-6 max-w-[60px] text-center">
                Your <span className='text-green-500'>appointment request</span> has been succesfully submitted!
            </h2>
            <p>We will be in touch shortly to confirm.</p>
        </section>
        
        <section className='request-details'>
            <p>Requested appointment details:</p>
            <div className="flex items-center gap-3">
                {/* <Image 
                
                /> */}
            </div>
        </section>
      </div>
    </div>
  )
}

export default SuccessPage
