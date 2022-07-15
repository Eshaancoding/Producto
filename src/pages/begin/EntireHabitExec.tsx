import {IonButton, IonText, IonPage, IonContent, IonCard, IonInput, IonLabel, IonItem} from "@ionic/react"
import { useState } from "react";
import { useHistory } from "react-router";
import { Storage } from "@ionic/storage";
import CloseButton from "../../helper/CloseButton";
import "./EntireHabitExec.css"

function EntireHabitExec () {
    const [responses, setResponses] = useState(["", "", "", "", "", "", "", "", "", ""])    
    const [placeholders, setPlaceholders] = useState([
        "Get out of the bed",
        "Go to the desk",
        "Open up Producto App and Physics Textbook",
        "Open to page left off from yesterday",
        "Read the page",
        "Make flashcards about the page",
        "Repeat for 20 pages",
        "I will feel accomplished that I studied today",
        "Relax on my bed", 
        "Open up Producto App to decide what I am going to do next."
    ])
    const [color, setColor] = useState("secondary")
    const history = useHistory()
    const store = new Storage() 
    store.create();
    
    async function ContinueClick () {
        if (color == "primary") {
            await store.set("steps", responses)
            history.replace("/work")
        }
    }

    function setResp (value:any, index:number) {
        var resp:any = responses;
        resp[index] = value 
        setResponses(resp)

        if (responses.every(v => v !== "")) {
            setColor("primary")
        } else {
            setColor("secondary")
        }
    }

    function addResp () {
        setResponses([...responses, ""])
        setPlaceholders([...placeholders, ""])
        setColor("secondary");
    }

    return (
        <IonPage>
            <IonContent id="Content">
                <CloseButton small />
                <IonText> <p id="CustomTitle"> Write down what will happen 10-15 minutes before the habit, write what will happen during the habit, write what you will feel/happen 10-15 minutes after the habit. </p> </IonText>
                <IonText> <p id="Header"> Then, label this whole process as your ENTIRE habit. The key is that you are not only learning how to do the habit, but you are also learning <strong>how to get started</strong> and how you will feel <strong>after</strong> the habit. It would also be beneficial to include a step to <strong>transition</strong> from one habit to another </p> </IonText> 

                {responses.map((value, index) => {
                    return (
                        <IonCard key={index}>
                            <IonItem>
                                <IonLabel>Step {index+1}:</IonLabel>
                                <IonInput type="text" placeholder={placeholders[index]} onIonChange={(e) => {setResp(e.target.value, index)}} />
                            </IonItem>
                        </IonCard>
                    )
                })} 
                <IonCard button={true} onClick={addResp}> 
                    <IonItem>
                        <IonLabel id="StepLabel">Add Step</IonLabel>
                    </IonItem>
                </IonCard>

                <IonButton id="Continue" color={color} onClick={ContinueClick}>Continue</IonButton>

                <p id="Credits">Huge Thanks to Andrew Huberman and <a href="https://hubermanlab.com">The Huberman Lab Podcast</a> for all the tips! Most of the ideas in this app is from Andrew Huberman and his team. </p>
            </IonContent>
        </IonPage>
    )   
}

export default EntireHabitExec