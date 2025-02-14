"use client"; 

import { motion } from "framer-motion";
import {DataTable} from '@/components/table/DataTable';
import StatCard from '@/components/StatCard';
import Link from 'next/link';
import Image from "next/image";
import DoctorModal from '@/components/DoctorModal';
import { columns } from '@/components/table/columns';
import { Appointment, Doctor } from "@/types/appwrite.types";

interface AdminContentProps {
    appointments: Appointment;
    doctors: Doctor[];
}

export default function AdminContent({ appointments, doctors }: AdminContentProps) {
    return (
        <motion.div
            className="mx-auto flex max-w-7xl flex-col space-y-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
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
                <section className="w-full flex items-center justify-between">
                    <div>
                        <h1 className="header py-4">Welcome!</h1>
                        <p className="text-dark-700">Manage the appointments.</p>
                    </div>
                    <div>
                        <DoctorModal doctors={doctors} />
                    </div>
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

                <DataTable columns={columns} data={appointments.documents} />
            </main>
        </motion.div>
    );
}
