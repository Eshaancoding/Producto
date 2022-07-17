import { IonPage, IonContent, IonHeader, IonButton, IonItem, IonLabel, IonInput, useIonViewWillEnter, IonToggle, IonToolbar, IonButtons, IonText, IonTitle, IonCard, IonCardTitle} from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { Storage } from "@ionic/storage";
import { useHistory } from "react-router";
import "./EditingHabit.css"
import { getDate, sortTimeFunction } from "../../../helper/DateHelper";

function EditingHabitModal (props:any) {
    const history = useHistory()

    const newTitleRef = useRef<HTMLIonInputElement>(null);
    const newDescriptionRef = useRef<HTMLIonInputElement>(null);
    const badHabitRef = useRef<HTMLIonToggleElement>(null);
    const startTimeRef = useRef<HTMLIonInputElement>(null);
    const endTimeRef = useRef<HTMLIonInputElement>(null);
    const reflectionInterval = useRef<HTMLIonInputElement>(null);

    const [originalTitle, setOriginalTitle]= useState("Enter Title here")
    const [originalDescription, setOriginalDescription] = useState("Enter Description Here")
    const [originalBadHabit, setOriginalBadHabit] = useState(false)
    const [originalEndTime, setOriginalEndTime] = useState()
    const [originalStartTime, setOriginalStartTime] = useState()
    const [originalIntervalRefl, setOriginalIntervalRefl] = useState(1)

    const [habits, setHabits] = useState([])
    const store = new Storage()
    const [habitId, setHabitId] = useState(0)

    store.create();
    useIonViewWillEnter(() => {
        if (props.create === false) {
            store.get("habitIdEdit").then((habitIdValue) => { 
                setHabitId(habitIdValue) 
                store.get("habits").then((habitValue) => {
                    setHabits(habitValue)
                    setOriginalTitle(habitValue[habitIdValue]["title"])
                    setOriginalDescription(habitValue[habitIdValue]["description"])
                    setOriginalBadHabit(habitValue[habitIdValue]["isBadHabit"])
                    setOriginalStartTime(habitValue[habitIdValue]["startTime"])
                    setOriginalEndTime(habitValue[habitIdValue]["endTime"])
                    setOriginalIntervalRefl(habitValue[habitIdValue]["intervalRefl"])
                })
            })
        }
        
    }) 

    async function confirm () {
        // set event
        const badHabit:any = badHabitRef.current?.checked
        const newDescription:any = newDescriptionRef.current?.value
        const newTitle:any = newTitleRef.current?.value
        const startTime:any = startTimeRef.current?.value
        const endTime:any = endTimeRef.current?.value
        const intervalRefl:any = reflectionInterval.current?.value
        // arrays
        var array:any = await store.get("habits")
        var habit:any = []
        if (props.create === false) habit = array[habitId];
        else habit = {}

        // set habit/description
        habit["title"] = newTitle;
        habit["description"] = newDescription;
        
        // set start time and end time
        habit["startTime"] = startTime
        habit["endTime"] = endTime

        // set reflection variables
        habit["intervalRefl"] = parseInt(intervalRefl)
        if (props.create === true) {
            habit["lastRefl"] = getDate()
            habit["HabitOften"] = ""
            habit["SessionsProductive"] = ""
        }

        // changed to bad habit
        if ((habit["isBadHabit"] === false && badHabit === true) || (habit["isBadHabit"] === true && badHabit === false) || props.create === true) {
            habit["monday"] = 0
            habit["tuesday"] = 0
            habit["wednesday"] = 0
            habit["thursday"] = 0
            habit["friday"] = 0
            habit["saturday"] = 0
            habit["sunday"] = 0
            habit["hoursSpent"] = 0
            habit["sessions"] = 0
            habit["isBadHabit"] = badHabit
        }
        // transform array
        if (props.create === false) array[habitId] = habit
        else array.push(habit)
        // sort habit array 
        array = array.sort(sortTimeFunction)
        // set 
        setHabits(array)
        store.set("habits", array)
        history.replace("/home")
    }    

    async function deleteHabit () {
        var array = habits
        array.splice(habitId, 1)
        await store.set("habits", array)
        setHabits(array)
        history.replace("/home")
    }
    
    function CondDeleteButton (props:any) {
        if (props.create === false) {
            return (
                <IonButton id="Delete" onClick={deleteHabit}>Delete Habit</IonButton>
            )
        } else {
            return (<></>)
        }
    }

    function Time (props:any) {
        return (
            <>
                <IonCard className="card">
                    <IonCardTitle>Enter your start time:</IonCardTitle> 
                    <IonInput ref={startTimeRef} value={originalStartTime} type="time" />
                </IonCard>
                <IonCard className="card">
                    <IonCardTitle>Enter your end time:</IonCardTitle> 
                    <IonInput ref={endTimeRef} value={originalEndTime} type="time" />
                </IonCard> 
            </>
        )
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={() => history.replace("/home")}>Cancel</IonButton>
                    </IonButtons>
                    <IonButtons slot="end">
                        <IonButton strong={true} onClick={() => confirm()}>
                            Confirm
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>


            <IonContent className="ion-padding">
                <IonTitle id="Title">3 Phases of the Day</IonTitle>
                <IonText>
                    <p id="Description">
                        You can leverage your brain's hormone levels to easily make good habits that are difficult, easier! There are 3 phases of the day where you can place the most optimal habits. <br /> <br />
                        <span style={{fontWeight: "1000"}}>Phase 1:</span> This lasts 0-8 hours after waking up. This is the best time to put your most <span style={{fontWeight: "1000"}}>difficult habits</span> in here.  <br /> <br /> 
                        <span style={{fontWeight: "1000"}}>Phase 2:</span> This lasts 9-15 hours after waking up. This is the best time to put your habits that doesn't require as much limbic friction (e.i not much effort/motivation to get started on the habit). It is also helpful to wind down during this time of the day. Exposing yourself to less light or relaxing will be beneficial <br /> <br /> 
                        <span style={{fontWeight: "1000"}}>Phase 3:</span> This lasts 16-24 hours after waking up. This is basically where you go to sleep, and it is absolutely <span style={{fontWeight: "1000"}}>crucial</span> that you get good amounts of sleep! The reason for this is because all the neuroplasticity, which is important for solidifying habits on your brain, happens when you enter deep sleep.<br /> <br /> <br /> 
                        <span style={{fontWeight: "1000"}}>Note</span> that after you have built your habit reflexively, you should be able to move it around the day with ease! This is just for building your habits. This is not meant to be a permanent placement system of all of your habits. A habit that was once very hard (thus put in Phase 1) but then becomes reflexive over time should be placed in Phase 2!
                    </p>
                </IonText>
                <IonCard className="card">
                    <IonCardTitle>Enter new title:</IonCardTitle>
                    <IonInput ref={newTitleRef} type="text" value={originalTitle}></IonInput>
                </IonCard>
                <IonCard className="card">
                    <IonCardTitle>Enter new description:</IonCardTitle>
                    <IonInput ref={newDescriptionRef} type="text" value={originalDescription}></IonInput>
                </IonCard>
                <IonCard className="card">
                    <IonCardTitle>Is it a bad habit:</IonCardTitle> 
                    <IonToggle id="Toggle" ref={badHabitRef} checked={originalBadHabit}></IonToggle>
                </IonCard>
                <IonCard className="card">
                    <IonCardTitle>The number of days between each habit reflection:</IonCardTitle> 
                    <IonInput ref={reflectionInterval} type="number" value={originalIntervalRefl}></IonInput>
                </IonCard>
                <Time /> 
                <CondDeleteButton create={props.create}/>
                <br />
            </IonContent>
        </IonPage>
    )
}

export default EditingHabitModal;