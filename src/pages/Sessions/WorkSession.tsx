import { IonList, IonItem, IonText, IonContent, IonPage, IonButton, useIonViewWillEnter } from '@ionic/react';
import { useState } from 'react';
import "./WorkSession.css"
import { dayToString } from '../../helper/DateHelper';
import CountBar from '../../helper/CounterBar';

import { LocalNotifications } from '@capacitor/local-notifications'
import { useHistory } from 'react-router';
import { Storage } from '@ionic/storage';

const BulletPoint = (props: any) => {
  return (
    <IonItem id="BulletPoint">
      <IonText>
        <p className="BodyText">{props.text}</p>
      </IonText>
    </IonItem>
  )
}

export const List = (props: any) => {
  return (
    <IonList id="list" lines='inset' inset={true}>
      {props.items.map((item: any, idx: number) => {
        return (
          <BulletPoint key={idx} text={item} />
        )
      })}
    </IonList>
  )
}

const TimeDisplay = (props: any) => {
  var minutes = props.minutes;
  var seconds = props.seconds;
  var minutes_text = minutes.toString();
  var seconds_text = seconds.toString();
  if (seconds < 10 && seconds >= 0) {
    seconds_text = "0" + seconds_text;
  }
  if (minutes < 0 || seconds < 0) {
    minutes_text = "0";
    seconds_text = "00";
  }
  return (
    <p id="TimeDisplay">Time Spent: {minutes_text}:{seconds_text} <br /> Sessions Done: {props.NumberSesDone} <br /><br />Set an countdown on your phone for {props.originalMinutes} minutes! </p>
  )
}

const WorkSession: React.FC = () => {
  const history = useHistory()
  const [habitId, setHabitId] = useState(0)
  const [originalMinutes, setOriginalMinutes] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [NumberSesDone, setNumberSesDone] = useState(0)

  const store = new Storage()
  store.create()

  async function viewEnter() {
    // set Original minutes
    const pomoWork = await store.get("pomoWork")
    setOriginalMinutes(pomoWork)

    // get habit id 
    const habitId = await store.get("habitId")
    setHabitId(habitId)

    // set number sessions done
    const sessionsDone = await store.get("NumberSessionsDone")
    setNumberSesDone(sessionsDone)
  }
  useIonViewWillEnter(viewEnter)

  async function handleDone() {
    // Work Session End Notification 
    LocalNotifications.schedule({
      notifications: [{
        title: "Motivation Session", 
        body: "It's time for the motivation session!",
        id: 2,
        extra: {
          data: "Motivation Session Notification"
        }
      }]
    }).catch((e:any) => console.log(e))

    const day: number = new Date().getDay()
    const original_habits = await store.get("habits")
    original_habits[habitId]['hoursSpent'] += (originalMinutes) / 60
    original_habits[habitId][dayToString(day)] += (originalMinutes) / 60
    await store.set("habits", original_habits)
    await store.set("NumberSessionsDone", NumberSesDone + 1)
    await store.set("startTime", undefined)
    history.replace("/BreakSession")
  }

  async function handleCloseButton() {
    // get today's date
    const day: number = new Date().getDay()
    var original_habits: any = await store.get("habits")

    // change habits
    original_habits[habitId][dayToString(day)] += (minutes * 60 + seconds) / 3600
    original_habits[habitId]["sessions"] += 1
    original_habits[habitId]['hoursSpent'] += (minutes * 60 + seconds) / 3600
    // set habits in store
    await store.set("habits", original_habits)
    // redirect to home (ending page after completed habit) 
    history.replace("/Home")
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <CountBar minutes={originalMinutes} seconds={0} useStartTime logMinutes={setMinutes} logSeconds={setSeconds} finish={handleDone} />
        <IonText><p id="Title">Work Session</p></IonText>
        <IonText>
          <TimeDisplay minutes={minutes} seconds={seconds} NumberSesDone={NumberSesDone} originalMinutes={originalMinutes} /> <br />
        </IonText>
        <IonButton id="CloseButton" onClick={handleCloseButton}>
          End Session
        </IonButton>
        <div id="footer" />
      </IonContent>
    </IonPage>
  )
}

export default WorkSession;