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
  const [response, setResponse] = useState(["", "", ""])

  // Habits list
  const store = new Storage()
  store.create()
  const [habitsList, setHabitsList] = useState([])
  useIonViewWillEnter(() => {
    store.get("habits").then(value => setHabitsList(value))
  }) 

  async function handleResp(e:any, index:number) {
    var copy = [...response]
    if (index === 0)  {
      const id = habitsList.findIndex((value) => value["title"] === e)
      copy[index] = id.toString()
    }
    else if (index === 1) {
      copy[index] = e as string
    }
    else if (index === 2) {
      copy[index] = e as string
    }
    setResponse(copy)

    if (copy.every((value:any) => (value !== ""))) {
      setColor("primary")
    } else {
      setColor("secondary")
    }
  }
  async function handleContinue () { 
    if (color === "primary") {
      await store.set("habitId", parseInt(response[0]))
      await store.set("pomoWork", parseInt(response[1]))
      await store.set("pomoBreak", parseInt(response[2]))

      history.replace("/VisualizeGoal")
    }
  }

  return (
    <IonPage>
      <IonContent>
        <CloseButton />
        <IonText> <p id="Title">Task Selection</p></IonText>
        <IonText>
          <p className="Description">
            Pick a habit that you want to form (Create a habit in the homepage and make sure it's between start time and end time if there's no dropdown). Habit Length {habitsList.length}
          </p>
        </IonText>
        <br />
        <IonItem class="prompt">
          <IonSelect interface='popover' placeholder='Select habit' onIonChange={(e) => handleResp(e.detail.value, 0)}>
            {habitsList.map(function(object, index) {
              if (!object["isBadHabit"] && !object["isReminder"] && determineIfBetweenTime(object["startTime"], object["endTime"])) {
                return (
                  <IonSelectOption key={index} value={object["title"]}>{object["title"]}</IonSelectOption>
                )
              } else {
                return (<></>)
              }
            })} 
          </IonSelect> 
        </IonItem>

        <IonCard class="card" style={{margin: 20}}>
          <IonLabel className='label'> <span className='highlight' style={{lineHeight: 1.5}}> Enter your Work Session Duration (minutes): <br /> <strong>Reminder:</strong> If you are more susceptible to distractions, then you should have a low work session duration (ex: 25 minutes)! If not, you should choose high work session duration (ex: 50 minutes). </span></IonLabel>
          <IonInput type="number" placeholder="25" onIonChange={(e) => handleResp(e.detail.value, 1)} />
        </IonCard>

        <IonCard class="card" style={{margin: 20}}>
          <IonLabel className='label'> <span className='highlight' style={{lineHeight: 1.5}}> Enter your Break Session Duration (minutes): </span></IonLabel>
          <IonInput type="number" placeholder="5" onIonChange={(e) => handleResp(e.detail.value, 2)} />
        </IonCard>

        <br />
        <IonButton id="Continue" color={color} onClick={handleContinue}>Continue</IonButton>
        <div id="footer" />
      </IonContent>
    </IonPage>
  )
}

export default TaskSelection;