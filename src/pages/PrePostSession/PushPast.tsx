import { IonTextarea, IonCard, IonLabel, IonPage, IonTitle, IonContent, useIonViewWillEnter, IonButton} from '@ionic/react';
import { List } from '../Sessions/MotivationSession';
import { useState } from 'react';
import { Storage } from '@ionic/storage';
import { useHistory } from 'react-router';
import Delay from '../../helper/Delay';
import { getDate } from '../../helper/DateHelper';

const PushPast: React.FC = () => {
    const store = new Storage()
    store.create()
    const [habitId, setHabitId] = useState(0)
    const [habits, setHabits] = useState([])
    const [color, setColor] = useState("secondary")
    const [initialTime, setInitialTime] = useState(null)
    const history = useHistory() 
    
    useIonViewWillEnter(async () => {
        const habits = await store.get("habits")
        const habitId = await store.get("habitId")         
        setHabitId(habitId)
        setHabits(habits)
        if (!("pushPastDesc" in habits[habitId])) {
            var copy = [...habits] 
            copy[habitId]["pushPastDesc"] = ""
            await store.set("habits", habits)
        }
        setInitialTime(getDate() as any)
    })    

    async function setResponse (str:any) {
        var copy:any = [...habits] 
        copy[habitId]["pushPastDesc"] = str
        await store.set("habits", habits) 
        if (str !== "") setColor("primary")
        else setColor("secondary")
    }

    function getVal () {
        if (habits.length !== 0 && ("pushPastDesc" in habits[habitId])) {
            return habits[habitId]["pushPastDesc"]
        } else {
            return ""
        }
    }

    function handleContinue () {
        if (color == "primary") {
            history.replace("/Visualization")
        }
    }

    return (
        <IonPage>
            <IonContent>
                <IonTitle>
                    <p id='Title'>Push past your normal stopping point.</p>
                </IonTitle>
                <List items={[
                    "The main objective here is to slowly start to remove the governor from your brain. First, a quick reminder of how this process works. In 1999, when I weighed 297 pounds, my first run was a quarter mile. Fast forward to 2007, I ran 205 miles in thirty-nine hours, nonstop. I didn’t get there overnight, and I don’t expect you to either.",
                    "Your job is to push past your normal stopping point. Whether you are running on a treadmill or doing a set of push-ups, get to the point where you are so tired and in pain that your mind is begging you to stop. Then push just 5 to 10 percent further. If the most push-ups you have ever done is one hundred in a workout, do 105 or 110. If you normally run thirty miles each week, run 10 percent more next week.",
                ]} />
                <Delay minutes={0} seconds={20} initialTime={initialTime}>
                    <IonCard className='card' style={{ margin: 20 }}>
                        <IonLabel><span className="highlight">Write down your baseline and decide how you can push your past normal stopping point! (saved)</span></IonLabel>
                        <IonTextarea autoGrow placeholder="Enter response here" value={getVal()} onIonChange={(e) => {setResponse(e.detail.value as string) }} />
                    </IonCard>
                </Delay>
                <Delay minutes={0} seconds={40} initialTime={initialTime}>
                    <List items={[
                        "This gradual ramp-up will help prevent injury and allow your body and mind to slowly adapt to your new workload. It also resets your baseline, which is important because you’re about to increase your workload another 5 to 10 percent the following week, and the week after that.",
                        "There is so much pain and suffering involved in physical challenges that it’s the best training to take command of your inner dialogue, and the newfound mental strength and confidence you gain by continuing to push yourself physically will carry over to other aspects in your life. You will realize that if you were underperforming in your physical challenges, there is a good chance you are underperforming at school and work too.",
                        "The bottom line is that life is one big mind game. The only person you are playing against is yourself. Stick with this process and soon what you thought was impossible will be something you do every fucking day of your life.",
                        "The 40% rule is when your mind tells you that you're exhausted, fried, totally tapped out, you're really only 40 percent done!"
                    ]} />
                </Delay>
                <Delay minutes={1} seconds={0} initialTime={initialTime}>
                    <IonButton color={color} onClick={handleContinue} id="Continue">
                        Continue
                    </IonButton>
                </Delay>
                <div id="footer" />
            </IonContent>
        </IonPage>
    )
}

export default PushPast;