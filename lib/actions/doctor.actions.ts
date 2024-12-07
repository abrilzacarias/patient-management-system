"use server"

import { ID, Query } from "node-appwrite"
import { parse } from "path"
import { parseStringify } from "../utils"
import { BUCKET_ID, DATABASE_ID, databases, DOCTOR_COLLECTION_ID, ENDPOINT, PROJECT_ID, storage } from "../appwrite.config"	
import { InputFile } from "node-appwrite/file"

export const getDoctors = async () => {
    try {
        const doctors = await databases.listDocuments(
            DATABASE_ID!,
            DOCTOR_COLLECTION_ID!,
            [
                Query.limit(50),
            ]
        );
        
        return parseStringify(doctors.documents);
    } catch (error) {
        console.error(error)
    }
}

export const registerDoctor = async ( { identificationDocument, ...doctor }: RegisterUserParams) => {
    try {
        let file;

        if(identificationDocument) {
            const inputFile = InputFile.fromBuffer(
                identificationDocument?.get('blobFile') as Blob,
                identificationDocument?.get('fileName') as string
            )

            file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile)
        }

        const newPatient = await databases.createDocument(
            DATABASE_ID!,
            DOCTOR_COLLECTION_ID!,
            ID.unique(),
            {
                identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
                ...doctor
            }
        )

        return parseStringify(newPatient);
    } catch (error) {
        console.error(error)
    }
}
