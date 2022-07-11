import {IonButton, IonText, IonPage, IonContent, IonCard, IonInput, IonLabel, IonItem} from "@ionic/react"
import { useState } from "react";
import { useHistory } from "react-router";
import CloseButton from "../../helper/CloseButton";
import "./BeforeHabitExec.css"

const AfterHabitExec: React.FC = () => {
    const [responses, setResponses] = useState(["", "", "", "", ""])
    const [placeholders, setPlaceholders] = useState(["", "", "", "", ""])
    const [color, setColor] = useState("secondary")
    const history = useHistory()
    
    function ContinueClick () {
        if (color == "primary") history.replace("/SummingUp")
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
                <IonText> <p id="CustomTitle"> Write down about what is the sequence of steps and/or feelings after the execution of the habit</p> </IonText>

                {responses.map((value, index) => {
                    return (
                        <IonCard key={index}>
                            <IonItem>
                                <IonLabel>Step/Emotion {index+1}:</IonLabel>
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

                <p id="Credits">Huge Thanks to Andrew Huberman and <a href="https://hubermanlab.com">The Huberman Lab Podcast</a> for all the tips! Most of the ideas are this app is from Andrew Huberman and his team. </p>
            </IonContent>
        </IonPage>
    )
}

export default AfterHabitExec; 