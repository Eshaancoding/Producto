import {IonItem, IonLabel, IonInput, IonText, IonContent, IonButton, IonPage, IonTitle} from '@ionic/react';
import "./TaskIntroduction.css";

/* React Redux */
import { useSelector } from 'react-redux';

const TaskIntroduction: React.FC = () => {
    const pomoWorkInitial = useSelector((state:any={}) => state.pomoWork.value)
    return (
        <IonPage>
            <IonContent>
                <IonTitle id="Title">Task Introduction</IonTitle>
                <IonText>
                    <p className="Description">
                        You will work for {pomoWorkInitial} minutes. <br />
                        What is the task that you want to complete? <br />
                        Remember to be specific! Your task must be something you can complete in a reasonable amount of time and measurable (you know the set of conditions that indicates you completed your task). 
                    </p>
                </IonText>
                <br />
                <IonItem class="prompt">
                    <IonLabel>Task Name:</IonLabel>
                    <IonInput id="TaskName" type='text' placeholder="Task Name" /> 
                </IonItem>
                <br />
                <IonText>
                    <p className="Description">
                        Now, positively anticipate and visualize the specific steps that you need to take to get started on your task. Then write it down below!
                    </p>
                </IonText>

                <IonButton id="Continue" href='/taskIntro'>
                    Continue
                </IonButton>

            </IonContent>
        </IonPage>
    )
}

export default TaskIntroduction;