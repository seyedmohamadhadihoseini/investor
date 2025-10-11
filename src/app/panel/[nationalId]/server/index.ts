"use server"

import { cookies } from "next/headers"

export  async function SetPersonIdCookies(id:string) {
    const cookiesStore = await cookies()

    cookiesStore.set(process.env.NEXT_PUBLIC_PERSON_ID_NAME||"",id);
}