import { IonTextarea, IonText, IonCard, IonLabel, IonPage, IonTitle, IonContent, useIonViewWillEnter, IonButton, isPlatform} from '@ionic/react';
import { List } from '../Sessions/WorkSession';
import { useState } from 'react';
import { Storage } from '@ionic/storage';
import { useHistory } from 'react-router';
import Delay from '../../helper/Delay';
import { getDate } from '../../helper/DateHelper';
import Input from '../../helper/Input';

const NextHabit: React.FC = () => {
    const store = new Storage()
    store.create()
    const [responses, setResponses] = useState(["", "", ""])
    const [color, setColor] = useState("secondary")
    const history = useHistory() 
    const [initialTime, setInitialTime] = useState(null as any)
    const [nextHabit, setNextHabit] = useState("")

    useIonViewWillEnter(async () => {
        setInitialTime(getDate() as any)
        const habitId = await store.get("habitId")
        const habits = await store.get("habits")
        for (var i = habitId+1; i < habits.length; i++) {
            if (habits[i]["isReminder"] === false) {
                setNextHabit(habits[i]["title"])
                break
            }
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
        if (index == 0) {
            await store.set("VisualizationResponseOne", str)
        }
        else if (index == 1) {
            await store.set("VisualizationResponseTwo", str)
        } 
        else if (index == 2) {
            await store.set("VisualizationResponseThree", str)
        }
    }

    function handleContinue () {
        if (color == "primary") {
            history.replace("/Home")
        }
    }

    return (
        <IonPage>
            <IonContent>
                <IonText>
                    <p id='Title' className={isPlatform("ios") ? "ios" : undefined}>Visualize your next habit!</p>
                </IonText>
                {nextHabit !== "" && 
                    <IonText>
                        <p id="Header">Your Next Habit is: <strong>{nextHabit}</strong></p>
                    </IonText>
                }
                <List items={[
                    "It’s time to visualize! Again, the average person thinks 2,000–3,000 thoughts per hour. Rather than focusing on bullshit you cannot change, imagine visualizing the things you can. Choose any obstacle in your way, or set a new goal, and visualize overcoming or achieving it. Before I engage in any challenging activity, I start by painting a picture of what my success looks and feels like. I’ll think about it every day and that feeling propels me forward when I’m training, competing, or taking on any task I choose. ",
                ]} />
                <Input 
                    minutes={0} 
                    seconds={10}
                    initialTime={initialTime}
                    title="What is the goal that you want to achieve? What/How does it feel like, or look like?"
                    onIonChange={(e:any) => setResponse(e.detail.value as string, 0)}
                />
                <Delay minutes={0} seconds={30} initialTime={initialTime}>
                    <List items={[
                        "But visualization isn’t simply about daydreaming of some trophy ceremony— real or metaphorical. You must also visualize the challenges that are likely to arise and determine how you will attack those problems when they do. That way you can be as prepared as possible on the journey. When I show up for a foot race now, I drive the entire course first, visualizing success but also potential challenges, which helps me control my thought process. You can’t prepare for everything but if you engage in strategic visualization ahead of time, you’ll be as prepared as you possibly can be."
                    ]} /> 
                </Delay>
                <Input 
                    minutes={0}
                    seconds={40}
                    initialTime={initialTime}
                    title="What are your barriers that is limiting you to success? How will you attack those problems when they occur? (Remember you could use other techniques like the 40% rule, Cookie Jar, or anything else)"
                    onIonChange={(e:any) => setResponse(e.detail.value as string, 1)}
                /> 
                <Delay minutes={1} seconds={0} initialTime={initialTime}>
                    <List items={[
                        "That also means being prepared to answer the simple questions. Why are you doing this? What is driving you toward this achievement? Where does the darkness you’re using as fuel come from? What has calloused your mind? You’ll need to have those answers at your fingertips when you hit a wall of pain and doubt. To push through, you’ll need to channel your darkness, feed off it, and lean on your calloused mind.",
                        "Remember, visualization will never compensate for work undone. You cannot visualize lies. All the strategies I employ to answer the simple questions and win the mind game are only effective because I put in work. It’s a lot more than mind over matter. It takes relentless self-discipline to schedule suffering into your day, every day, but if you do, you’ll find that at the other end of that suffering is a whole other life just waiting for you.",
                        "This challenge doesn’t have to be physical, and victory doesn’t always mean you came in first place. It can mean you’ve finally overcome a lifelong fear or any other obstacle that made you surrender in the past."
                    ]} />
                </Delay>
                <Delay minutes={1} seconds={20} initialTime={initialTime}>
                    <Input 
                        noDelay
                        title="Why are you doing this? What is driving you toward this achievement? Where does the darkness you're using as fuel come from? What has calloused your mind?"
                        onIonChange={(e:any) => setResponse(e.detail.value as string, 2)}
                    />

                    <IonButton color={color} onClick={handleContinue} id="Continue">
                        Continue
                    </IonButton>
                </Delay>

                <div id="footer" />
            </IonContent>
        </IonPage>
    )
}

export default NextHabit;