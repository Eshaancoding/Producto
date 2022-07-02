import {IonList, IonItem, IonText, IonContent, IonPage, IonTitle, useIonViewWillEnter} from '@ionic/react';
import { useState} from 'react';
import "./TaskIntroduction.css"
import "./WorkSession.css"

import CountBar from '../helper/CounterBar';
import { useHistory } from 'react-router';
import { Storage } from '@ionic/storage';

const BulletPoint = (props:any) => {
    return (
        <IonItem>
            <IonText>
                <p className="BodyText">{props.text}</p> 
            </IonText>
        </IonItem>
    )
}

const List = (props:any) => {
    return (
        <IonList id="list" lines='inset' inset={true}>
            {props.items.map((item:any, idx:number) => {
                return (
                    <BulletPoint key={idx} text={item} />
                )
            })}
        </IonList>
    )
}

const TimeDisplay = (props:any) => {
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
        <p id="TimeDisplay">Time Spent: {minutes_text}:{seconds_text}</p>
    )
}

const BreakSession: React.FC = () => {
    const [originalMinutes, setOriginalMinutes] = useState(0)
    const [minutes, setMinutes] = useState(0); 
    const [seconds, setSeconds] = useState(0);
    const history = useHistory()
    const store = new Storage()
    store.create()

    async function onIonEnter () {
        store.get("pomoBreak").then((value) => {setOriginalMinutes(value)})
    }
    useIonViewWillEnter(onIonEnter)

    return (
        <IonPage>
            <IonContent fullscreen>
                <CountBar minutes={originalMinutes} seconds={0} useStartTime logMinutes={setMinutes} logSeconds={setSeconds} finish={() => history.replace("/work")} />
                <IonTitle id="Title">Break Session</IonTitle>
                <IonText>
                    <TimeDisplay minutes={minutes} seconds={seconds} />
                    <br />
                    <h2>What you should do during your break:</h2>
                </IonText>
                <List items={[
                    "Although it is tempting, try not to engage in any activities that spikes high amounts of dopamine.", 
                    "This includes playing video games, going on Youtube or Instagram, or even listening to music!", 
                    "The reason for this is because this high spike of dopamine will lead to a lower overall circulation of dopamine in your body, leading you to become less motivated. ",
                    "Since you are not engaging in any activities that spike high amounts of dopamine, you will have a better overall circulation of dopamine in your body, and you will be more motivated for your next work session.",
                    "So instead, try to meditate or just stare up at your ceiling. Yes, it is very boring, but that's the point!",
                    "This information is from the episode 'Controlling Your Dopamine For Motivation, Focus & Satisfaction' from the Huberman Lab Podcast by Andrew Huberman! Check it out if you're interested for more information. A lot of these tips are from the Huberman Lab Podcast.",
                ]} />
                <IonText> 
                    <h2>Quote from Marcus Aurelius:</h2>
                </IonText>
                <List items={[
                    "Concentrate every minute on doing what's in front of you with precise and genuine seriousness, tenderly, willingly, with justice. And on freeing yourself from all other distractions.", 
                    "Yes, you can, if you do everything as if it were the last thing you were doing in your life, and stop being aimless, stop letting your emotions override what your mind tells you.",
                    "Stop being hypocritical, self-centered, and irritable.",
                    "You see how few things you have to do to live a satisfying and reverent life? If you can manage this, that's all even the gods can ask of you."
                ]} />
                <div id="footer" />
            </IonContent>
        </IonPage>
    )  
}

export default BreakSession;