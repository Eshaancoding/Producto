import { IonPage, IonCard, IonText, IonContent, IonTitle, IonButton, IonCardSubtitle, IonCardTitle, IonCardContent} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";
import CountBar from "../../helper/CounterBar";

function Remember (props:any) {
    const [color, setColor] = useState("secondary")
    const [showTip, setShowTip] = useState(false)
    const [showQues, setShowQues] = useState(false)
    const history = useHistory()
    
    async function HandleContinue () {
        if (color == "primary") {
            history.replace("/WorkSession") 
        }
    }

    return (
        <IonPage>
            <IonContent>
                <CountBar minutes={1} seconds={0} useStartTime finish={() => setColor("primary")} />
                <IonTitle id="Title">Remembering the Challenges</IonTitle>
                <IonText><p className="Description">Try to think of the tips & questions and <strong>apply them by yourself!</strong> Remember that the ultimate goal is to be productive without any dependence on anything or anyone, including this app! <br /> <br /> If you are having trouble remembering, you could click the buttons to reveal the questions or tips!</p></IonText>
                <br />
                <IonButton id="open-modal" expand="block" color="light" onClick={() => {setShowQues((value:any) => !value)}}>Toggle Questions</IonButton>
                {showQues && <>
                    <IonCard className="card">
                        <IonCardSubtitle>Write down your baseline and decide how you can push your past normal stopping point!</IonCardSubtitle>
                    </IonCard>
                    <IonCard className="card">
                        <IonCardSubtitle>What is the goal that you want to achieve? What/How does it feel like, or look like?</IonCardSubtitle>
                    </IonCard>
                    <IonCard className="card">
                        <IonCardSubtitle>What are your barriers that is limiting you to success? How will you attack those problems when they occur? (Remember you could use other techniques like the 40% rule, Cookie Jar, or anything else)</IonCardSubtitle>
                    </IonCard>
                    <IonCard className="card">
                        <IonCardSubtitle>Why are you doing this? What is driving you toward this achievement? Where does the darkness you're using as fuel come from? What has calloused your mind?</IonCardSubtitle>
                    </IonCard>
                    <IonCard className="card">
                        <IonCardSubtitle>Write down your baseline and decide how you can push your past normal stopping point!</IonCardSubtitle>
                    </IonCard>
                    <IonCard className="card">
                        <IonCardSubtitle>What did you achieve in life? What life obstacles did you overcome?</IonCardSubtitle>
                    </IonCard>
                    <IonCard className="card">
                        <IonCardSubtitle>Think of any type of pain that you may encounter during the session. What "cookie" are you going to grab when the pain hits?</IonCardSubtitle>
                    </IonCard>
                    <IonCard className="card">
                        <IonCardSubtitle>Look in front of the mirror, and be honest with yourself. What do you have to improve upon? What are you doing bad at? Shout it! Shout that you need to improve this, by yourself!</IonCardSubtitle>
                    </IonCard>
                </>}
                <IonButton id="open-modal" expand="block" color="light" onClick={() => {setShowTip((value:any) => !value)}}>Toggle Tips</IonButton>
                {showTip && <>
                    <IonCard className="card">
                        <IonCardTitle>Push Past</IonCardTitle>
                        <IonCardContent style={{paddingLeft: 0}}><p id="Description">
                            Push past your normal stopping point. Whether you are running on a treadmill or doing a set of push-ups, get to the point where you are so tired and in pain that your mind is begging you to stop. Then push just 5 to 10 percent further.
                        </p></IonCardContent>
                    </IonCard>
                    <IonCard className="card">
                        <IonCardTitle>Visualization</IonCardTitle>
                        <IonCardContent style={{paddingLeft: 0}}><p id="Description">
                            Rather than focusing on bullshit you cannot change, imagine visualizing the things you can. Choose any obstacle in your way, or set a new goal, and visualize overcoming or achieving it. You must also visualize the challenges that are likely to arise and determine how you will attack those problems when they do.
                        </p></IonCardContent>
                    </IonCard>
                    <IonCard className="card">
                        <IonCardTitle>Cookie Jar</IonCardTitle>
                        <IonCardContent style={{paddingLeft: 0}}><p id="Description">
                            Write all your achievements in your journal, as well as life obstacles you've overcome. Add in those minor tasks you failed earlier in life, but tried again a second or third time and ultimately succeeded at.
                        </p></IonCardContent>
                    </IonCard>
                    <IonCard className="card">
                        <IonCardTitle>Accountability Mirror</IonCardTitle>
                        <IonCardContent style={{paddingLeft: 0, paddingBottom: 0}}><p id="Description">
                            What are the current factors limiting your growth and success? Break out your journal and write them all out in minute detail. Don’t be bland with this assignment. I showed you every piece of my dirty laundry. You will use your story, this list of excuses, these very good reasons why you shouldn’t amount to a damn thing, to fuel your ultimate success.
                        </p></IonCardContent>
                    </IonCard>
                    <IonCard className="card">
                        <IonCardTitle>Failure</IonCardTitle>
                        <IonCardContent style={{paddingLeft: 0}}><p id="Description">
                            Think about your most recent and your most heart-wrenching failures. Break out that journal one last time and write them out. First off, write out all the good things, everything that went well, from your failures. Then note how you handled your failure. Now go back through and make a list of things you can fix.
                        </p></IonCardContent>
                    </IonCard>
                </>}
                
                <IonButton id="Continue" color={color} onClick={HandleContinue}>Continue</IonButton>
                <div id="footer" />
            </IonContent>
        </IonPage>
    )
}

export default Remember;