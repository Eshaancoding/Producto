import { IonText, IonPage, IonContent, IonButton, useIonViewWillEnter, isPlatform} from '@ionic/react';
import { List } from '../Sessions/WorkSession';
import { useState } from 'react';
import { Storage } from '@ionic/storage';
import { useHistory } from 'react-router';
import Delay from '../../helper/Delay';
import { getDate } from '../../helper/DateHelper';
import Input from '../../helper/Input';

const AccountabilityMirror: React.FC = () => {
    const store = new Storage()
    store.create()
    const [responses, setResponses] = useState([""])
    const [color, setColor] = useState("secondary")
    const [initialTime, setInitialTime] = useState(null as any)
    const history = useHistory() 

    useIonViewWillEnter(async () => {
        setInitialTime(getDate())
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
    }

    async function handleContinue () {
        if (color === "primary") {
            const isTips = await store.get("IsTips")
            if (isTips) history.replace("/Failure")
            else history.replace("/WorkSession")
        }
    }

    return (
        <IonPage>
            <IonContent>
                <IonText>
                    <p id='Title' className={isPlatform("ios") ? "ios" : undefined}>Tacked Post-It notes on the Accountability Mirror</p>
                </IonText>
                <List items={[
                    "It’s time to come eyeball to eyeball with yourself, and get raw and real. This is not a self-love tactic. You can’t fluff it. Don’t massage your ego. This is about abolishing the ego and taking the first step toward becoming the real you!",
                    "It’s okay to be unkind with yourself in these moments because we need thicker skin to improve in life. Whether it’s a career goal (quit my job, start a business), a lifestyle goal (lose weight, get more active), or an athletic one (run my first 5K, 10K, or marathon), you need to be truthful with yourself about where you are and the necessary steps it will take to achieve those goals, day by day. Each step, each necessary point of self-improvement, should be written as its own note.",
                    "I tacked Post-It notes on my Accountability Mirror, and I’ll ask you to do the same. Digital devices won’t work. Write all your insecurities, dreams, and goals on Post-Its and tag up your mirror. If you need more education, remind yourself that you need to start working your ass off because you aren’t smart enough! Period, point blank. If you look in the mirror and see someone who is obviously overweight, that means you’re fucking fat! Own it!",
                ]} />
                <Input 
                    minutes={0}
                    seconds={30}
                    initialTime={initialTime}
                    title="Look in front of the mirror, and be honest with yourself. What do you have to improve upon? What are you doing bad at? Shout it! Shout that you need to improve this, by yourself!"
                    onIonChange={(e:any) => setResponse(e.detail.value as string, 0)}
                />
                <Delay minutes={1} seconds={0} initialTime={initialTime}>
                    <List items={[
                        "That means you have to do some research and break it all down. For example, if you are trying to lose forty pounds, your first Post-It may be to lose two pounds in the first week. Once that goal is achieved, remove the note and post the next goal of two to five pounds until your ultimate goal is realized.",
                        "Whatever your goal, you’ll need to hold yourself accountable for the small steps it will take to get there. Self-improvement takes dedication and self-discipline. The dirty mirror you see every day is going to reveal the truth. Stop ignoring it. Use it to your advantage."
                    ]} />
                    <Input 
                        noDelay
                        title="Create the accountability mirror by writing your insecurities, dreams, and goals on post-its and tagging it up on your mirror. When writing the post-its notes, be honest and real!" 
                    />
                </Delay>
                <Delay minutes={1} seconds={20} initialTime={initialTime}>
                    <IonButton color={color} onClick={handleContinue} id="Continue">
                        Continue
                    </IonButton>
                </Delay>
                <div id="footer" />
            </IonContent>
        </IonPage>
    )
}

export default AccountabilityMirror;