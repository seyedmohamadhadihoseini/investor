"use server"

import prisma from "@/services/prisma";


export async function RemoveUserServerAction(id: string) {
    await prisma.person.delete({ where: { id } })
}

export async function GetPersonByNationalId(nationalId: string) {
    return await prisma.person.findUnique({ where: { nationalId } })
}
export async function GetAllPeople() {
    const people = await prisma.person.findMany({ include: { investments: true ,referrers:true} });
    return people
}