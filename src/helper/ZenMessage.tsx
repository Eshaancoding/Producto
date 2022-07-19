// Will return a page that just displays a single message in the center of the screen
import {IonButton, IonText, IonPage, IonContent, useIonViewWillEnter} from "@ionic/react"
import { useState } from "react";
import CountBar from "./CounterBar";
import { useHistory } from "react-router";
import CloseButton from "./CloseButton";
import "./ZenMessage.css"

function ZenMessage (props:any) {
    const [color, setColor] = useState("secondary")
    const history = useHistory()

    useIonViewWillEnter(() => {setColor("secondary")})

    function handleEnd () {
        setColor("primary")
    }

    function ContinueClick () {
        if (color === "primary") history.replace(props.href)
    }

    return (
        <IonPage>
            <IonContent id="Content">
                <CloseButton small />
                <CountBar minutes={props.minutes} seconds={props.seconds} finish={handleEnd}/> 
                <IonText> <p id="Title"> {props.title} </p> </IonText>
                <IonText> <p id="Header"> {props.header} </p> </IonText> 
                <IonText> <p id="Description"> {props.description} </p> </IonText>
                <IonButton id="Continue" color={color} onClick={ContinueClick}>Continue</IonButton>
                {!props.removeAndrew && <p id="Credits">Huge Thanks to Andrew Huberman and <a href="https://hubermanlab.com">The Huberman Lab Podcast</a> for all the tips! Most of the ideas in this app are from Andrew Huberman and his team. </p> }
                <div id="footer" />
            </IonContent>
        </IonPage>
    )
}

export default ZenMessage;