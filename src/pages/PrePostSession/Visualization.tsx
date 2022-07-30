import { IonText, IonButton, IonContent, IonPage, IonCard, IonCardTitle, IonLabel, IonInput} from "@ionic/react"; 
import { useState } from "react";
import CountBar from "../../helper/CounterBar";
import { useHistory } from "react-router";

function Visualization (props:any) {
    const [color, setColor] = useState("secondary") 
    const history = useHistory()
    const [response, setResponses] = useState(["", ""])

    function handleChange (str:any, index:number) {
        var copy = [...response] 
        copy[index] = (str as string)
        setResponses(copy)
        if (copy.every((value:any) => value !== "")) {
            setColor("primary")
        } else {
            setColor("secondary")
        }
    }

    function handleContinue () {
        if (color === "primary") {
            if (!props.isBreak) history.replace("/SpaceTimeBridging")
            else history.replace("/work")
        }
    }
    
    return (
        <IonPage> 
            <IonContent>
                <IonText><p id="Title">Visualization</p></IonText>    
                <IonText>
                    <p id="Description">
                        First choose the end goal. What do you want to feel at the end? Visualizing achieving this end goal, or the moment that you will feel right after you have successfully completed the habit. Will you feel happy? Will you feel glad that you are finally taking steps to improve yourself? Also start visualizing if you continue to do the habit in the <strong>long run</strong>. In other words, start <strong>painting</strong> your picture on what your <strong>success</strong> looks like. <br /> <br />
                        But don't only visualize your success, but also <strong>visualize your failures.</strong> Visualize the challenges that are likely to arise and deciding <strong>what you are going to do</strong> when you encounter them. This also means answering the simple questions:
                    </p>
                </IonText>
                <IonCard class="card">
                    <IonLabel><span className="highlight">
                        Why are you doing this?
                    </span></IonLabel>
                    <IonInput type="text" placeholder="Enter response here." onIonChange={(e) => handleChange(e.detail.value, 0)}/>

                    <IonLabel><span className="highlight">
                        What is driving you toward your achievements?
                    </span></IonLabel>
                    <IonInput type="text" placeholder="Enter response here." onIonChange={(e) => handleChange(e.detail.value, 1)}/>
                </IonCard>
                <IonButton id="Continue" color={color} onClick={handleContinue}>Continue</IonButton>
            </IonContent>
        </IonPage>
    )
} 

export default Visualization; 