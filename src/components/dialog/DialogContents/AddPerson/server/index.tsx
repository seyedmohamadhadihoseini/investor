"use server"
import prisma from "@/services/prisma";

export default async function AddNewPersonServerAction(prevState: { id: number, success: boolean }, formData: FormData) {
    const FullName = formData.get("full-name") as string;
    const nationalId = formData.get("national-id") as string;
    const phoneNumber = formData.get("phone") as string;
    
    const parentReferrerId = formData.get("referrer-national-id");
    let success = true;
    try {

        await prisma.person.create({
            data: {
                nationalId, FullName, phoneNumber, parentReferrerId:parentReferrerId?parentReferrerId as string:null
            }
        })
    }
    catch (error){
        console.log(error)
        success = false
    }
    return {
        id: prevState.id + 1,
        success
    };
}