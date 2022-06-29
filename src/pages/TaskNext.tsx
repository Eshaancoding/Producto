import { IonSelect, IonSelectOption, IonList, IonItem, IonLabel, IonInput, IonText, IonContent, IonButton, IonPage, IonTitle, useIonViewWillEnter } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { Storage } from '@ionic/storage'
import "./TaskIntroduction.css";
import CloseButton from '../helper/CloseButton';


const TaskNext: React.FC = () => {
  let history = useHistory();
  var [list, setList] = useState(["Step 1:", "Step 2:", "Step 3:"]);
  var [responses, setResponses] = useState(["", "", "", ""]);
  var [color, setColor] = useState("secondary")
  var [placeholder, setPlaceholder] = useState(["Get out of the bed.", "Get the homework folder", "Set the homework on the desk"]);

  // Habits list
  const store = new Storage()
  store.create()
  const [habitsList, setHabitsList] = useState([])
  useIonViewWillEnter(() => {
    store.get("habits").then(value => setHabitsList(value))
  }) 

  function AddHandler() {
    setPlaceholder([...placeholder, ""]);
    setColor("secondary");
    setResponses([...responses, ""]);
    setList([...list, "Step " + (list.length + 1) + ":"]);
  }

  function handleResponses(e: any={}, idx: number) {
    if (idx === 0) {
      console.log("set habit id to", habitsList.findIndex((value) => value["title"] === e))
    }
    var newResponses = [...responses];
    newResponses[idx] = e;
    setResponses(newResponses);
    if (newResponses.every(x => x != "")) {
      setColor("primary");
    } else {
      setColor("secondary");
    }
  }

  function handleClick() {
    if (responses.every(x => x != "")) {
      history.push("/home")
    }
  }

  return (
    <IonPage>
      <IonContent>
        <CloseButton />
        <IonTitle id="Title">Next Task Introduction</IonTitle>
        <IonText>
          <p className="Description">
            Think of your next task. What do you want to do next? 
          </p>
        </IonText>
        <br />
        <IonItem class="prompt">
          <IonSelect interface='popover' placeholder='Select habit' onIonChange={(e) => handleResponses(e.detail.value, 0)}>
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
        <IonText>
          <p className="Description">
            Now, positively anticipate and visualize the specific steps that you need to take to get started on your next task, transitioning from your original task. Then write it down below!
          </p>
        </IonText>
        <br />

        <IonList id="list">
          {list.map((item, index) => {
              return (
                <IonItem key={index}>
                  <IonLabel>{item}</IonLabel>
                  <IonInput className='listInput' type='text' placeholder={placeholder[index]} onIonChange={(e) => handleResponses(e.detail.value, index + 1)} />
                </IonItem>
              )
          })}
        </IonList>

        <IonItem onClick={AddHandler} class="prompt" id="AddButton">
          <IonLabel id="AddText">Add Step</IonLabel>
        </IonItem>

        <IonButton id="Continue" onClick={handleClick} color={color}>
          Continue
        </IonButton>
        <div id="footer" />
      </IonContent>
    </IonPage>
  )
}

export default TaskNext;