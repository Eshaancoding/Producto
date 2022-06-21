import {IonProgressBar, IonList, IonItem, IonLabel, IonInput, IonText, IonContent, IonButton, IonPage, IonTitle, IonLoading} from '@ionic/react';
import { useHistory } from 'react-router';
import { useState, useEffect, useContext} from 'react';
import "./TaskIntroduction.css"
import "./WorkSession.css"

import { GlobalContext } from '../context/GlobalState';

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
                    <BulletPoint text={item} />
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
        <p id="TimeDisplay">Time remaining: {minutes_text}:{seconds_text}</p>
    )
}

const WorkSession: React.FC = () => {
    let history = useHistory()
    const { pomoWork } = useContext(GlobalContext);

    const originalMinutes = pomoWork;
    const [minutes, setMinutes] = useState(originalMinutes); 
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(seconds => seconds - 1);
            if (seconds === 0) {
                setSeconds(59);
                setMinutes(minutes => minutes - 1);
            }
            // if done
            if (minutes === 0 && seconds === 0) {
                history.push("/workSessionEnd")
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [seconds]);

    return (
        <IonPage>
            <IonContent fullscreen>
                <IonProgressBar value={(minutes * 60 + seconds) / (originalMinutes * 60)}></IonProgressBar>
                <IonTitle id="Title">Work Session</IonTitle>
                <IonText>
                    <TimeDisplay minutes={minutes} seconds={seconds} />
                    <br />
                    <h2>Breaking Habits</h2>
                </IonText>
                <List items={[
                    "There are certain habits that are beneficial, like stress reduction, quality nutrtion, good sleep, positive routines, meditation, etc. However this is pretty general.",
                    "Long term potentiation, a facet of neuroplasticity, says that if neuron A is triggered neuron B, then later on they don't require as much activity or energy to be activated together",
                    "If neuron A fires but Neuron B fires later, then it undergoes long-term depression: neurons connection starts to deterioate.",
                    "Most research says to have a reward for not participating in the bad habit or punishment for forming the activity. (ex: rubber band on wrist). However, they can't monitor themselves.",
                    "Reminders, like notifications, just DO NOT WORK.",
                    "The key to create long term depression: bring conscious awareness to the period afterward (which you do), and then take advantage of the neurons that was just fired whene generating the bad habit, then engage in a replacement behavior immediately afterward.",
                    "You start to recruit neural circuits to dismantle the neurons associated with the bad habit."
                ]} />

                <IonText>
                    <h2>How we should reward ourselves (Growth Mindset!)</h2>
                </IonText>
                <List items={[
                    "Reward prediction error is multiple rules about dopamine, the chemical signal for motivation",
                    "if you expect a reward and a reward comes, a particular behavior that was associated with generating that reward is more likely to occur (this is obvious)",
                    "If the reward arrives unexpectely, however, then the reward generated will be even GREATER than the reward generated during your expected time.",
                    "If we expect a reward, but the reward doesn't come, level of dopamine is going to drop BELOW the baseline (even before start of habit).",
                    "Reward yourself after doing the habit is actually counterproductive and won't work.",
                    "Don't spike dopamine prior or after engaging in effort of the habit, learn to spike dopamine from the effort itself.",
                    "Similar to Growth Mindset! The striving itself is the end goal, it's not actually accomplishing something. They are focused on the effort itself."
                ]} />
                <IonText>
                    <h2>Applying Procedural Memory Visualizations</h2>
                </IonText>
                <List items={[
                    "Think about the very specific steps that is required to execute that habit",
                    "Doesn't have to be in a zen position, you could think about it even if your eyes are open.",
                    "Decreases limbic friction",
                    "Do this visualization once or twice",
                    "Hebian Learning: neurons that fire together has stronger connections.",
                    "E.i, if you think about the habit once, then the neurons will fire, and thus will strengthen that connection.",
                ]} /> 
                <IonText>
                    <h2> Task Bracketing + Dopamine Spotlighting</h2>
                </IonText>
                <List items={[
                    "task bracketing underlies whether or not it is context dependent or not",
                    "Casting a spotlight around a set of events for which dopamine can be associated",
                    "Start to positively anticipate/visualize the period headed into the habit, therefore you are successfully placing the habit in, and afterwards positively anticipate/visualize the end goal (elevated mood, etc.)",
                    "It's not lying to yourself! You are initiating the fact that it is hard but you still reward yourself for actually doing the habit.",
                    "You're not contradicting the fact that some of this is unpleasant. What you're doing is taking this entire sequence of events (getting into habit, execution of habit, release of habit) and associating with a particular reward that comes later, like saying 'I have completed this'",
                    "If not concrete enough, think about the immediate procedures or sequence of events that happen 10-15 minutes before/after the habit. Then call the whole thing the habit execution.",
                    "In doing this, you are positively assocating completing the entire sequence, and engage reward prediction error in the proper way that dopamine surge can lend itself toward motivation.",
                    "Ex: Hard time getting in that 30-60 minutes of exercise. Positively anticipate the onset and the offset of that session (taking my shoes, heading out of the door to the gym). Feel even happy that you are starting the habit in the first place! Learning into the effort, going out and doing the habit (the actual habit itself, you can use procedural memory if you'd like), and then feel how great you're going to feel after you have done the habit (feeling relaxed, happy, productive, happy you have done the habit, etc.)."
                ]} />
            </IonContent>
        </IonPage>
    )  
}

export default WorkSession;