import { IonButton, IonCard, IonContent, IonText, IonPage, IonTitle, IonItem, useIonViewDidEnter, IonLabel, IonInput } from '@ionic/react'
import "./TaskIntroduction.css"
import { useState } from 'react'
import { Storage } from '@ionic/storage'
import "./BreakHabit.css"
import { useHistory } from 'react-router'

const BreakHabit: React.FC = () => {
  const store = new Storage()
  store.create()
  const history = useHistory()
  const [color, setColor] = useState("secondary")
  const [badHabits, setBadHabits] = useState([])
  const [responses, setResponses] = useState([])
  useIonViewDidEnter(() => {
    store.get("habits").then((value) => {
      var temp:any = []
      var responses_temp:any = []
      value.forEach((element:any, index:number) => {
        if (element["isBadHabit"]) {
          temp.push(element)
          responses_temp.push("")
        }
      });
      setBadHabits(temp)
      setResponses(responses_temp)
    })
  })

  async function inputChanged (e:any, index:number) {
    var responses_temp : any = responses 
    responses_temp[index] = e
    setResponses(responses_temp)
    if (responses_temp.every((x:any) => x != "")) {
      setColor("primary")
    } else {
      setColor("secondary")
    }
  } 
  
  function handleClick() {
    if (responses.every((x) => x != "")) {
      history.push("/break")
    }
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonTitle id="Title">
          Breaking Habits
        </IonTitle>
        <IonText>
          <p className="Description">
            There is no doubt that bad habits can influence our lives too. For example, you may unhealthy amounts of junk food everyday. Another example is watching way too much Youtube on a daily basis. So it's important to pay attention to those habits, and try to break them.
            <br /> <br />
            To break those habits, you can do two things: either punish yourself or you can apply long term depression: engage in a good replacement habit <strong>immediately</strong> after you have done the bad habit. Doing this will recruit neural circuits to break down the bad habit's neural circuits, and replace it with a good habit.
            <br /> <br />
            I would suggest taking the long term depression approach, as it's easier to execute and punishing yourself must be maintained consistently.
          </p>
        </IonText>
        <br />
          {badHabits.map((item, index) => {
            return (
              <IonCard key={index}>
                <IonTitle class="BadHabitTitle">
                  Bad Habit: {item["title"]}
                </IonTitle>
                <IonItem>
                  <IonLabel position='stacked' class="Label">What are you do after your habit?</IonLabel> 
                  <IonInput type="text" onIonChange={(e) => inputChanged(e.detail.value, index)} />
                </IonItem>
                <IonItem>
                  <IonLabel position='stacked' class="Label">What punishment will you take after your habit:</IonLabel> 
                  <IonInput type="text" />
                </IonItem>
                <IonItem>
                  <IonLabel position='stacked' class="Label">How will you feel when you successfully avoided the habit?</IonLabel> 
                  <IonInput type="text" />
                </IonItem>
              </IonCard>
            )
          })}
        <IonButton id="Continue" onClick={handleClick} color={color}>
          Continue
        </IonButton>
        <div id="footer" />
      </IonContent>
    </IonPage>
 )
}

export default BreakHabit;