import {IonToggle, IonItem, IonLabel, IonInput, IonText, IonContent, IonButton, IonPage, IonCardTitle, IonCard} from '@ionic/react';
import './PomodoroSetup.css';

import { useHistory } from 'react-router';
import { useState} from 'react';
import CloseButton from '../../helper/CloseButton';
import { Storage } from '@ionic/storage';

const PomodoroSetup: React.FC = () => {
    let history = useHistory()
    const [responses, setResponses] = useState(["", ""]);
    const [color, setColor] = useState("secondary")
    const store = new Storage() 
    store.create()

    function handleResponses (e:any={}, idx:number) {
        var newResponses = [...responses];
        newResponses[idx] = e;
        setResponses(newResponses);
        if (newResponses[0] != "" && newResponses[1] != "") {
            setColor("primary");
        } else {
            setColor("secondary");
        }
    }

    async function handleClick () {
        await store.set("pomoWork", parseInt(responses[0].toString())) 
        await store.set("pomoBreak", parseInt(responses[1].toString()))
        if (responses[0] != "" && responses[1] != "") {
            history.replace("/taskSelect")
        }
    }

    return (
        <IonPage>
            <IonContent fullscreen>
                <CloseButton /> 
                <IonText>
                    <p id="Title">Pomodoro Technique</p>
                </IonText> 
                <IonText>
                    <p id="Description">
                        The Pomodoro Technique is a time management system in which you work for a fixed number of minutes, then take a break for a fixed number of minutes. This cycle repeats until you complete a set number of work periods. For many people, it is a very useful and effective tool for focusing on the task at hand.
                    </p>
                </IonText>  

                <br />

                <IonCard class="prompt">
                    <IonCardTitle>Work Length (minutes): </IonCardTitle>
                    <IonInput id="SessionLength" type='number' placeholder="50" onIonChange={(e) => handleResponses(e.detail.value, 0) }/>
                </IonCard>

                <IonCard class="prompt">
                    <IonCardTitle>Break Length (minutes): </IonCardTitle>
                    <IonInput id="BreakLength" type='number' placeholder="10" onIonChange={(e) => handleResponses(e.detail.value, 1)}/>
                </IonCard>

                <IonButton id="Continue" onClick={handleClick} color={color}>
                    Continue
                </IonButton>
                <div id="footer" />
            </IonContent>
        </IonPage>
    );
}

export default PomodoroSetup;