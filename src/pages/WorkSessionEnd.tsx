import {IonList, IonItem, IonLabel, IonInput, IonText, IonContent, IonButton, IonPage, IonTitle} from '@ionic/react';
import { useHistory } from 'react-router';
import { useState, useEffect} from 'react';
import "./TaskIntroduction.css"

const WorkSessionEnd: React.FC = () => {
    let history = useHistory()
    var [responses, setResponses] = useState(["", ""]);
    var [color, setColor] = useState("secondary")
    function handleChange (e:any={}, idx:number) {
        var newResponses = [...responses];
        newResponses[idx] = e;
        setResponses(newResponses);
        if (newResponses.every(x => x != "")) {
            setColor("primary"); 
        } else {
            setColor("secondary");
        }
    }

    function handleClick () {
        if (responses.every(x => x != "")) {
            history.push("/break")
        }
    }

    return (
        <IonPage>
            <IonContent>
                <IonTitle id="Title">Work Session End</IonTitle>
                <IonText>
                    <p className="Description">
                        Take a second to reflect on what you have accomplished this work session. 
                    </p>
                </IonText>
                <IonItem class="prompt">
                    <IonLabel>Accomplished:</IonLabel>
                    <IonInput id="FeelInput" type="text" placeholder="Completed 5 problems" onIonChange={(e) => handleChange(e.detail.value, 0)}></IonInput>
                </IonItem>
                <IonText>
                    <p className="Description">
                        Growth mindset is all about recognizing your efforts rather than focusing on the end goal. So instead of telling yourself, "I get to watch that episode of Stranger Things after I have completed my homework!", try to say, "Nice! I did 5 problems on my math homework. I put good effort in something productive." Be proud of the effort that you have made during your work session, even if the effort was small! 
                    </p>
                </IonText>
                <IonItem class="prompt">
                    <IonLabel>Growth Mindset:</IonLabel>
                    <IonInput id="FeelInput" type="text" placeholder="Yes! I put great effort!" onIonChange={(e) => handleChange(e.detail.value, 1)}></IonInput>
                </IonItem>
                <IonButton id="Continue" onClick={handleClick} color={color}>
                    Continue
                </IonButton>
            </IonContent>
        </IonPage>
    )
}

export default WorkSessionEnd;
