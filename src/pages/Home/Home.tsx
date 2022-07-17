import { IonText, IonContent, IonButton, IonPage, IonTitle, useIonViewWillEnter, useIonToast} from '@ionic/react';
import { useRef, useState } from 'react';
import './Home.css';
import RandomQuote from '../../helper/RandomQuote';
import { Storage } from '@ionic/storage'
import HabitCard from '../../helper/HabitCard';
import { getDate, getWeekDifference, dayToString, getDifferenceDay} from '../../helper/DateHelper';
import { useHistory } from 'react-router';
import { LocalNotifications} from '@capacitor/local-notifications';
import TwentyOneDaySys from './TwentyOneDaySys/TwentyOneDay';

const Home: React.FC = () => {
  // History
  let history = useHistory()

  // toast
  const [habitToast, dismissToast] = useIonToast() 
  
  // store 
  const store = new Storage();
  store.create();

  // variables that update habit cards
  const [habits, setHabits] = useState([])


  async function viewEntered () {
    await LocalNotifications.requestPermissions()
    await store.set("startTime", null)
    await store.set("steps", [])
    const habit = await store.get("habits")
    if (habit !== null) {
      const currentDate = getDate()
      
      // Check if any habits that require reflection
      var indexes:any = []
      var habitsNeedReflection = habit.filter((value:any, index:any) => {
        const lastRefl = value["lastRefl"]
        if (getDifferenceDay(currentDate, lastRefl) >= value["intervalRefl"]) {
          indexes.push(index)
          return true
        }
        else return false
      })
      // if we have any habits that need reflection, then send it to HabitReflection
      if (habitsNeedReflection.length > 0) {
        // attach a habit Id on each
        for (var i = 0; i < habitsNeedReflection.length; i++) {
          habitsNeedReflection[i]["habitId"] = indexes[i]
        }
        await store.set("habitsNeedReflection", habitsNeedReflection)
        history.replace("/HabitReflection")
      }

      // clear if new week 
      const lastDateClear = await store.get("lastDateClear")
      if (lastDateClear === null || getWeekDifference(currentDate, lastDateClear) >= 1) {
        habit.forEach((value:any, index:any) => {
          habit[index]["monday"] = 0;
          habit[index]["tuesday"] = 0;
          habit[index]["wednesday"] = 0;
          habit[index]["thursday"] = 0;
          habit[index]["friday"] = 0;
          habit[index]["saturday"] = 0;
          habit[index]["sunday"] = 0;
        })
        await store.set("lastDateClear", getDate())
      }
      // update store and hook habit
      await store.set("habits", habit)
      setHabits(habit as any)
    }
  }

  useIonViewWillEnter(viewEntered)

  async function markAsComplete (habitId: number) {
    var original_habits = await store.get("habits")
    const date = getDate()
    const day = date.getDay()

    original_habits[habitId][dayToString(day)] += 0.01 
    original_habits[habitId]["sessions"] += 1
    // set habits in store and locally
    await store.set("habits", original_habits)
    setHabits(original_habits)
  }

  async function handleStart () {
    const habits = await store.get("habits")
    var bad_habit:number = 0 
    var good_habit:number = 0
    for (var i = 0; i < habits.length; i++) {
      if (habits[i]["isBadHabit"] === true) {
        bad_habit += 1 
      } else {
        good_habit += 1
      }
    }
    if (bad_habit > 0 && good_habit > 0) {
      history.replace("/session")
    } else {
      habitToast({
        buttons: [{ text: 'hide', handler: () => dismissToast() }],
        message: "You must have at least one bad habit and one good habit!",
        cssClass: "toast"
      })
    }
  }
  
  
  
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonTitle size="large" id="Title">
          Producto 
        </IonTitle>

        <IonText>
          <RandomQuote />
        </IonText>

        <br />

        <TwentyOneDaySys habits={habits} />

        <br /> 

        {habits
        .map(function (object, index) {
          return (
            <HabitCard key={index}
              habitIndex={index}
              habitName={object["title"]}
              habitDescription={object["description"]}
              totalHours={object["hoursSpent"]}
              totalSessions={object["sessions"]}  
              monday={object["monday"]}
              tuesday={object["tuesday"]}
              wednesday={object["wednesday"]}
              thursday={object["thursday"]}
              friday={object["friday"]}
              saturday={object["saturday"]}
              sunday={object["sunday"]}
              intervalRefl={object["intervalRefl"]}
              HabitOften={object["HabitOften"]} 
              SessionsProductive={object["SessionsProductive"]}
              startTime={object["startTime"] as string}
              endTime={object["endTime"] as string}
              MarkAsCompleteCallback={markAsComplete}
              isBadHabit={object["isBadHabit"]}
              didToday={object[dayToString(new Date().getDay())]}
            />
          )
        })}

        <IonButton id="open-modal" expand='block' color="light" onClick={() => {history.replace("/CreateHabit")}}>
          Add habit
        </IonButton>

        <IonButton id="SessionButton" routerDirection="back" onClick={handleStart}>
          Start Session
        </IonButton>

        <IonButton id="WhyUseButton" routerDirection="back" onClick={() => {history.replace("/why")}}>
          Why use this app?
        </IonButton>

        <div id="footer" />
      </IonContent>
    </IonPage>
  );
}

export default Home;
