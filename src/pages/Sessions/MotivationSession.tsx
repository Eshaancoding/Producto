import { IonList, IonCard, IonLabel, IonInput, IonItem, IonText, IonTextarea, IonContent, IonPage, useIonViewWillEnter, IonButton, } from '@ionic/react';
import { LocalNotifications } from '@capacitor/local-notifications';
import { useState } from 'react';
import "../ProductoStyle.css"
import "./WorkSession.css"

import CountBar from '../../helper/CounterBar';
import { useHistory } from 'react-router';
import { Storage } from '@ionic/storage';

const BulletPoint = (props: any) => {
    return (
        <IonItem>
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

const MotivationSession: React.FC = () => {
    const [originalMinutes, setOriginalMinutes] = useState(0)
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [habitId, setHabitId] = useState(-1)
    const [NumberSesDone, setNumberSesDone] = useState(0)
    const [responses, setResponses] = useState(["", "", "", "", "", ""])
    const [color, setColor] = useState("secondary")
    const history = useHistory()
    const store = new Storage()
    store.create()

    async function setResponse(text: string, index: number) {
        var newResponse = [...responses]
        newResponse[index] = text
        setResponses(newResponse)
        await store.set("ChallengesResponse", newResponse)
    }

    async function onIonEnter() {
        // set notifications
        store.get("ChallengesResponse").then((value) => {
            if (value != (undefined || null)) {
                setResponses(value)
            }
        })

        store.get("pomoBreak").then((value) => { setOriginalMinutes(value) })
        store.get("habitId").then((value) => { setHabitId(value) })
        store.get("NumberSessionsDone").then((value) => { setNumberSesDone(value) })
    }
    useIonViewWillEnter(onIonEnter)

    async function handleCloseButton() {
        // get today's date
        var original_habits: any = await store.get("habits")
        // get response
        await store.set("ChallengesResponse", responses)
        // change habits
        original_habits[habitId]["sessions"] += 1
        // set habits in store
        await store.set("habits", original_habits)
        // redirect to home (ending page after completed habit) 
        history.replace("/home")
    }

    async function CountBarEnd() {
        if (color === "secondary") {
            await LocalNotifications.schedule({
                notifications: [{
                    title: "Work Session", 
                    body: "It's time to work! Click the continue button to continue.",
                    id: 2,
                    extra: {
                        data: "Work Session Notification"
                    }
                }]
            })
        }
        setColor("primary")
    }

    async function ContinueButton () {
        if (color === "primary") history.replace("/WorkSession")
    }

    return (
        <IonPage>
            <IonContent fullscreen>
                <CountBar minutes={originalMinutes} seconds={0} useStartTime logMinutes={setMinutes} logSeconds={setSeconds} finish={CountBarEnd} />
                <IonText><p id="Title">Motivation Session</p></IonText>
                <IonText>
                    <TimeDisplay minutes={minutes} seconds={seconds} NumberSesDone={NumberSesDone} />
                    <IonButton id="CloseButton" onClick={handleCloseButton}> End Session </IonButton>
                    <br />
                    <br />
                    <IonButton id="CloseButton" color={color} onClick={ContinueButton}>Continue</IonButton>
                    <br />
                    <br />
                </IonText>
                
                <IonText>
                    <h2>Handling Failure</h2>
                </IonText>
                
                <IonCard className='card' style={{ margin: 20 }}>
                    <IonLabel><span className="highlight">Enter your notes about this challenge here:</span></IonLabel>
                    <IonTextarea autoGrow placeholder="Enter response here" value={responses[5]} onIonChange={(e) => { setResponse(e.detail.value as string, 5) }} />
                </IonCard>
                <IonText>
                    <p style={{ textAlign: 'center' }} >Challenges from the book <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.com/Cant-Hurt-Me-Master-Your/dp/1544512287">Can't Hurt Me</a> by David Goggins.</p>
                </IonText>
                <div id="footer" />
            </IonContent>
        </IonPage>
    )
}

export default MotivationSession;