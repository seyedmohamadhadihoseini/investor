"use client"
import MyDatePicker from "@/components/DatePicker";
import { useState } from "react";

function StartDateEditContractComponent({defaultDate}:{defaultDate:Date|undefined}) {
    const [date,setDate] = useState<Date>(defaultDate||new Date())
    return <div>
        <label>تاریخ شروع قرارداد</label>
        <MyDatePicker name="start-date" state={date} setState={setDate} />
    </div>
}
function EndDateEditContractComponent({defaultDate}:{defaultDate:Date|undefined}) {
    const [date,setDate] = useState<Date>(defaultDate||new Date())
    return <div>
        <label>تاریخ پایان قرارداد</label>
        <MyDatePicker name="end-date" state={date} setState={setDate} />
    </div>
}

export default{
    StartDateEditContractComponent,EndDateEditContractComponent
}