import { IonPage, IonContent, useIonViewWillEnter, IonButton, IonCard, IonCardTitle, IonItem, IonLabel, IonInput, IonTitle} from "@ionic/react";
import { Storage } from "@ionic/storage";
import { useState } from "react";
import { useHistory } from "react-router";
import { getDate } from "../../helper/DateHelper";

function HabitReflection (props:any) {
    const [habitsFiltered, setHabitsFiltered] = useState([])
    const [responses, setResponses] = useState([])
    const [color, setColor] = useState("secondary")
    const history = useHistory()
    const store = new Storage()
    store.create()
    
    useIonViewWillEnter(async () => {
        const habitsFil = await store.get("habitsNeedReflection")
        if (habitsFil.length === 0) history.replace("/home")
        setHabitsFiltered(habitsFil)
        var arr:any = []
        for (var i = 0; i < habitsFil.length; i++) {
            arr.push([habitsFil[i]["HabitOften"], habitsFil[i]["SessionsProductive"]])
        }
        setResponses(arr)
    })

    function handleChange (value:any, habitIndex:number, questionIndex:number) {
        var copyResponse:any = responses
        copyResponse[habitIndex][questionIndex] = value
        setResponses(copyResponse) 
        if (copyResponse.every((value:any) => value !== "")) {
            setColor("primary")
        } else {
            setColor("secondary")
        }
    }

    async function handleSubmit () {
        if (color === "primary") {
            const origHabits:any = await store.get("habits")
            console.log(habitsFiltered)
            console.log(origHabits)
            for (var i = 0; i < habitsFiltered.length; i++) {
                origHabits[habitsFiltered[i]["habitId"]]["HabitOften"] = responses[i][0]
                origHabits[habitsFiltered[i]["habitId"]]["SessionsProductive"] = responses[i][1]
                origHabits[habitsFiltered[i]["habitId"]]["lastRefl"] = getDate()
            } 
            await store.set("habitsNeedReflection", [])
            await store.set("habits", origHabits)
            history.replace("/home")
        }
    }

    function placeholderFill (habitIndex:number, questionIndex:number):string {
        try {
            const resp:string = responses[habitIndex][questionIndex] 
            if (resp === "") return "Enter Answer Here"
            else return "Last Reflection Answer: " + resp
        }
        catch (ex) {
            return "Enter Answer Here"
        }

    }

    return (
        <IonPage>
            <IonContent>
                <IonTitle id="Title">Habit Reflection</IonTitle>
                {habitsFiltered.map((value, index) => {
                    return (
                        <IonCard class="card" key={index}>
                            <IonCardTitle>{value["isBadHabit"] ? <>Bad Habit</> : <>Habit</>}: {value["title"]}</IonCardTitle>
                            <br />
                            <IonLabel><span className="highlight">
                                {value["isBadHabit"] ? <>How often do you avoid the habit?</> : <>How often do you do the habit?</>}
                            </span></IonLabel>
                            <IonInput type="text" placeholder={placeholderFill(index, 0)} onIonChange={(e) => handleChange(e.detail.value, index, 0)}/>
                            <IonLabel><span className="highlight">
                                {value["isBadHabit"] ? <>Do you think that you did a good job avoiding the bad habit using the advice on how to break habits?</> : <>Were you productive during those sessions?</>} 
                            </span></IonLabel>
                            <IonInput type="text" placeholder={placeholderFill(index, 1)} onIonChange={(e) => handleChange(e.detail.value, index, 1)}/>
                        </IonCard>
                    )
                })}
                <IonButton id="Continue" onClick={handleSubmit} color={color}>Submit</IonButton> 
            </IonContent>
        </IonPage>
    )
}

export default HabitReflection;