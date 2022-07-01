import { IonSelect, IonSelectOption, IonList, IonItem, IonLabel, IonInput, IonText, IonContent, IonButton, IonPage, IonTitle, useIonViewWillEnter } from '@ionic/react';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { Storage } from '@ionic/storage'
import "./TaskIntroduction.css";
import CloseButton from '../helper/CloseButton';
import { GlobalContext } from '../context/GlobalState';


const TaskSelection: React.FC = () => {
  let history = useHistory();
  const { setHabitId } = useContext(GlobalContext)
  const [color, setColor] = useState("secondary")

  // Habits list
  const store = new Storage()
  store.create()
  const [habitsList, setHabitsList] = useState([])
  useIonViewWillEnter(() => {
    store.get("habits").then(value => setHabitsList(value))
  }) 

  function handleResponses(e: any={}) {
    setHabitId(habitsList.findIndex((value) => value["title"] === e))
    setColor("primary")
  }

  function handleContinue () {
    if (color === "primary") {
      history.push("/IntroHabit")
    }
  }

  return (
    <IonPage>
      <IonContent>
        <CloseButton />
        <IonTitle id="Title">Task Selection</IonTitle>
        <IonText>
          <p className="Description">
            What is the task that you want to complete? (Create a habit in the homepage if there's no dropdown)
          </p>
        </IonText>
        <br />
        <IonItem class="prompt">
          <IonSelect interface='popover' placeholder='Select habit' onIonChange={(e) => handleResponses(e.detail.value)}>
            {habitsList.map(function(object, index) {
              if (!object["isBadHabit"]) {
                return (
                  <IonSelectOption key={index} value={object["title"]}>{object["title"]}</IonSelectOption>
                )
              }
            })} 
          </IonSelect> 
        </IonItem>
        <br />
        <IonButton id="Continue" color={color} onClick={handleContinue}>Continue</IonButton>
      </IonContent>
    </IonPage>
  )
}

export default TaskSelection;