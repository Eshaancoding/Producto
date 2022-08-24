import { IonText, IonPage, IonContent, useIonViewWillEnter, IonButton} from '@ionic/react';
import { List } from '../Sessions/WorkSession';
import { useState } from 'react';
import { Storage } from '@ionic/storage';
import { useHistory } from 'react-router';
import Delay from '../../helper/Delay';
import { getDate } from '../../helper/DateHelper';
import { isPlatform } from '@ionic/react';
import Input from '../../helper/Input';

const Failure: React.FC = () => {
    const store = new Storage()
    store.create()
    const [habitId, setHabitId] = useState(0)
    const [habits, setHabits] = useState([])
    const [responses, setResponses] = useState(["", "", ""])
    const [color, setColor] = useState("secondary")
    const [initialTime, setInitialTime] = useState(null as any)
    const [isTip, setIsTip] = useState(false)
    const history = useHistory() 

    useIonViewWillEnter(async () => {
        const isTip = await store.get("IsTips")
        setIsTip(isTip)
        const habitId = await store.get("habitId")
        setHabitId(habitId)
        const habits = await store.get("habits")
        setHabits(habits)
        setInitialTime(getDate())
        
        if (!isTip && !("failureResp" in habits[habitId])) {
            var copyHabits:any = [...habits]
            copyHabits[habitId]["failureResp"] = ["", "", ""]
            setHabits(copyHabits)
            await store.set("habits", copyHabits)
        }
    })

    async function setResponse (str:any, index:number) {
        var copy:any = [...responses] 
        copy[index] = str
        if (copy.every((value:any) => value !== "")) {
            setColor("primary")
        } else {
            setColor("secondary")
        }
        setResponses(copy)

        if (!isTip) {
            var copyHabit:any = [...habits]
            copyHabit[habitId]["failureResp"][index] = str
            setHabits(copyHabit)
            await store.set("habits", copyHabit)
        }
    }

    function handleContinue () {
        if (color === "primary") {
            if (isTip) history.replace("/Home")
            else history.replace("/NextHabit")
        }
    }

    function getVal (habits:any, index:any) {
        if (!isTip && habits.length !== 0 && "failureResp" in habits[habitId]) {
            return habits[habitId]["failureResp"][index]
        }
        else {
            return undefined
        }
    }

    return (
        <IonPage>
            <IonContent>
                <IonText>
                    <p id='Title' className={isPlatform("ios") ? "ios" : undefined}>Failure</p>
                </IonText>
                <List items={[
                    "Think about your most recent and your most heart-wrenching failures. Break out that journal one last time. Log off the digital version and write them out longhand. I want you to feel this process because you are about to file your own, belated After Action Reports.", 
                    "First off, write out all the good things, everything that went well, from your failures. Be detailed and generous with yourself. A lot of good things will have happened. It’s rarely all bad.",
                ]} />
                <Input 
                    minutes={0} 
                    seconds={20}
                    initialTime={initialTime}
                    title="Write all the good things that happened from your failures. Be detailed and generous with yourself!" 
                    onIonChange={(e:any) => setResponse(e.detail.value as string, 0)}
                    value={getVal(habits, 0)}
                />
                <Delay minutes={0} seconds={40} initialTime={initialTime}>
                    <List items={[
                        "Then note how you handled your failure. Did it affect your life and your relationships? How so? How did you think throughout the preparation for and during the execution stage of your failure? You have to know how you were thinking at each step because it’s all about mindset, and that’s where most people fall short."
                    ]} />
                </Delay>
                <Input 
                    minutes={1}
                    seconds={0}
                    initialTime={initialTime}
                    title="How did you handle your failure? What did you think throughout the preperation for and during the execution stage of all your failure?"
                    onIonChange={(e:any) => setResponse(e.detail.value as string, 1)}
                    value={getVal(habits, 1)}
                />
                <Delay minutes={1} seconds={20} initialTime={initialTime}>
                    <List items={[
                        "Now go back through and make a list of things you can fix. This isn’t time to be soft or generous. Be brutally honest, write them all out. Study them. Then look at your calendar and schedule another attempt as soon as possible. If the failure happened in childhood, and you can’t recreate the Little League all-star game you choked in, I still want you to write that report because you’ll likely be able to use that information to achieve any goal going forward.",
                        "As you prepare, keep that AAR handy, consult your Accountability Mirror, and make all necessary adjustments. When it comes time to execute, keep everything we’ve learned about the power of a calloused mind, the Cookie Jar, and The 40% Rule in the forefront of your mind.",
                        "Control your mindset. Dominate your thought process. This life is all a fucking mind game. Realize that. Own it! And if you fail again, so the fuck be it. Take the pain. Repeat these steps and keep fighting. That’s what it’s all about."
                    ]} />
                </Delay>
                <Input 
                    minutes={1} 
                    seconds={40}
                    initialTime={initialTime}
                    title="Then make a list of things that you can fix. Be brutally honest with yourself!"
                    onIonChange={(e:any) => setResponse(e.detail.value as string, 2)}
                    value={getVal(habits, 2)}
                />
                <br />
                <Delay minutes={2} seconds={0} initialTime={initialTime}>
                    <IonButton color={color} onClick={handleContinue} id="Continue">
                        Continue
                    </IonButton>
                </Delay>

                <div id="footer" />
            </IonContent>
        </IonPage>
    )
}

export default Failure;