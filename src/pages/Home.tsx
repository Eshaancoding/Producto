import { IonToolbar, IonHeader, IonModal, IonButtons, IonItem, IonLabel, IonInput, IonText, IonContent, IonButton, IonPage, IonTitle, useIonViewWillEnter } from '@ionic/react';
import { useRef, useState } from 'react';
import './Home.css';
import RandomQuote from './RandomQuote';
import { Storage } from '@ionic/storage'
import habitCard from '../helper/HabitCard';
import { OverlayEventDetail } from '@ionic/core/components';
import { getDate, getDifferenceDay, getWeekDifference, dayToString} from '../context/DateHelper';

const Home: React.FC = () => {
  // Modal
  const modal = useRef<HTMLIonModalElement>(null);
  const inputDescription = useRef<HTMLIonInputElement>(null);
  const inputTitle = useRef<HTMLIonInputElement>(null);

  // store 
  const store = new Storage();
  store.create();

  // variables that update habit cards
  const [habits, setHabits] = useState([])

  // modal functions
  function confirm() {
    modal.current?.dismiss([inputTitle.current?.value, inputDescription.current?.value], 'confirm')
  }

  async function viewEntered () {
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
          habit[index]["monday"] = false;
          habit[index]["tuesday"] = false;
          habit[index]["wednesday"] = false;
          habit[index]["thursday"] = false;
          habit[index]["friday"] = false;
          habit[index]["saturday"] = false;
          habit[index]["sunday"] = false;
        })
        await store.set("lastDateClear", getDate())
      }
      // update store and hook habit
      await store.set("habits", habit)
      setHabits(habit as any)
    }
  }

  useIonViewWillEnter(viewEntered)

  async function deleteEntry(id: number) {
    var array = await store.get("habits")
    array.splice(id, 1)
    await store.set("habits", array)
    setHabits(array)
  }

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
    original_habits[habitId][dayToString(day)] = true
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
        "monday": false,
        "tuesday": false,
        "wednesday": false,
        "thursday": false,
        "friday": false,
        "saturday": false,
        "sunday": false,
        "hoursSpent": 0,
        "sessions": 0,
        "streaks": 0,
        "lastSessionDate": null
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
          return habitCard(index, object["title"], object["description"], object["hoursSpent"], object["sessions"], object["streaks"], object["monday"], object["tuesday"], object["wednesday"], object["thursday"], object["friday"], object["saturday"], object["sunday"], deleteEntry, markAsComplete)
        })}

        <IonButton id="open-modal" expand='block' color="light">
          Add habit
        </IonButton>

        <IonButton id="SessionButton" routerLink='/session' routerDirection="back">
          Start Session
        </IonButton>


        {/* Modal Code! */}
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
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
}

export default Home;
