"use client"
import MyDatePicker from "@/components/DatePicker";
import { useState } from "react";

function StartDateAddContractComponent() {
    const [date,setDate] = useState<Date>(new Date())
    return <div>
        <label>تاریخ شروع قرارداد</label>
        <MyDatePicker name="start-date" state={date} setState={setDate} />
    </div>
}
function EndDateAddContractComponent() {
    const [date,setDate] = useState<Date>(new Date())
    return <div>
        <label>تاریخ پایان قرارداد</label>
        <MyDatePicker name="end-date" state={date} setState={setDate} />
    </div>
}

export default{
    StartDateAddContractComponent,EndDateAddContractComponent
}