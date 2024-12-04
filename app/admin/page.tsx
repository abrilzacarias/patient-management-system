import {DataTable} from '@/components/table/DataTable'
import StatCard from '@/components/StatCard'
import { getRecentAppointmentList } from '@/lib/actions/appointment.actions'
import Link from 'next/link'
import React from 'react'
import {columns} from '@/components/table/columns'
import Image from "next/image";

const Admin = async () => {
    const appointments = await getRecentAppointmentList();
    return (
        <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
        <header className="admin-header">
            <Link href='/' className='cursor-pointer'>
            <Image
                src="/assets/icons/activity.svg"
                height={35}
                width={35}
                alt="icon"
                priority
            />
            </Link>

            <p className="text-16-semibold">Admin Dashboard</p>
        </header>
        <main className="admin-main">
            <section className="w-full space-y-4">
                <h1 className="header">Welcome!</h1>
                <p className="text-dark-700">Manage the appointments.</p>
            </section>

            <section className="admin-stat">
                <StatCard 
                    type="appointment"
                    count={appointments.scheduledCounts}
                    label="Scheduled Appointments"
                    icon="/assets/icons/appointments.svg"
                />

                <StatCard 
                    type="pending"
                    count={appointments.pendingCounts}
                    label="Pending Appointments"
                    icon="/assets/icons/pending.svg"
                />

                <StatCard 
                    type="cancelled"
                    count={appointments.cancelledCounts}
                    label="Cancelled Appointments"
                    icon="/assets/icons/cancelled.svg"
                />
            </section>

            <DataTable 
                columns={columns}
                data={appointments.documents} />
        </main>
        </div>
    )
}

export default Admin
