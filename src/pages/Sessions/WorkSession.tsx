import { IonProgressBar, IonList, IonItem, IonText, IonContent, IonPage, IonButton, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react';
import { useState, useEffect, useContext } from 'react';
import "./WorkSession.css"
import { getDate, getDifferenceDay, dayToString } from '../../helper/DateHelper';
import CountBar from '../../helper/CounterBar';

import { LocalNotifications} from '@capacitor/local-notifications'
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

const List = (props: any) => {
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
  const [ habitId, setHabitId] = useState(0)
  const [ originalMinutes, setOriginalMinutes ] = useState(0)
  const [ minutes, setMinutes ] = useState(0)
  const [ seconds, setSeconds ] = useState(0)
  const [ NumberSesDone, setNumberSesDone] = useState(0)
  const store = new Storage()
  store.create()

  async function viewEnter () {
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

  async function handleDone () {
    const day: number = new Date().getDay()
    const original_habits = await store.get("habits")
    original_habits[habitId]['hoursSpent'] += (originalMinutes) / 60
    original_habits[habitId][dayToString(day)] += (originalMinutes) / 60
    await store.set("habits", original_habits)
    await store.set("NumberSessionsDone", NumberSesDone + 1)
    history.replace("/ListLook")
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
          <IonButton id="CloseButton" onClick={handleCloseButton}>
            End Session
          </IonButton>
          <h2>Breaking Habits</h2>
        </IonText>
        <List items={[
          "There are certain habits that are beneficial, like stress reduction, quality nutrtion, good sleep, positive routines, meditation, etc. However this is pretty general.",
          "Long term potentiation, a facet of neuroplasticity, says that if neuron A is triggered neuron B, then later on they don't require as much activity or energy to be activated together",
          "If neuron A fires but Neuron B fires later, then it undergoes long-term depression: neurons connection starts to deterioate.",
          "Most research says to have a reward for not participating in the bad habit or punishment for forming the activity. (ex: rubber band on wrist). However, they can't monitor themselves.",
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
        <h2>What you should do during your break:</h2>
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

export default WorkSession;