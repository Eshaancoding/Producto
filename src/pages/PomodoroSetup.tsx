import {IonToggle, IonItem, IonLabel, IonInput, IonText, IonContent, IonButton, IonPage, IonTitle} from '@ionic/react';
import './PomodoroSetup.css';

import { useState } from 'react';

const PomodoroSetup: React.FC = () => {
    const [pomoWorkBuff, setPomoWorkBuff] = useState(-1);
    const [responses, setResponses] = useState([false, "", ""]);
    const [color, setColor] = useState("primary")

    function handleResponses (e:any={}, idx:number) {
        var newResponses = [...responses];
        newResponses[idx] = e;
        setResponses(newResponses);
        if ((newResponses[1] != "" && newResponses[2] != "") || newResponses[0] === false) {
            setColor("primary");
        } else {
            setColor("secondary");
        }
    }

    function handleClick () {
        if ((responses[1] != "" && responses[2] != "") || responses[0] === false) {
            window.location.href = "/taskIntro";
        }
    }

    return (
        <IonPage>
            <IonContent fullscreen>
                <IonTitle id="Title">
                    Pomodoro Technique 
                </IonTitle> 
                <IonText >
                    <p id="Description">
                        The Pomodoro Technique is a time management system in which you work for a fixed number of minutes, then take a break for a fixed number of minutes. This cycle repeats until you complete a set number of work periods. For many people, it is a very useful and effective tool for focusing on the task at hand.
                    </p>
                </IonText>  

                <br />

                <IonItem class="prompt"> 
                    <IonLabel>Use Pomodoro Technique?</IonLabel>
                    <IonToggle slot="end" name="pomodoro" id="pomodoro" onIonChange={(e) => handleResponses(e.detail.checked, 0)} />
                </IonItem>

                <br />

                <IonItem class="prompt">
                    <IonLabel>Work Length (minutes):</IonLabel>
                    <IonInput id="SessionLength" type='number' placeholder="50" onIonChange={(e) => handleResponses(e.detail.value, 1) }/>
                </IonItem>

                <br />

                <IonItem class="prompt">
                    <IonLabel>Break Length (minutes):</IonLabel>
                    <IonInput id="BreakLength" type='number' placeholder="10" onIonChange={(e) => handleResponses(e.detail.value, 2)}/>
                </IonItem>

                <IonButton id="Continue" onClick={handleClick} color={color}>
                    Continue
                </IonButton>

            </IonContent>
        </IonPage>
    );
}

export { StateContext } // Export the context
export default PomodoroSetup;