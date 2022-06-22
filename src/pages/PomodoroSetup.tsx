import {IonToggle, IonItem, IonLabel, IonInput, IonText, IonContent, IonButton, IonPage, IonTitle} from '@ionic/react';
import './PomodoroSetup.css';

import { useHistory } from 'react-router';
import { useState, useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';
import CloseButton from '../helper/CloseButton';

const PomodoroSetup: React.FC = () => {
    let history = useHistory()
    const [responses, setResponses] = useState(["", ""]);
    const [color, setColor] = useState("secondary")
    const { changePomoBreak, changePomoWork } = useContext(GlobalContext);

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

    function handleClick () {
        changePomoWork(parseInt(responses[0].toString())) 
        changePomoBreak(parseInt(responses[1].toString()))
        if (responses[0] != "" && responses[1] != "") {
            history.push("/taskIntro")
        }
    }

    return (
        <IonPage>
            <IonContent fullscreen>
                <CloseButton /> 
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
                    <IonLabel>Work Length (minutes):</IonLabel>
                    <IonInput id="SessionLength" type='number' placeholder="50" onIonChange={(e) => handleResponses(e.detail.value, 0) }/>
                </IonItem>

                <br />

                <IonItem class="prompt">
                    <IonLabel>Break Length (minutes):</IonLabel>
                    <IonInput id="BreakLength" type='number' placeholder="10" onIonChange={(e) => handleResponses(e.detail.value, 1)}/>
                </IonItem>

                <IonButton id="Continue" onClick={handleClick} color={color}>
                    Continue
                </IonButton>

            </IonContent>
        </IonPage>
    );
}

export default PomodoroSetup;