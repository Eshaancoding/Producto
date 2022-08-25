import { IonPage, IonContent, useIonViewWillEnter, IonButton, IonCard, IonCardTitle, IonLabel, IonInput, IonText} from "@ionic/react";
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
        if (habitsFil.length === 0) history.replace("/Home")
        setHabitsFiltered(habitsFil)
        var arr:any = []
        for (var i = 0; i < habitsFil.length; i++) {
            arr.push([habitsFil[i]["HabitOften"], habitsFil[i]["SessionsProductive"], habitsFil[i]["ReflectionFeeling"] ])
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
            for (var i = 0; i < habitsFiltered.length; i++) {
                origHabits[habitsFiltered[i]["habitId"]]["HabitOften"] = responses[i][0]
                origHabits[habitsFiltered[i]["habitId"]]["SessionsProductive"] = responses[i][1]
                origHabits[habitsFiltered[i]["habitId"]]["ReflectionFeeling"] = responses[i][2]
                origHabits[habitsFiltered[i]["habitId"]]["lastRefl"] = getDate()
            } 
            await store.set("habitsNeedReflection", [])
            await store.set("habits", origHabits)
            history.replace("/Home")
        }
    }

    function placeholderFill (habitIndex:number, questionIndex:number):string {
        try {
            if (responses == undefined) return "Enter Answer Here"
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
                <IonText> <p id="Title">Habit Reflection </p></IonText>
                {habitsFiltered.map((value, index) => {
                    return (
                        <IonCard class="card" key={index}>
                            <IonCardTitle>{value["isBadHabit"] ? <>Bad Habit</> : <>Habit</>}: {value["title"]}</IonCardTitle>
                            <br />
                            <IonLabel><span className="highlight">
                                {value["isBadHabit"] ? <>How often do you avoid the habit?</> : <>What steps can you make to push yourself while doing the habit (ex: more pushups, more studytime, etc.)</>}
                            </span></IonLabel>
                            <IonInput type="text" placeholder={placeholderFill(index, 0)} onIonChange={(e) => handleChange(e.detail.value, index, 0)}/>

                            <IonLabel><span className="highlight">
                                {value["isBadHabit"] ? <>Do you think that you did a good job avoiding the bad habit using the advice on how to break habits?</> : <>Were you productive during those sessions?</>} 
                            </span></IonLabel>
                            <IonInput type="text" placeholder={placeholderFill(index, 1)} onIonChange={(e) => handleChange(e.detail.value, index, 1)}/>

                            <IonLabel><span className="highlight">
                                {<>How do you feel about the habit (needs more work, needs less work, unable to do it, too hard, etc.)</>}
                            </span></IonLabel>
                            <IonInput type="text" placeholder={placeholderFill(index, 2)} onIonChange={(e) => handleChange(e.detail.value, index, 2)}/>
                        </IonCard>
                    )
                })}
                <IonButton id="Continue" onClick={handleSubmit} color={color}>Submit</IonButton> 
            </IonContent>
        </IonPage>
    )
}

export default HabitReflection;