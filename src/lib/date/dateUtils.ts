export function IsSameDate(_date1: Date, _date2: Date) {
    const date1 = new Date(_date1)
    const date2 = new Date(_date2)
    return date1.getFullYear() == date2.getFullYear() &&
        date1.getMonth() == date2.getMonth() &&
        date1.getDate() == date2.getDate();
}