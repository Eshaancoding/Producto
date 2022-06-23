import { IonToolbar, IonHeader, IonModal, IonButtons, IonItem, IonLabel, IonInput, IonText, IonContent, IonButton, IonPage, IonTitle, useIonViewWillEnter } from '@ionic/react';
import { useRef, useState } from 'react';
import './Home.css';
import RandomQuote from './RandomQuote';
import { Storage } from '@ionic/storage'
import habitCard from '../helper/HabitCard';
import { OverlayEventDetail } from '@ionic/core/components';

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

  useIonViewWillEnter(() => {
    store.get("habits").then((habit:[{[key:string]: any}]) => {
      // get today's date
      var num_to_day : {[key:number]: string} = {0: "sunday", 1: "monday", 2: "tuesday", 3: "wednesday", 4: "thursday", 5: "friday", 6: "saturday"}
      const day : number = new Date().getDay()
      
      habit.forEach((value, index) => {
        // -------- Update Streaks --------
        // when it is sunday, we have to reference saturday
        if (day == 0) {
          if (value[num_to_day[6]] === true) {
            habit[index]["streaks"] += 1 
          } 
          else {
            habit[index]["streaks"] = 0
            if (value[num_to_day[0]] === true) {
              habit[index]["streaks"] = 1
            }
          }
        }
        // else reference the previous day, and update streak based on if user did the habit on that day
        else if (value[num_to_day[day-1]] === true) {
          habit[index]["streaks"] += 1
        } 
        else {
          habit[index]["streaks"] = 0
          if (value[num_to_day[day]] === true) {
            habit[index]["streaks"] = 1
          }
        }
        // once streaks is updated, clear all if it is monday (and habit is not done on monday)
        if (day == 1 && value[num_to_day[1]] === false) {
          for (var i = 0; i < 7; i++) {
            habit[index][num_to_day[i]] = false
          }
        }
      })

      // update store and hook habit
      store.set("habits", habit)
      setHabits(habit as any)
    })
  })

  async function deleteEntry(id: number) {
    var array = await store.get("habits")
    array.splice(id, 1)
    await store.set("habits", array)
    setHabits(array)
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
        "didDoLastSunday": false
      }
      var array = await store.get("habits")
      if (array === null) {
        array = [habitsAppend]
      } else {
        array = [...array, habitsAppend]
      }
      store.set("habits", array)

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
          return habitCard(index, object["title"], object["description"], object["hoursSpent"], object["sessions"], object["streaks"], object["monday"], object["tuesday"], object["wednesday"], object["thursday"], object["friday"], object["saturday"], object["sunday"], deleteEntry)
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
