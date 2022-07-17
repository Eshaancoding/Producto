import { IonText, IonButton, IonContent, IonPage, IonTitle } from "@ionic/react"; 
import { useState } from "react";
import CountBar from "../../helper/CounterBar";
import { useHistory } from "react-router";

function Visualization (props:any) {
    const [color, setColor] = useState("secondary") 
    const history = useHistory()

    function handleContinue () {
        if (color === "primary") {
            if (!props.isBreak) history.replace("/SpaceTimeBridging")
            else history.replace("/break")
        }
    }
    
    return (
        <IonPage> 
            <IonContent>
                <CountBar minutes={0} seconds={45} useStartTime finish={() => {setColor("primary")}}/> 
                <IonTitle id="Title">Visualization</IonTitle>    
                <IonText>
                    <p id="Description">
                        You should visualize <strong>two</strong> things. <br /> <br />
                        <strong>1. </strong> Visualize your <strong>failure</strong>. Imagine the things that will happen if you wouldn't do the habit that you want. For example, visualize the how you are not able to buy the dream car that you want because you haven't had good financial habits such as saving money. <br /> <br />
                        <strong>2. </strong> Visualize the specific sequence of steps to <strong>get started</strong> on your habit. Think about what you need to do! For example, if you were studying for a math test, you would visualize getting a pencil out, getting your textbook from your backpack and then place it on the table. Then you would visualize going to the chapter that the test is on, and visualize sitting down and focusing your eyes on the textbook.
                    </p>
                </IonText>
                <IonButton id="Continue" color={color} onClick={handleContinue}>Continue</IonButton>
            </IonContent>
        </IonPage>
    )
} 

export default Visualization; 