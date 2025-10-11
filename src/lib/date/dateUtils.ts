export function IsSameDate(_date1: Date, _date2: Date) {
    const date1 = new Date(_date1)
    const date2 = new Date(_date2)
    return date1.getFullYear() == date2.getFullYear() &&
        date1.getMonth() == date2.getMonth() &&
        date1.getDate() == date2.getDate();
}
export function ShiftDate(_date:Date,day_shift:number){
    const date = new Date(_date) 
    date.setDate(date.getDate()+day_shift)

    return date;
}