import { IonToolbar, IonHeader, IonModal, IonButtons, IonItem, IonLabel, IonInput, IonText, IonContent, IonButton, IonPage, IonTitle, useIonViewWillEnter, IonToggle, useIonToast} from '@ionic/react';
import { useRef, useState } from 'react';
import './Home.css';
import RandomQuote from '../helper/RandomQuote';
import { Storage } from '@ionic/storage'
import HabitCard from '../helper/HabitCard';
import { OverlayEventDetail } from '@ionic/core/components';
import { getDate, getDifferenceDay, getWeekDifference, dayToString} from '../helper/DateHelper';
import { useHistory } from 'react-router';
import { LocalNotifications } from '@capacitor/local-notifications';

const Home: React.FC = () => {
  // History
  let history = useHistory()

  // toast
  const [habitToast, dismissToast] = useIonToast() 
  // Modal
  const modal = useRef<HTMLIonModalElement>(null);
  const inputDescription = useRef<HTMLIonInputElement>(null);
  const inputTitle = useRef<HTMLIonInputElement>(null);
  const badHabitToggle = useRef<HTMLIonToggleElement>(null);

  // store 
  const store = new Storage();
  store.create();

  // variables that update habit cards
  const [habits, setHabits] = useState([])

  // modal functions
  function confirm() {
    modal.current?.dismiss([inputTitle.current?.value, inputDescription.current?.value, badHabitToggle.current?.checked], 'confirm')
  }

  async function viewEntered () {
    await LocalNotifications.requestPermissions()
    await store.set("startTime", null)
    const habit = await store.get("habits")
    if (habit !== null) {
      const currentDate = getDate()
      // check if we broke a habit
      habit.forEach((value:any, index:any) => {
        const lastSessionDate = value["lastSessionDate"] 
        if (value["lastSessionDate"] !== null && getDifferenceDay(currentDate, lastSessionDate) >= 2) {
          habit[index]["streaks"] = 0 
        }
      })
      
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

    if (original_habits[habitId]["lastSessionDate"] != undefined && getDifferenceDay(date, original_habits[habitId]["lastSessionDate"]) === 1) {
      original_habits[habitId]["streaks"] += 1
    }
    else if (original_habits[habitId][dayToString(day)] === false && original_habits[habitId]["streaks"] === 0) {
        original_habits[habitId]["streaks"] = 1
    }
    original_habits[habitId][dayToString(day)] += 0.01 
    original_habits[habitId]["sessions"] += 1
    original_habits[habitId]["lastSessionDate"] = getDate()
    // set habits in store and locally
    await store.set("habits", original_habits)
    setHabits(original_habits)
  }

  async function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
      const habitsAppend:{[key:string]: any} = {
        "title": ev.detail.data[0],
        "description": ev.detail.data[1],
        "monday": 0,
        "tuesday": 0,
        "wednesday": 0,
        "thursday": 0,
        "friday": 0,
        "saturday": 0,
        "sunday": 0,
        "hoursSpent": 0,
        "sessions": 0,
        "streaks": 0,
        "lastSessionDate": null,
        "isBadHabit": ev.detail.data[2]
      }
      var array = await store.get("habits")
      if (array === null) {
        array = [habitsAppend]
        await store.set("lastDateClear", getDate())
      } else {
        array = [...array, habitsAppend]
      }
      await store.set("habits", array)

      setHabits(array)
    }
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
          Welcome! <br />
          Let's get started!
        </IonTitle>

        <IonText>
          <RandomQuote />
        </IonText>

        <br />

        {habits.map(function (object, index) {
          return (
            <HabitCard key={index}
              habitIndex={index}
              habitName={object["title"]}
              habitDescription={object["description"]}
              totalHours={object["hoursSpent"]}
              totalSessions={object["sessions"]}  
              streaks={object["streaks"]}
              monday={object["monday"]}
              tuesday={object["tuesday"]}
              wednesday={object["wednesday"]}
              thursday={object["thursday"]}
              friday={object["friday"]}
              saturday={object["saturday"]}
              sunday={object["sunday"]}
              MarkAsCompleteCallback={markAsComplete}
              isBadHabit={object["isBadHabit"]}
            />
          )
        })}

        <IonButton id="open-modal" expand='block' color="light">
          Add habit
        </IonButton>

        <IonButton id="SessionButton" routerDirection="back" onClick={handleStart}>
          Start Session
        </IonButton>


        {/* Modal Code for add habit */}
        <IonModal ref={modal} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
              </IonButtons>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>
                  Confirm
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonLabel position="stacked">Enter Title</IonLabel>
              <IonInput ref={inputTitle} type="text" />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Enter description</IonLabel>
              <IonInput ref={inputDescription} type="text" />
            </IonItem>
            <IonItem>
              <IonLabel>Is it a bad habit?</IonLabel>
              <IonToggle ref={badHabitToggle}></IonToggle>
            </IonItem>
          </IonContent>
        </IonModal>
        <div id="footer" />
      </IonContent>
    </IonPage>
  );
}

export default Home;
