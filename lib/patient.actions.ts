"use server"

import { ID, Query } from "node-appwrite"
import { parse } from "path"
import { parseStringify } from "./utils"
import { users } from "./appwrite.config"	

export const createUser = async (user: CreateUserParams) => {
    console.log(user)
    try {
        const newUser = await users.create(
            ID.unique(), 
            user.email, 
            user.phone, 
            undefined,
            user.name)
        
        console.log(newUser)
        return parseStringify(newUser);
    } catch (error: any) {
        if (error && error?.code === 409){
            const documents = await users.list([
                Query.equal('email', [user.email])
            ])

        return documents?.users[0]
        }
        console.error("An error occurred while creating a new user:", error);
    }
}

export const getUser = async (userId: string) => {
    try {
        const user = await users.get(userId)
        return parseStringify(user)
    } catch (error) {
        console.error(error)
    }
    
}