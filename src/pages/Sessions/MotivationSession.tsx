import { IonList, IonCard, IonLabel, IonInput, IonItem, IonText, IonTextarea, IonContent, IonPage, useIonViewWillEnter, IonButton, } from '@ionic/react';
import { LocalNotifications } from '@capacitor/local-notifications';
import { useState } from 'react';
import "../ProductoStyle.css"
import "./WorkSession.css"

import CountBar from '../../helper/CounterBar';
import { useHistory } from 'react-router';
import { Storage } from '@ionic/storage';

const BulletPoint = (props: any) => {
    return (
        <IonItem>
            <IonText>
                <p className="BodyText">{props.text}</p>
            </IonText>
        </IonItem>
    )
}

const List = (props: any) => {
    return (
        <IonList id="list" lines='inset' inset={true}>
            {props.items.map((item: any, idx: number) => {
                return (
                    <BulletPoint key={idx} text={item} />
                )
            })}
        </IonList>
    )
}

const TimeDisplay = (props: any) => {
    var minutes = props.minutes;
    var seconds = props.seconds;
    var minutes_text = minutes.toString();
    var seconds_text = seconds.toString();
    if (seconds < 10 && seconds >= 0) {
        seconds_text = "0" + seconds_text;
    }
    if (minutes < 0 || seconds < 0) {
        minutes_text = "0";
        seconds_text = "00";
    }
    return (
        <p id="TimeDisplay">Time Spent: {minutes_text}:{seconds_text} <br /> Sessions Done: {props.NumberSesDone} </p>
    )
}

const MotivationSession: React.FC = () => {
    const [originalMinutes, setOriginalMinutes] = useState(0)
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [habitId, setHabitId] = useState(-1)
    const [NumberSesDone, setNumberSesDone] = useState(0)
    const [responses, setResponses] = useState(["", "", "", "", "", ""])
    const [color, setColor] = useState("secondary")
    const history = useHistory()
    const store = new Storage()
    store.create()

    async function setResponse(text: string, index: number) {
        var newResponse = [...responses]
        newResponse[index] = text
        setResponses(newResponse)
        await store.set("ChallengesResponse", newResponse)
    }

    async function onIonEnter() {
        // set notifications
        store.get("ChallengesResponse").then((value) => {
            if (value != (undefined || null)) {
                setResponses(value)
            }
        })

        store.get("pomoBreak").then((value) => { setOriginalMinutes(value) })
        store.get("habitId").then((value) => { setHabitId(value) })
        store.get("NumberSessionsDone").then((value) => { setNumberSesDone(value) })
    }
    useIonViewWillEnter(onIonEnter)

    async function handleCloseButton() {
        // get today's date
        var original_habits: any = await store.get("habits")
        // get response
        await store.set("ChallengesResponse", responses)
        // change habits
        original_habits[habitId]["sessions"] += 1
        // set habits in store
        await store.set("habits", original_habits)
        // redirect to home (ending page after completed habit) 
        history.replace("/home")
    }

    async function CountBarEnd() {
        if (color === "secondary") {
            await LocalNotifications.schedule({
                notifications: [{
                    title: "Work Session", 
                    body: "It's time to work! Click the continue button to continue.",
                    id: 2,
                    extra: {
                        data: "Work Session Notification"
                    }
                }]
            })
        }
        setColor("primary")
    }

    async function ContinueButton () {
        if (color === "primary") history.replace("/WorkSession")
    }

    return (
        <IonPage>
            <IonContent fullscreen>
                <CountBar minutes={originalMinutes} seconds={0} useStartTime logMinutes={setMinutes} logSeconds={setSeconds} finish={CountBarEnd} />
                <IonText><p id="Title">Motivation Session</p></IonText>
                <IonText>
                    <TimeDisplay minutes={minutes} seconds={seconds} NumberSesDone={NumberSesDone} />
                    <IonButton id="CloseButton" onClick={handleCloseButton}> End Session </IonButton>
                    <br />
                    <br />
                    <IonButton id="CloseButton" color={color} onClick={ContinueButton}>Continue</IonButton>
                    <br />
                    <br />
                    <h2>Tacked Post-It notes on the Accountability Mirror</h2>
                </IonText>
                <List items={[
                    "It’s time to come eyeball to eyeball with yourself, and get raw and real. This is not a self-love tactic. You can’t fluff it. Don’t massage your ego. This is about abolishing the ego and taking the first step toward becoming the real you!",
                    "I tacked Post-It notes on my Accountability Mirror, and I’ll ask you to do the same. Digital devices won’t work. Write all your insecurities, dreams, and goals on Post-Its and tag up your mirror. If you need more education, remind yourself that you need to start working your ass off because you aren’t smart enough! Period, point blank. If you look in the mirror and see someone who is obviously overweight, that means you’re fucking fat! Own it!",
                    "It’s okay to be unkind with yourself in these moments because we need thicker skin to improve in life. Whether it’s a career goal (quit my job, start a business), a lifestyle goal (lose weight, get more active), or an athletic one (run my first 5K, 10K, or marathon), you need to be truthful with yourself about where you are and the necessary steps it will take to achieve those goals, day by day. Each step, each necessary point of self-improvement, should be written as its own note.",
                    "That means you have to do some research and break it all down. For example, if you are trying to lose forty pounds, your first Post-It may be to lose two pounds in the first week. Once that goal is achieved, remove the note and post the next goal of two to five pounds until your ultimate goal is realized.",
                    "Whatever your goal, you’ll need to hold yourself accountable for the small steps it will take to get there. Self-improvement takes dedication and self-discipline. The dirty mirror you see every day is going to reveal the truth. Stop ignoring it. Use it to your advantage."
                ]} />
                <IonCard className='card' style={{ margin: 20 }}>
                    <IonLabel><span className="highlight">Enter your notes about this challenge here:</span></IonLabel>
                    <IonTextarea autoGrow placeholder="Enter response here" value={responses[0]} onIonChange={(e) => { setResponse(e.detail.value as string, 0) }} />
                </IonCard>
                <IonText>
                    <h2>Do the things that make you uncomfortable</h2>
                </IonText>
                <List items={[
                    "The first step on the journey toward a calloused mind is stepping outside your comfort zone on a regular basis. Dig out your journal again and write down all the things you don’t like to do or that make you uncomfortable. Especially those things you know are good for you. Now go do one of them, and do it again.",
                    "In the coming pages, I’ll be asking you to mirror what you just read to some degree, but there is no need for you to find your own impossible task and achieve it on the fast track. This is not about changing your life instantly, it’s about moving the needle bit by bit and making those changes sustainable. That means digging down to the micro level and doing something that sucks every day.",
                    "Even if it’s as simple as making your bed, doing the dishes, ironing your clothes, or getting up before dawn and running two miles each day. Once that becomes comfortable, take it to five, then ten miles. If you already do all those things, find something you aren’t doing. We all have areas in our lives we either ignore or can improve upon. Find yours.",
                    "We often choose to focus on our strengths rather than our weaknesses. Use this time to make your weaknesses your strengths. Doing things—even small things—that make you uncomfortable will help make you strong. The more often you get uncomfortable the stronger you’ll become, and soon you’ll develop a more productive, can-do dialogue with yourself in stressful situations."
                ]} />
                <IonCard className='card' style={{ margin: 20 }}>
                    <IonLabel><span className="highlight">Enter your notes about this challenge here:</span></IonLabel>
                    <IonTextarea autoGrow placeholder="Enter response here" value={responses[1]} onIonChange={(e) => { setResponse(e.detail.value as string, 1) }} />
                </IonCard>
                <IonText>
                    <h2>Rather than focusing on bullshit you cannot change, imagine visualizing the things you can change. </h2>
                </IonText>
                <List items={[
                    "It’s time to visualize! Again, the average person thinks 2,000–3,000 thoughts per hour. Rather than focusing on bullshit you cannot change, imagine visualizing the things you can.",
                    "Choose any obstacle in your way, or set a new goal, and visualize overcoming or achieving it. Before I engage in any challenging activity, I start by painting a picture of what my success looks and feels like. I’ll think about it every day and that feeling propels me forward when I’m training, competing, or taking on any task I choose. But visualization isn’t simply about daydreaming of some trophy ceremony— real or metaphorical. You must also visualize the challenges that are likely to arise and determine how you will attack those problems when they do.",
                    "That way you can be as prepared as possible on the journey. When I show up for a foot race now, I drive the entire course first, visualizing success but also potential challenges, which helps me control my thought process. You can’t prepare for everything but if you engage in strategic visualization ahead of time, you’ll be as prepared as you possibly can be.",
                    "That also means being prepared to answer the simple questions. Why are you doing this? What is driving you toward this achievement? Where does the darkness you’re using as fuel come from? What has calloused your mind? You’ll need to have those answers at your fingertips when you hit a wall of pain and doubt. To push through, you’ll need to channel your darkness, feed off it, and lean on your calloused mind.",
                    "Remember, visualization will never compensate for work undone. You cannot visualize lies. All the strategies I employ to answer the simple questions and win the mind game are only effective because I put in work. It’s a lot more than mind over matter. It takes relentless self-discipline to schedule suffering into your day, every day, but if you do, you’ll find that at the other end of that suffering is a whole other life just waiting for you.",
                    "This challenge doesn’t have to be physical, and victory doesn’t always mean you came in first place. It can mean you’ve finally overcome a lifelong fear or any other obstacle that made you surrender in the past."
                ]} />
                <IonCard className='card' style={{ margin: 20 }}>
                    <IonLabel><span className="highlight">Enter your notes about this challenge here:</span></IonLabel>
                    <IonTextarea autoGrow placeholder="Enter response here" value={responses[2]} onIonChange={(e) => { setResponse(e.detail.value as string, 2) }} />
                </IonCard>
                <IonText>
                    <h2>Write all your achievements in your journal, as well as life obstacles you've overcome. </h2>
                </IonText>
                <List items={[
                    "Take inventory of your Cookie Jar. Crack your journal open again. Write it all out. Remember, this is not some breezy stroll through your personal trophy room. Don’t just write down your achievement hit list. Include life obstacles you’ve overcome as well, like quitting smoking or overcoming depression or a stutter.",
                    "Add in those minor tasks you failed earlier in life, but tried again a second or third time and ultimately succeeded at. Feel what it was like to overcome those struggles, those opponents, and win.",
                    "Then get to work. Set ambitious goals before each workout and let those past victories carry you to new personal bests. If it’s a run or bike ride, include some time to do interval work and challenge yourself to beat your best mile split. Or simply maintain a maximum heart rate for a full minute, then two minutes. If you’re at home, focus on pull-ups or push-ups. Do as many as possible in two minutes. Then try to beat your best.",
                    "When the pain hits and tries to stop you short of your goal, dunk your fist in, pull out a cookie, and let it fuel you! If you’re more focused on intellectual growth, train yourself to study harder and longer than ever before, or read a record number of books in a given month. Your Cookie Jar can help there too.",
                    "Because if you perform this challenge correctly and truly challenge yourself, you’ll come to a point in any exercise where pain, boredom, or self-doubt kicks in, and you’ll need to push back to get through it. The Cookie Jar is your shortcut to taking control of your own thought process. Use it that way!",
                    "The point here isn’t to make yourself feel like a hero for the fuck of it. It’s not a hooray-for-me session. It’s to remember what a badass you are so you can use that energy to succeed again in the heat of battle!"
                ]} />
                <IonCard className='card' style={{ margin: 20 }}>
                    <IonLabel><span className="highlight">Enter your notes about this challenge here:</span></IonLabel>
                    <IonTextarea autoGrow placeholder="Enter response here" value={responses[3]} onIonChange={(e) => { setResponse(e.detail.value as string, 3) }} />
                </IonCard>
                <IonText>
                    <h2>Push past your normal stopping point.</h2>
                </IonText>
                <List items={[
                    "The main objective here is to slowly start to remove the governor from your brain. First, a quick reminder of how this process works. In 1999, when I weighed 297 pounds, my first run was a quarter mile. Fast forward to 2007, I ran 205 miles in thirty-nine hours, nonstop. I didn’t get there overnight, and I don’t expect you to either.",
                    "Your job is to push past your normal stopping point. Whether you are running on a treadmill or doing a set of push-ups, get to the point where you are so tired and in pain that your mind is begging you to stop. Then push just 5 to 10 percent further. If the most push-ups you have ever done is one hundred in a workout, do 105 or 110. If you normally run thirty miles each week, run 10 percent more next week.",
                    "This gradual ramp-up will help prevent injury and allow your body and mind to slowly adapt to your new workload. It also resets your baseline, which is important because you’re about to increase your workload another 5 to 10 percent the following week, and the week after that.",
                    "There is so much pain and suffering involved in physical challenges that it’s the best training to take command of your inner dialogue, and the newfound mental strength and confidence you gain by continuing to push yourself physically will carry over to other aspects in your life. You will realize that if you were underperforming in your physical challenges, there is a good chance you are underperforming at school and work too.",
                    "The bottom line is that life is one big mind game. The only person you are playing against is yourself. Stick with this process and soon what you thought was impossible will be something you do every fucking day of your life."
                ]} />
                <IonCard className='card' style={{ margin: 20 }}>
                    <IonLabel><span className="highlight">Enter your notes about this challenge here:</span></IonLabel>
                    <IonTextarea autoGrow placeholder="Enter response here" value={responses[4]} onIonChange={(e) => { setResponse(e.detail.value as string, 4) }} />
                </IonCard>
                <List items={[
                    "Think about your most recent and your most heart-wrenching failures. Break out that journal one last time. Log off the digital version and write them out longhand. I want you to feel this process because you are about to file your own, belated After Action Reports.", 
                    "First off, write out all the good things, everything that went well, from your failures. Be detailed and generous with yourself. A lot of good things will have happened. It’s rarely all bad.",
                    "Then note how you handled your failure. Did it affect your life and your relationships? How so? How did you think throughout the preparation for and during the execution stage of your failure? You have to know how you were thinking at each step because it’s all about mindset, and that’s where most people fall short.",
                    "Now go back through and make a list of things you can fix. This isn’t time to be soft or generous. Be brutally honest, write them all out. Study them. Then look at your calendar and schedule another attempt as soon as possible. If the failure happened in childhood, and you can’t recreate the Little League all-star game you choked in, I still want you to write that report because you’ll likely be able to use that information to achieve any goal going forward.",
                    "As you prepare, keep that AAR handy, consult your Accountability Mirror, and make all necessary adjustments. When it comes time to execute, keep everything we’ve learned about the power of a calloused mind, the Cookie Jar, and The 40% Rule in the forefront of your mind.",
                    "Control your mindset. Dominate your thought process. This life is all a fucking mind game. Realize that. Own it! And if you fail again, so the fuck be it. Take the pain. Repeat these steps and keep fighting. That’s what it’s all about."
                ]} />
                <IonCard className='card' style={{ margin: 20 }}>
                    <IonLabel><span className="highlight">Enter your notes about this challenge here:</span></IonLabel>
                    <IonTextarea autoGrow placeholder="Enter response here" value={responses[5]} onIonChange={(e) => { setResponse(e.detail.value as string, 5) }} />
                </IonCard>
                <IonText>
                    <p style={{ textAlign: 'center' }} >Challenges from the book <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.com/Cant-Hurt-Me-Master-Your/dp/1544512287">Can't Hurt Me</a> by David Goggins.</p>
                </IonText>
                <div id="footer" />
            </IonContent>
        </IonPage>
    )
}

export default MotivationSession;