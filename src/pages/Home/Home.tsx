import { IonText, IonContent, IonButton, IonPage, useIonViewWillEnter, useIonToast, isPlatform} from '@ionic/react';
import { useState } from 'react';
import './Home.css';
import { Storage } from '@ionic/storage'
import HabitCard from '../../helper/HabitCard';
import { getDate, getWeekDifference, dayToString, getDifferenceDay, determineIfBetweenTime} from '../../helper/DateHelper';
import { useHistory } from 'react-router';
import { LocalNotifications} from '@capacitor/local-notifications';

const Home: React.FC = () => {
  // History
  let history = useHistory()

  // toast
  const [habitToast, dismissToast] = useIonToast() 
  
  // store 
  const store = new Storage();
  store.create();

  // variables that update habit cards
  const [habits, setHabits] = useState([] as any)

  async function viewEntered () {
    LocalNotifications.requestPermissions().catch((e) => {console.log(e)})
    await store.set("habitId", null)
    await store.set("startTime", null)
    await store.set("steps", [])
    await store.set("NumberSessionsDone", 0)
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
    // Check if habits is not null
    if (habits === null || habits === undefined || habits.length === 0) {
      habitToast({
        buttons: [{ text: 'Hide', handler: () => dismissToast() }],
        message: "You must create at least one habit to start the session!",
        cssClass: "toast"
      })
      return
    }
    // Check if the habits have actually habits and not reminders 
    var i = 0
    var y = 0
    for (var x = 0; x < habits.length; x++) {
      if (!habits[x]["isReminder"]) {
        y += 1
        if (determineIfBetweenTime(habits[x]["startTime"], habits[x]["endTime"])) i += 1
      }
    }
    if (y === 0) {
      habitToast({
        buttons: [{ text: 'Hide', handler: () => dismissToast() }],
        message: "You must create at least one habit to start the session!",
        cssClass: "toast"
      })
      return
    }
    if (i === 0) {
      habitToast({
        buttons: [{ text: 'Hide', handler: () => dismissToast() }],
        message: "Based on the current time, none of your habits are within start time and end time!",
        cssClass: "toast"
      })
      return
    }
    
    history.replace("/taskSelect")
  }
  
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonText>
          <p id="Title" style={{fontSize: 60}}>Producto</p>
        </IonText>

        <IonText>
          <p id="Description" style={{textAlign: 'center', fontSize: '25px', lineHeight: '35px'}}>Do something that is <strong>uncomfortable to you every single day!</strong> <br /> 
          That's how you get <strong>stronger</strong>! 
          </p>
        </IonText>

        <br />
        <br /> 

        {habits
        .map(function (object:any, index:any) {
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
              lastRefl={object["lastRefl"]}
              HabitOften={object["HabitOften"]} 
              SessionsProductive={object["SessionsProductive"]}
              ReflectionFeeling={object["ReflectionFeeling"]}
              startTime={object["startTime"] as string}
              endTime={object["endTime"] as string}
              MarkAsCompleteCallback={markAsComplete}
              didToday={object[dayToString(new Date().getDay())]}
              isReminder={object["isReminder"] === undefined ? false : object["isReminder"]}
            />
          )
        })}

        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
          <IonButton id="open-modal" style={{width: '50%', marginRight: 0, paddingRight: 4}} expand='block' color="light" onClick={() => {history.replace("/CreateHabit")}}>
            Add Habit
          </IonButton>

          <IonButton id="open-modal" style={{width: '50%', marginLeft: 0, paddingLeft: 4}} expand='block' color="light" onClick={() => {history.replace("/CreateReminder")}}>
            Add Reminder
          </IonButton>
        </div>


        <IonButton className="SessionButton" routerDirection="back" onClick={handleStart}>
          Start Session
        </IonButton>

        <br />

        <IonButton className="SessionButton" id="TipButton" routerDirection="back" onClick={() => history.push("TipOne")}>
          Start Tips
        </IonButton>
        
        <br />
        {!isPlatform("ios") ? <div id="footer" /> : <></>}
      </IonContent>
    </IonPage>
  );
}

export default Home;