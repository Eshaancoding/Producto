import { IonCard, IonInput, IonText, IonContent, IonPage, IonCardTitle, IonLabel, IonFab, IonFabButton, IonIcon, IonButton, useIonViewWillEnter} from '@ionic/react';
import { addOutline, closeOutline} from 'ionicons/icons';
import { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { Storage } from '@ionic/storage';

export function VisualizeGoal (props:any) {
    const [arr, setArr] = useState([] as any)
    const cardTitle = useRef<HTMLIonInputElement>(null);
    const cardSucceeding = useRef<HTMLIonInputElement>(null);
    const cardFailing = useRef<HTMLIonInputElement>(null);
    const history = useHistory()
    const store = new Storage()
    store.create()

    useIonViewWillEnter(async () => {
        const value = await store.get("VisualizeGoalData")
        if (value === undefined || value == null) {
            await store.set("VisualizeGoalData", [] as any) 
        }
        else {
            setArr(value)
        }
    })

    function handleClose () {
        history.replace("/Distractions")
    }

    async function addTask () {
        if (cardTitle.current?.value !== "" && cardSucceeding.current?.value !== "" && cardFailing.current?.value !== "") {
            var copy = [...arr]
            copy.push([cardTitle.current?.value, cardSucceeding.current?.value, cardFailing.current?.value])
            setArr(copy)
            await store.set("VisualizeGoalData", copy)
        }
    }

    async function deleteTask (index:any) {
        var copy = [...arr]
        copy.splice(index, 1)
        setArr(copy)
        await store.set("VisualizeGoalData", copy)
    }

    return (
        <IonPage>
            <IonContent>
                <IonText><p id="Title">Visualize the Goal and Failing</p></IonText>
                <IonText><p id="Header">Visualize what would happen if you succeeded your task, and visualize what would happen if you didn't do the task for long periods of time!</p></IonText>

                {arr.map((object:any, index:any) => {
                    return (
                        <IonCard key={index} className="card">
                            <IonFab id="Fab">
                                <IonFabButton size="small" id="Button" onClick={() => {deleteTask(index)}}>
                                    <IonIcon icon={closeOutline}></IonIcon>
                                </IonFabButton>
                            </IonFab>
                            <IonCardTitle>{object[0]}</IonCardTitle>
                            <IonText><p id="Description">What would succeeding look like? <span className="highlight">{object[1]}</span></p></IonText> 
                            <IonText><p id="Description">What would failing look like? <span className="highlight">{object[2]}</span></p></IonText> 
                        </IonCard>
                    )
                })}

                <IonCard className="card" style={{backgroundColor: "#333333"}}>
                    <IonFab id="Fab">
                        <IonFabButton size="small" id="Button" onClick={addTask}>
                            <IonIcon icon={addOutline}></IonIcon>
                        </IonFabButton>
                    </IonFab>

                    <IonLabel className="highlight">Add a task:</IonLabel>
                    <IonInput ref={cardTitle} placeholder='Enter here' />
                    <IonLabel className="highlight">What would succeeding task look like? (Visualize!):</IonLabel>
                    <IonInput ref={cardSucceeding} placeholder='Enter here' />
                    <IonLabel className="highlight">What would failing this task look like? (Visualize!)</IonLabel>
                    <IonInput ref={cardFailing} placeholder='Enter here' />
                </IonCard>

                <IonButton className="SessionButton" onClick={handleClose}>Continue</IonButton>
                <div id="footer" />
            </IonContent> 
        </IonPage>
    )
}