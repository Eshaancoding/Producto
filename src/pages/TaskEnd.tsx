import {IonList, IonItem, IonLabel, IonInput, IonText, IonContent, IonButton, IonPage, IonTitle} from '@ionic/react';
import { useHistory } from 'react-router';
import { useState } from 'react';
import "./TaskIntroduction.css"
import CloseButton from '../helper/CloseButton';

const TaskEnd: React.FC = () => {
    let history = useHistory()
    const [responses, setResponses] = useState(["", "", ""]);
    const [color, setColor] = useState("secondary")

    function handleResponses (e:any={}, idx:number) {
        var newResponses = [...responses];
        newResponses[idx] = e;
        setResponses(newResponses);
        if (newResponses.every(x => x != "")) {
            setColor("primary");
        }
    }

    function handleContinue () {
        if (responses.every(x => x != "")) {
            history.push("/work")
        }
    }

    return (
        <IonPage>
            <IonContent fullscreen>
                <CloseButton />
                <IonTitle id="Title">Task End</IonTitle> 
                <IonText> 
                    <p className="Description">
                        Next, visualize how you would feel when you accomplished your task. What do you feel? What are you going to do next? Why is accomplishing the task important?
                    </p>
                </IonText>

                <IonItem className="prompt" key="FeelingItem">
                    <IonLabel>What will you feel?</IonLabel>
                    <IonInput id="FeelInput" type="text" onIonChange={(e) => handleResponses(e.detail.value, 0)} placeholder="Accomplished"></IonInput>
                </IonItem>
                <br />
                <IonItem className="prompt" key="NextItem">
                    <IonLabel>What you do next?</IonLabel>
                    <IonInput id="NextInput" type="text" onIonChange={(e) => handleResponses(e.detail.value, 1)} placeholder="Lay down on my bed"></IonInput>
                </IonItem>
                <br /> 
                <IonItem className="prompt" key="WhyItem">
                    <IonLabel>Why do it?</IonLabel>
                    <IonInput id="WhyInput" type="text" onIonChange={(e) => handleResponses(e.detail.value, 2)} placeholder="to learn how to code."></IonInput>
                </IonItem>
                <br />
                <IonButton id="Continue" onClick={handleContinue} color={color}>Continue</IonButton>
            </IonContent>
        </IonPage>
    )
}

export default TaskEnd;