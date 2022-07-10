import { IonProgressBar, useIonViewWillEnter } from "@ionic/react";
import { useEffect, useState } from "react";
import { getDifferenceMinuteSeconds, getMillisecondDifference, getDate } from './DateHelper';
import { Storage } from "@ionic/storage"

function CountBar (props:any) {
    const originalMinutes = props.minutes
    const originalSeconds = props.seconds
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const [startTime, setStartTime] = useState("")
    const [milli, setMilli] = useState(0)
    const store = new Storage() 
    store.create()
    var interval:any = null

    async function getStartTime () {
        var date:any = null 
        if (props.useStartTime) {
            var startTimeStore = await store.get("startTime")
            if (startTimeStore === null) {
                date = Date()
                await store.set("startTime", date)
            } else {
                date = startTimeStore
            }
        } else {
            date = Date()
        }
        setStartTime(date)
    }
    useIonViewWillEnter(getStartTime) 

    async function setStartTimeNull () {
        await store.set("startTime", null)
    }

    useEffect(() => {
        interval = setInterval(() => {
            if (startTime !== "") {
                const startDate = new Date(startTime)
                const endDate = getDate()
                const [minutesSet, secondsSet] = getDifferenceMinuteSeconds(endDate, startDate)
                const milliseconds = getMillisecondDifference(endDate, startDate)
                setMinutes(minutesSet) 
                setSeconds(secondsSet)
                setMilli(milliseconds)
                if (props.logMinutes != null) props.logMinutes(minutesSet)
                if (props.logSeconds != null) props.logSeconds(secondsSet)
                if (props.logMilli != null) props.logMilli(milliseconds)
            } 
            if (minutes >= originalMinutes && seconds >= originalSeconds) {
                clearInterval(interval)
                if (props.useStartTime) setStartTimeNull() 
                interval = null
                props.finish()
            }
        }, 100)
        return () => {
            clearInterval(interval)
            if (props.useStartTime) setStartTimeNull()
            interval = null
            props.finish()
        }
    })

    return (
        <IonProgressBar value={(minutes * 60 + seconds + (milli / 1000)) / (originalMinutes * 60 + originalSeconds)} />
    ) 
}

export default CountBar;