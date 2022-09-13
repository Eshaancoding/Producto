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
                <IonText> <p id="Title">Be Brutally Honest</p></IonText>
                <IonText> <p className="Description">In this step, you have to be brutally honest. Yes, it is going to hurt when you admit it. It hurts when you have to admit that you lost interest in an activity that you used to love. It hurts when you frustrated. However it will not be useful to let those feelings boil inside of you. You can't trick yourself forever. <br /> <br />Tips from David Goggin's book "Can't Hurt Me"</p></IonText>
                <br />
                {habitsFiltered.map((value, index) => {
                    return (
                        <IonCard class="card" key={index}>
                            <IonCardTitle>{value["isBadHabit"] ? <>Bad Habit</> : <>Habit</>}: {value["title"]}</IonCardTitle>
                            <br />
                            <IonLabel><span className="highlight">
                                Be brutally honest with yourself. Are you frustrated? Have you lost interest? Are you starting to enjoy the activity? Are you doing a good job maintaining the habit?.
                            </span></IonLabel>
                            <IonInput type="text" placeholder={placeholderFill(index, 0)} onIonChange={(e) => handleChange(e.detail.value, index, 0)}/>

                            <IonLabel><span className="highlight">Shout your concerns in front of the mirror, loud. This is important so you remember your mistakes and feelings. What did you say?
                            </span></IonLabel>
                            <IonInput type="text" placeholder={placeholderFill(index, 1)} onIonChange={(e) => handleChange(e.detail.value, index, 1)}/>

                            <IonLabel><span className="highlight">
                                What can you do to fix or improve your behavior? Remember to push yourself everday! 
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