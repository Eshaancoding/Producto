import {IonToggle, IonItem, IonLabel, IonInput, IonText, IonContent, IonButton, IonPage, IonTitle} from '@ionic/react';
import './PomodoroSetup.css';

/* React Redux*/
import { useState } from 'react'; //for use with hooks
import { useDispatch, useSelector } from 'react-redux';
import { pomoWorkSlice } from '../name';

const PomodoroSetup: React.FC = () => {
    const pomoWorkInitial = useSelector((state:any={}) => state.pomoWork.value)
    const dispatch = useDispatch();
    const [pomoWorkBuff, setPomoWorkBuff] = useState(pomoWorkInitial);

    function handleContinue () {
        console.log("sdfsdf")
        console.log(pomoWorkBuff, pomoWorkSlice);
        dispatch(pomoWorkSlice.actions.changeValue(pomoWorkBuff));
        window.location.href = '/taskIntro';
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
                    <IonToggle slot="end" name="pomodoro" id="pomodoro" />
                </IonItem>

                <br />

                <IonItem class="prompt">
                    <IonLabel>Work Length (minutes):</IonLabel>
                    <IonInput id="SessionLength" type='number' placeholder="25" onIonChange={(e:any={}) =>setPomoWorkBuff(e.detail.value) }/>
                </IonItem>

                <br />

                <IonItem class="prompt">
                    <IonLabel>Break Length (minutes):</IonLabel>
                    <IonInput id="BreakLength" type='number' placeholder="5" />
                </IonItem>

                <IonButton id="Continue" onClick={handleContinue}>
                    Continue
                </IonButton>

            </IonContent>
        </IonPage>
    );
}

export default PomodoroSetup;