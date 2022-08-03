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
    if (response.trim() !== "") {
      setColor("primary")
    } else {
      setColor("secondary") 
    }
  }

  async function handleTextResponse (str: any) {
    const val:any = await store.get("habitId")
    setResponse(val)
    if (val != null && str.trim() !== "") {
      setColor("primary")
    } else {
      setColor("secondary")
    }
  }

  function handleContinue () {
    if (color === "primary") {
      history.replace("/MotivationSession")
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
              if (!object["isBadHabit"] && determineIfBetweenTime(object["startTime"], object["endTime"])) {
                return (
                  <IonSelectOption key={index} value={object["title"]}>{object["title"]}</IonSelectOption>
                )
              }
            })} 
          </IonSelect> 
        </IonItem>
        <br />
        <IonCard className='card'>
          <IonLabel><span className="highlight"> Then, decide <strong>how</strong> you are going to improve slightly better than before (ex: more pushups, more study time, etc.). Push past your normal stopping point! <br /> Remember that we are only 40% of our capabilities! We could do so much more and all we have to do is remover the governor!</span></IonLabel>
          <IonInput type="text" placeholder="Enter response here" onIonChange={(e) => {handleTextResponse(e.detail.value)}} />
        </IonCard>
        <IonButton id="Continue" color={color} onClick={handleContinue}>Continue</IonButton>
      </IonContent>
    </IonPage>
  )
}

export default TaskSelection;