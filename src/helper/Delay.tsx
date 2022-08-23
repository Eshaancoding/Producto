import { IonTextarea, IonCard, IonLabel, IonPage, IonTitle, IonContent, useIonViewWillEnter, IonButton, IonProgressBar} from '@ionic/react';
import { useEffect, useState } from 'react';
import { getDate, getDifferenceMinuteSeconds, getMillisecondDifference } from './DateHelper';

export default function Delay (props:any) {
    const durationMin:number = props.minutes 
    const durationSec:number = props.seconds 
    const startDate:Date = props.initialTime 
    const [seconds, setSeconds] = useState(0)
    const [milli, setMilli] = useState(0)
    var interval:any = null
    var endDate:any = null
    
    useEffect(() => {
        interval = setInterval(() => {
            const endDate = getDate()
            const [minutesSet, secondsSet] = getDifferenceMinuteSeconds(endDate, startDate)
            const milli = getMillisecondDifference(endDate, startDate)
            setSeconds(minutesSet * 60 + secondsSet)
            setMilli(milli)
        }, 10)
        return () => {
            clearInterval(interval)
        }
    })

    function getOpacity () {
        if (seconds >= (durationMin * 60 + durationSec)) {
            let diff = (seconds - (durationMin * 60 + durationSec)) * 1000 + milli 
            if (diff > 1000) {
                clearInterval(interval)
                return 1
            }
            else return diff / 1000
        } else {
            return 0
        }
    }

    function getDisplay () {
        if (seconds >= (durationMin * 60 + durationSec)) {
            return "block" 
        } else {
            return "none"
        }
    }

    return (
        <>
            <div style={{opacity: getOpacity(), display: getDisplay()}}>
                {props.children}
            </div>
        </>
    )
}