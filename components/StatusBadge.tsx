import clsx from 'clsx'
import React from 'react'
import Image from "next/image";
import { StatusIcon } from '@/constants';

const StatusBadge = ({status}: {status: Status}) => {
  return (
    <div className={clsx('status-badge', {
        'bg-green-600': status === 'scheduled',
        'bg-blue-600': status === 'pending',
        'bg-red-600': status === 'cancelled',
    })}>
        <Image 
        src={StatusIcon[status]}
        alt="status"
        height={24}
        width={24}
        className='h-fit w-3'
        />
        <p className={clsx('text-12-semibold', {
            'text-green-500': status === 'scheduled',
            'text-blue-500': status === 'pending',
            'text-red-500': status === 'cancelled',     
            })}>
            {status}
        </p>
    </div>
  )
}

export default StatusBadge
