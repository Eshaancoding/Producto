import {IonToggle, IonItem, IonLabel, IonInput, IonText, IonContent, IonButton, IonPage, IonTitle} from '@ionic/react';
import './PomodoroSetup.css';

import { useState } from 'react';

const PomodoroSetup: React.FC = () => {
    const [pomoWorkBuff, setPomoWorkBuff] = useState(-1);

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
                    <IonToggle slot="end" name="pomodoro" id="pomodoro" />
                </IonItem>

                <br />

                <IonItem class="prompt">
                    <IonLabel>Work Length (minutes):</IonLabel>
                    <IonInput id="SessionLength" type='number' placeholder="50" onIonChange={(e:any={}) =>setPomoWorkBuff(e.detail.value) }/>
                </IonItem>

                <br />

                <IonItem class="prompt">
                    <IonLabel>Break Length (minutes):</IonLabel>
                    <IonInput id="BreakLength" type='number' placeholder="10" />
                </IonItem>

                <IonButton id="Continue" href="/taskIntro">
                    Continue
                </IonButton>

            </IonContent>
        </IonPage>
    );
}

export default PomodoroSetup;