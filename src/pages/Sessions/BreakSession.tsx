import { IonText, IonContent, IonPage, IonButton, useIonViewWillEnter} from '@ionic/react';
import { useState} from 'react';
import "./WorkSession.css"
import CountBar from '../../helper/CounterBar';

import { LocalNotifications } from '@capacitor/local-notifications'
import { useHistory } from 'react-router';
import { Storage } from '@ionic/storage';

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
    <p id="TimeDisplay">Time Spent: {minutes_text}:{seconds_text} <br />Set a timer for {props.originalMinutes} minutes!<br /><br />
    This session is meant for you to clear your head. Do not worry about work for now, no matter how urgent. Just try to listen and pay attention to your surroundings. Recognize how you feel right now in the moment. Relax different parts of the body as you do so.
    </p>
  )
}

const BreakSession: React.FC = () => {
  const history = useHistory()
  const [originalMinutes, setOriginalMinutes] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [NumberSesDone, setNumberSesDone] = useState(0)

  const store = new Storage()
  store.create()

  async function viewEnter() {
    // set Original minutes
    const pomoWork = await store.get("pomoBreak")
    setOriginalMinutes(pomoWork)

    // set number sessions done
    const sessionsDone = await store.get("NumberSessionsDone")
    setNumberSesDone(sessionsDone)

    // Work Session Notification
    LocalNotifications.schedule({
      notifications: [{
        title: "Work Session", 
        body: "It's time to work!",
        id: 1,
        extra: {
            data: "Work Session Notification"
        }
      }]
    }).catch((e:any) => console.log(e))
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
    history.replace("/BigPicture")
  }

  async function handleCloseButton() {
    history.replace("/Home")
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <CountBar minutes={originalMinutes} seconds={0} useStartTime logMinutes={setMinutes} logSeconds={setSeconds} finish={handleDone} />
        <IonText><p id="Title">Break Session</p></IonText>
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

export default BreakSession;