import {IonList, IonItem, IonLabel, IonInput, IonText, IonContent, IonButton, IonPage, IonTitle} from '@ionic/react';
import { useState } from 'react';
import "./TaskIntroduction.css";

const TaskIntroduction: React.FC = () => {
    var [list, setList] = useState(["Step 1:", "Step 2:", "Step 3:"]);
    var [responses, setResponses] = useState(["", "", "", ""]);
    var [color, setColor] = useState("secondary")
    var [placeholder, setPlaceholder] = useState(["Get out of the bed.", "Get the homework folder", "Set the homework on the desk"]); 

    function AddHandler () {
        setPlaceholder([...placeholder, ""]);
        setColor("secondary");
        setResponses([...responses, ""]);
        setList([...list, "Step " + (list.length + 1) + ":"]);
    }

    function handleResponses (e:any={}, idx:number) {
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
            window.location.href = "/taskProcedure";
        }
    }

    return (
        <IonPage>
            <IonContent>
                <IonTitle id="Title">Task Introduction</IonTitle>
                <IonText>
                    <p className="Description">
                        What is the task that you want to complete? <br />
                        Remember to be specific! Your task must be something you can complete in a reasonable amount of time and measurable (you know the set of conditions that indicates you completed your task). 
                    </p>
                </IonText>
                <br />
                <IonItem class="prompt">
                    <IonLabel>Task Name:</IonLabel>
                    <IonInput id="TaskName" type='text' placeholder="Do my homework" onIonChange={(e) => handleResponses(e.detail.value, 0)}/> 
                </IonItem>
                <br />
                <IonText>
                    <p className="Description">
                        Now, positively anticipate and visualize the specific steps that you need to take to get started on your task. Then write it down below!
                    </p>
                </IonText>
                <br />

                <IonList id="list"> 
                    {list.map((item, index) => {
                        return (
                            <IonItem key={index}>
                                <IonLabel>{item}</IonLabel>
                                <IonInput className='listInput' type='text' placeholder={placeholder[index]} onIonChange={(e) => handleResponses(e.detail.value, index+1)} />
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
                <div id="footer">
                </div>
            </IonContent>
        </IonPage>
    )
}

export default TaskIntroduction;