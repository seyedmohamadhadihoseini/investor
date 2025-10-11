"use client"

import { Button } from "@/components/ui/button"
import style from "./style.module.css"
export default function AddButtonDataTable({addFunction}:{addFunction:()=>void}){

    return <div className={style.container}>
        <Button onClick={()=>{
            addFunction()
        }}>اضافه کردن</Button>
    </div>
}