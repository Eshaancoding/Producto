// Will return a page that just displays a single message in the center of the screen
import {IonText, IonPage, IonContent} from "@ionic/react"
import CloseButton from "./CloseButton";
import "./ZenMessage.css"

function ZenMessageNoProg (props:any) {
    return (
        <IonPage>
            <IonContent id="Content">
                <CloseButton small />
                <IonText> <p id="Title"> {props.title} </p> </IonText>
                <IonText> <p id="Header"> {props.header} </p> </IonText> 
                <IonText> <p id="Description"> {props.description} </p> </IonText>
                <p id="Credits">Huge Thanks to Andrew Huberman and <a href="https://hubermanlab.com">The Huberman Lab Podcast</a>, which has given free, and accessible tips to a variety of platforms (ex: Spotify, Apple Podcasts, Youtube) to improve daily life. Most of the tips are actually from the episode, "Controlling Your Dopamine For Motivation, Focus & Satisfaction" and "The Science of Making & Breaking Habits" :D </p>
                <div id="footer" />
            </IonContent>
        </IonPage>
    )
}

export default ZenMessageNoProg;