import {IonList, IonItem, IonLabel, IonInput, IonText, IonContent, IonButton, IonPage, IonTitle} from '@ionic/react';
import { useHistory } from 'react-router';
import { useState } from 'react';
import "./TaskIntroduction.css"

const TaskProcedure: React.FC = () => {
    let history = useHistory(); 
    var [list, setList] = useState(["Step 1:", "Step 2:", "Step 3:", "Step 4:", "Step 5:"]);
    var [responses, setResponses] = useState(["", "", "", "", ""]);
    var [color, setColor] = useState("secondary")
    var [placeholder, setPlaceholder] = useState(["Read the problem", "Visualize the problem", "Solve the problem", "Check your answer with the textbook", "Repeat for every problem."]); 

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
            history.push("/taskEnd"); 
        }
    }
    return (
        <IonPage>
            <IonContent fullscreen>
                <IonTitle id="Title"> Task Procedure </IonTitle> 
                <IonText >
                    <p className="Description">
                        Next, visualize the specific steps that you take during the task. Then write it down below! 
                    </p>
                </IonText>
                <br />
                <IonList id="list">
                    {list.map((item, index) => {
                        return (
                            <IonItem key={index}>
                                <IonLabel>{item}</IonLabel>
                                <IonInput id="TaskName" type='text' placeholder={placeholder[index]} onIonChange={(e) => handleResponses(e.detail.value, index)} />
                            </IonItem>
                        )
                    }
                    )}
                </IonList>
                <IonItem onClick={AddHandler} class="prompt" id="AddButton">
                    <IonLabel id="AddText">Add Step</IonLabel>
                </IonItem>
                <IonButton id="Continue" onClick={handleClick} color={color}>Continue</IonButton>
            </IonContent>
        </IonPage>
    )
}

export default TaskProcedure;