import { IonPage, IonContent, IonHeader, IonButton, IonItem, IonLabel, IonInput, useIonViewWillEnter, IonToggle, IonToolbar, IonButtons} from "@ionic/react";
import { useRef, useState } from "react";
import { Storage } from "@ionic/storage";
import { useHistory } from "react-router";
import "./EditingHabit.css"

const EditingHabitModal: React.FC = () => {
    const history = useHistory()

    const newTitleRef = useRef<HTMLIonInputElement>(null);
    const newDescriptionRef = useRef<HTMLIonInputElement>(null);
    const orderRef = useRef<HTMLIonInputElement>(null);
    const badHabitRef = useRef<HTMLIonToggleElement>(null);

    const [originalTitle, setOriginalTitle]= useState("")
    const [originalDescription, setOriginalDescription] = useState("")
    const [originalBadHabit, setOriginalBadHabit] = useState(false)

    const [habits, setHabits] = useState([])
    const store = new Storage()
    const [habitId, setHabitId] = useState(0)

    store.create();
    useIonViewWillEnter(() => {
        store.get("habitIdEdit").then((habitIdValue) => { 
            setHabitId(habitIdValue) 
            store.get("habits").then((habitValue) => {
                setHabits(habitValue)
                setOriginalTitle(habitValue[habitIdValue]["title"])
                setOriginalDescription(habitValue[habitIdValue]["description"])
                setOriginalBadHabit(habitValue[habitIdValue]["isBadHabit"])
            })
        })
        
    }) 

    async function confirm () {
        // set event
        const data:any = [newTitleRef.current?.value, newDescriptionRef.current?.value, orderRef.current?.value, badHabitRef.current?.checked]
        // arrays
        const array:any = await store.get("habits")
        const habit:any = array[habitId];
        // set habit/description
        habit["title"] = data[0];
        habit["description"] = data[1];
        // changed to bad habit
        if ((habit["isBadHabit"] === false && data[3] === true) || (habit["isBadHabit"] === true && data[3] === false)) {
            habit["monday"] = false
            habit["tuesday"] = false
            habit["wednesday"] = false
            habit["thursday"] = false
            habit["friday"] = false
            habit["saturday"] = false
            habit["sunday"] = false
            
            habit["hoursSpent"] = 0
            habit["sessions"] = 0
            habit["streaks"] = 0
            habit["isBadHabit"] = data[3]
        }
        // order ref
        if (data[2] >= 1 && data[2] <= habits.length && data[2]-1 !== habitId) {
            var replace = array.splice(habitId, 1)[0]
            array.splice(data[2]-1, 0, replace)
        }
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
                <IonItem>
                    <IonLabel position="stacked">Enter new title</IonLabel>
                    <IonInput ref={newTitleRef} type="text" value={originalTitle}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Enter new description</IonLabel>
                    <IonInput ref={newDescriptionRef} type="text" value={originalDescription}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel>Change order:</IonLabel>
                    <IonInput ref={orderRef} type="number" min={1} max={habits.length} value={habitId+1}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel>Is bad habit</IonLabel> 
                    <IonToggle ref={badHabitRef} checked={originalBadHabit}></IonToggle>
                </IonItem>
                <IonButton id="Delete" onClick={deleteHabit}>Delete Habit</IonButton>
                <br />
            </IonContent>
        </IonPage>
    )
}

export default EditingHabitModal;