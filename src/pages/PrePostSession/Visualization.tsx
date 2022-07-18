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
            else history.replace("/work")
        }
    }
    
    return (
        <IonPage> 
            <IonContent>
                <CountBar minutes={1} seconds={0} useStartTime finish={() => {setColor("primary")}}/> 
                <IonTitle id="Title">Visualization</IonTitle>    
                <IonText>
                    <p id="Description">
                        You should visualize <strong>two</strong> things. <br /> <br />
                        <strong>1.</strong> Visualize your <strong>failure</strong>. Imagine the things that will happen if you wouldn't do the habit that you want. For example, visualize the how you are not able to buy the dream car that you want because you haven't had good financial habits such as saving money. <br /> <br />
                        <strong>2.</strong> Visualize the specific sequence of steps to <strong>get started</strong> and <strong>how you feel after doing</strong> the habit. Think about what you need to do! For example, if you were studying for a math test, you would visualize getting a pencil out, getting your textbook from your backpack and then place it on the table. Then you would visualize going to the chapter that the test is on, and visualize sitting down and focusing your eyes on the textbook. Also think about how you feel after you have done the habit! Visualize how accomplished and glad you will be after the habit<br /> <br />
                        Note that the <strong>going into</strong> the habit and what you <strong>feel after</strong> the habit should be considered the <strong>entirity</strong> of the habit itself!
                    </p>
                </IonText>
                <IonButton id="Continue" color={color} onClick={handleContinue}>Continue</IonButton>
            </IonContent>
        </IonPage>
    )
} 

export default Visualization; 