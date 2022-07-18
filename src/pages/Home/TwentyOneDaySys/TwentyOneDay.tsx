import { IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, useIonViewWillEnter, IonChip} from "@ionic/react";
import { Storage } from '@ionic/storage'
import { useEffect, useState } from "react";
import { hoursToString, getDifferenceDay, dayToString, getDate } from "../../../helper/DateHelper";
import "./TwentyOneDay.css"

function TwentyOneDaySys (props:any) {
    const store = new Storage()
    const day:string = dayToString(new Date().getDay())
    const [lastDay, setLastDay] = useState(getDate() as any)
    store.create()

    useIonViewWillEnter(async () => {
        var lastTimeDay = await store.get("TwentyOneDayLastTime") 
        if (lastTimeDay == null) {
            const date = getDate()
            await store.set("TwentyOneDayLastTime", date) 
            lastTimeDay = date
        }
        setLastDay(lastTimeDay)
    })
    
    async function resetDay () {
        await store.set("TwentyOneDayLastTime", getDate())   
    }

    function HabitChip (props:any) {
        var habit_needed = Math.floor(props.habits.filter((habit:any) => (habit["isBadHabit"] === false)).length * 0.75)
        var habit_done = props.habits.filter((habit:any) => (habit[day] > 0 && habit["isBadHabit"] === false)).length
        if (props.habits.filter((habit:any) => (habit["isBadHabit"] === false)).length < 2) {
            resetDay()
            return (
                <IonChip> Create at least 2 good habits to get started! You have {props.habits.filter((habit:any) => (habit["isBadHabit"] === false)).length} good habits.</IonChip>
            )
        } 
        else if (habit_done < habit_needed && habit_needed > 0) {
            return (
                <IonChip> So far, you have done {habit_done} habits out of the {habit_needed} habits that you need to do for today.</IonChip>
            )
        } else {
            return (
                <IonChip className="green"> Congratulations! You did {habit_done} habits out of {habit_needed} habits that you need to do! Great job!</IonChip>
            )
        }
    }

    function DayChip (props:any) {
        if (lastDay == null) {
            return (<></>)
        } else {
            const daytill:number = getDifferenceDay(getDate(), lastDay) 
            if (daytill > 21) {
                return (
                    <IonChip onClick={async () => {
                        const date = getDate()
                        await store.set("TwentyOneDayLastTime", date)
                        setLastDay(date)
                    }}>
                        Reached 21 Days! Press to reset!
                    </IonChip>
                )
            } else {
                return (
                    <IonChip>Day Counter: {daytill} days</IonChip>
                )
            }
        }
    }

    function ListHabits (props:any) {
        return (
            <>
                {props.habits.map(function(object:any, index:number) {
                    if (object["TwentyOneDaySys"]) {
                        return (
                            <IonChip key={index}>Habit: {object["title"]}</IonChip>
                        )
                    }
                })}
            </>
        )
    }

    return (
        <IonCard id="TwentyOneDayCard">
            <IonCardTitle>The 21 Day System:</IonCardTitle> 
            <IonCardSubtitle id="Subtitle"><br />The aim is only to do 75% of all of your habits. So you have to do <span style={{color: "white"}}>{Math.floor(props.habits.filter((habit:any) => (habit["isBadHabit"] === false)).length * 0.75)} habits</span> out of the total <span style={{color: "white"}}>{props.habits.filter((habit:any) => (habit["isBadHabit"] === false)).length} habits</span>. <br /> 
            There is <span style={{color: "white"}}>no punishment</span> if you miss a day! In fact, you can split habit formation into 2 day chunks and 1 rest day. <br />
            After 21 days, assess whether you could do the habits <span style={{color: "white"}}>reflexively</span> (e.i you don't have to think about it while doing). If you have, then you have successfully able to create a habit! If not, then do the same procedure again!
            </IonCardSubtitle>
            <IonCardContent id="Content">
                <ListHabits habits={props.habits} /> <br />
                <HabitChip habits={props.habits} /> <br />
                <DayChip />
            </IonCardContent>
        </IonCard>
    )
}

export default TwentyOneDaySys;