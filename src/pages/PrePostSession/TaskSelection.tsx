import { IonSelect, IonSelectOption, IonCard, IonItem, IonLabel, IonInput, IonText, IonContent, IonButton, IonPage, useIonViewWillEnter } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { Storage } from '@ionic/storage'
import { determineIfBetweenTime } from '../../helper/DateHelper';
import CloseButton from '../../helper/CloseButton';
import "../ProductoStyle.css"


const TaskSelection: React.FC = () => {
  let history = useHistory();
  const [color, setColor] = useState("secondary")
  const [response, setResponse] = useState("")

  // Habits list
  const store = new Storage()
  store.create()
  const [habitsList, setHabitsList] = useState([])
  useIonViewWillEnter(() => {
    store.get("habits").then(value => setHabitsList(value))
  }) 

  async function handleResponses(e: any={}) {
    await store.set("habitId", habitsList.findIndex((value) => value["title"] === e))
    if (response != null && response.trim() !== "") {
      setColor("primary")
    } else {
      setColor("secondary") 
    }
  }

  async function handleTextResponse (str: any) {
    await store.set("pomoWork", parseInt(str))
    const val:any = await store.get("habitId")
    setResponse(val)
    if (val != null && str !== "") {
      setColor("primary")
    } else {
      setColor("secondary")
    }
  }

  function handleContinue () {
    if (color === "primary") {
      history.replace("/PushPast")
    }
  }

  return (
    <IonPage>
      <IonContent>
        <CloseButton />
        <IonText> <p id="Title">Task Selection</p></IonText>
        <IonText>
          <p className="Description">
            Pick a habit that you want to form (Create a habit in the homepage and make sure it's between start time and end time if there's no dropdown)
          </p>
        </IonText>
        <br />
        <IonItem class="prompt">
          <IonSelect interface='popover' placeholder='Select habit' onIonChange={(e) => handleResponses(e.detail.value)}>
            {habitsList.map(function(object, index) {
              if (!object["isBadHabit"] && !object["isReminder"] && determineIfBetweenTime(object["startTime"], object["endTime"])) {
                return (
                  <IonSelectOption key={index} value={object["title"]}>{object["title"]}</IonSelectOption>
                )
              }
            })} 
          </IonSelect> 
        </IonItem>

        <IonCard class="card" style={{margin: 20}}>
          <IonLabel className='label'> <span className='highlight'> Enter your Work Session Duration (minutes): </span></IonLabel>
          <IonInput type="number" placeholder="25" onIonChange={(e) => handleTextResponse(e.detail.value)} />
        </IonCard>

        <br />
        <IonButton id="Continue" color={color} onClick={handleContinue}>Continue</IonButton>
      </IonContent>
    </IonPage>
  )
}

export default TaskSelection;