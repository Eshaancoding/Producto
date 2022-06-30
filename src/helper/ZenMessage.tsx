// Will return a page that just displays a single message in the center of the screen
import {IonText, IonPage, IonContent} from "@ionic/react"
import CountBar from "./CounterBar";
import { useHistory } from 'react-router';
import "./ZenMessage.css"

function ZenMessage (props:any) {
    // Variables
    const history = useHistory()
    
    // When the progress bar reaches the end
    function handleEnd () {
        history.replace(props.href)
    }

    return (
        <IonPage> 
            <IonContent id="Content"> 
                <CountBar minutes={props.minutes} seconds={props.seconds} finish={handleEnd}/> 
                <IonText> <p id="Title"> {props.title} </p> </IonText>
                <IonText> <p id="Header"> {props.header} </p> </IonText> 
                <IonText> <p id="Description"> {props.description} </p> </IonText>
            </IonContent>
        </IonPage>
    ) 
}

export default ZenMessage;