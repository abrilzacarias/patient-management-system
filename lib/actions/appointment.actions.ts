'use server'

import { ID, Query } from "node-appwrite";
import { APPOINTMENT_COLLECTION_ID, DATABASE_ID, databases, ENDPOINT, messaging } from "../appwrite.config";
import { formatDateTime, parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";

export const createAppointment = async (appointment: CreateAppointmentParams) => {
 try {
    const newAppointment = await databases.createDocument(
        DATABASE_ID!,
        APPOINTMENT_COLLECTION_ID!,
        ID.unique(),
        appointment
    )

    return parseStringify(newAppointment);
 } catch (error) {
     console.error(error)
 }
}

export const getAppointment = async (appointmentId: string) => {
    try {
        const appointment = await databases.getDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            appointmentId
        );
        return parseStringify(appointment);
    } catch (error) {
        console.error(error)
    }
}

export const getRecentAppointmentList = async () => {
    try {
        const appointments = await databases.listDocuments(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
        );

        const sortedAppointments = appointments.documents.sort((a: any, b: any) => {
            return new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime();
        });
        
        const initialCounts = {
            scheduledCounts: 0,
            pendingCounts: 0,
            cancelledCounts: 0
        };
        const counts = (appointments.documents as Appointment[]).reduce((acc, appointment) => {
            if (appointment.status === 'scheduled') acc.scheduledCounts += 1;
            if (appointment.status === 'pending') acc.pendingCounts += 1;
            if (appointment.status === 'cancelled') acc.cancelledCounts += 1;
            return acc;
        }, initialCounts);

        const data = {
            totalCounts: appointments.total,
            ...counts,
            documents: sortedAppointments
        }
        return parseStringify(data);
    } catch (error) {
        console.error(error)
    }
}

export const updateAppointment = async ({ appointmentId, userId, appointment, type}:
    UpdateAppointmentParams
) => {
    try {
        const updatedAppointment = await databases.updateDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            appointmentId,
            appointment
        )

        if(!updatedAppointment) {
            throw new Error('Failed to update appointment');
        }

        const smsMessage = `Hi. 
        ${type === 'schedule'
            ? `Your appointment with ${appointment.primaryPhysician} at ${appointment.schedule} has been scheduled.`
            : `We regret to inform you that your appointment with ${appointment.primaryPhysician} at ${appointment.schedule} has been cancelled for the following reason: ${appointment.cancellationReason}`
        }`

        await sendSMSNotification(userId, smsMessage);

        revalidatePath(`/admin`)
        return parseStringify(updatedAppointment);

    } catch (error) {
      console.error(error)  
    }

}

export const sendSMSNotification = async (userId: string, content: string) => {
    try {
        const message = await messaging.createSms(
            ID.unique(),
            content,
            [],
            [userId]
        )

        console.log(parseStringify(message))

        return parseStringify(message);
    } catch (error) {
      console.error(error)  
    }

}