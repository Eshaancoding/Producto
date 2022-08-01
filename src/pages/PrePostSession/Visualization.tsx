import { IonText, IonButton, IonContent, IonPage, IonCard, IonCardTitle, IonLabel, IonInput} from "@ionic/react"; 
import { useState } from "react";
import { useHistory } from "react-router";
import CountBar from "../../helper/CounterBar";

function Visualization (props:any) {
    const [color, setColor] = useState("secondary") 
    const history = useHistory()

    function handleContinue () {
        if (color === "primary") {
            if (!props.isBreak) history.replace("/work")
            else history.replace("/CookieJar")
        }
    }
    
    return (
        <IonPage> 
            <IonContent>
                <CountBar minutes={0} seconds={45} finish={() => {setColor("primary")}}/> 
                <IonText><p id="Title">Visualization {props.isBreak && <>& Accountability Mirror</>}</p></IonText>    
                <IonText>
                    <p id="Header">Visualize Success and Failure{props.isBreak && <>, as well as looking at your Accountability Mirror</>}!</p>
                </IonText>
                <IonText>
                    <p id="Description">
                        First choose the end goal. What do you want to feel at the end? Visualizing achieving this end goal, or the moment that you will feel right after you have successfully completed the habit. Will you feel happy? Will you feel glad that you are finally taking steps to improve yourself? Also start visualizing if you continue to do the habit in the <strong>long run</strong>. In other words, start <strong>painting</strong> your picture on what your <strong>success</strong> looks like. <br /> <br />
                        But don't only visualize your success, but also <strong>visualize your failures.</strong> Visualize the challenges that are likely to arise and deciding <strong>what you are going to do</strong> when you encounter them. This also means answering the simple questions like <strong>"Why are you doing this?"</strong> and <strong>"What motivates you?"</strong>. 
                    </p>
                </IonText>
                <br />
                <IonButton id="Continue" color={color} onClick={handleContinue}>Continue</IonButton>
            </IonContent>
        </IonPage>
    )
} 

export default Visualization; 