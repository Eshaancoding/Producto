import { IonCard, IonList, IonItem, IonText, IonContent, IonPage, IonButton, useIonViewWillEnter, useIonViewWillLeave, IonCardTitle } from '@ionic/react';
import { useState, useEffect, useContext } from 'react';
import "./WorkSession.css"
import { getDate, getDifferenceDay, dayToString } from '../../helper/DateHelper';
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
    <p id="TimeDisplay">Time Spent: {minutes_text}:{seconds_text} <br /> Sessions Done: {props.NumberSesDone} </p>
  )
}

const WorkSession: React.FC = () => {
  const history = useHistory()
  const [habitId, setHabitId] = useState(0)
  const [originalMinutes, setOriginalMinutes] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [NumberSesDone, setNumberSesDone] = useState(0)
  const [one, setOne] = useState("Not answered yet.")
  const [two, setTwo] = useState("Not answered yet.")
  const [three, setThree] = useState("Not answered yet.")
  const [cookieResp, setCookieResp] = useState("Not answered yet.")
  const [pushPast, setPushPast] = useState("Not answered yet.")
  const [failure, setFailure] = useState("Not answered yet.")

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

    // Get the rest of the details
    store.get("VisualizationResponseOne").then((value:any) => setOne(value))
    store.get("VisualizationResponseTwo").then((value:any) => setTwo(value))
    store.get("VisualizationResponseThree").then((value:any) => setThree(value))
    store.get("CookieResponse").then((value:any) => setCookieResp(value))
    store.get("habits").then((value:any) => {
      if ("pushPastDesc" in value[habitId]) setPushPast(value[habitId]["pushPastDesc"])
      if ("failureResp" in value[habitId]) setFailure(value[habitId]["failureResp"][2])
    })

    // Work Session Notification
    const result = await LocalNotifications.schedule({
      notifications: [{
        title: "Work Session", 
        body: "It's time to work!",
        id: 1,
        extra: {
            data: "Work Session Notification"
        }
      }]
    })
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
    if (Math.floor(Math.random() * 101) < 40) history.replace("/Remember")
    else history.replace("/Visualization")
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
    history.replace("/Failure")
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <CountBar minutes={originalMinutes} seconds={0} useStartTime logMinutes={setMinutes} logSeconds={setSeconds} finish={handleDone} />
        <IonText><p id="Title">Work Session</p></IonText>
        <IonText>
          <TimeDisplay minutes={minutes} seconds={seconds} NumberSesDone={NumberSesDone} /> <br />
        </IonText>
        <IonButton id="CloseButton" onClick={handleCloseButton}>
          End Session
        </IonButton>
        <div id="footer" />
        <IonCard class="card">
          <IonCardTitle id="CardTitle">How you can push your past normal stopping point than before?</IonCardTitle>           
          <IonText><p id="Description">{pushPast}</p></IonText>
        </IonCard>
        <IonCard class="card">
          <IonCardTitle id="CardTitle">Last Failure: Then make a list of things that you can fix. Be brutally honest with yourself!</IonCardTitle>           
          <IonText><p id="Description">{failure}</p></IonText>
        </IonCard>
        <IonCard class="card">
          <IonCardTitle id="CardTitle">What is the goal that you want to achieve? What/How does it feel like, or look like?</IonCardTitle>           
          <IonText><p id="Description">{one}</p></IonText>
        </IonCard>
        <IonCard class="card">
          <IonCardTitle id="CardTitle">What are your barriers that is limiting you to success? How will you attack those problems when they occur? (Remember you could use other techniques like the 40% rule, Cookie Jar, or anything else)</IonCardTitle>           
          <IonText><p id="Description">{two}</p></IonText>
        </IonCard>
        <IonCard class="card">
          <IonCardTitle id="CardTitle">Why are you doing this? What is driving you toward this achievement? Where does the darkness you're using as fuel come from? What has calloused your mind?</IonCardTitle>           
          <IonText><p id="Description">{three}</p></IonText>
        </IonCard>
        <IonCard class="card">
          <IonCardTitle id="CardTitle">What did you achieve in life? What life obstacles did you overcome?</IonCardTitle>           
          <IonText><p id="Description">{cookieResp}</p></IonText>
        </IonCard>
        
        <div id="footer" />
      </IonContent>
    </IonPage>
  )
}

export default WorkSession;