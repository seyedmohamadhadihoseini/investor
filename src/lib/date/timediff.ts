import moment from 'moment';
export function GetTimeDiff(time1:Date,time2:Date){
    const duration = moment.duration(moment(time2,"HH:mm").diff(moment(time1,"HH:mm")));

    return {
        diffYears:duration.years(),
        diffMonths:duration.months(),
        diffHours:duration.hours(),
        diffMinutes:duration.minutes(),
        diffDays:duration.days(),
    }
    
}
export function GetDayDiff(time1:Date,time2:Date){
    const msDiff = Math.abs(time1.getTime()-time2.getTime())

    return Math.floor(msDiff / (1000*60*60*24))
}