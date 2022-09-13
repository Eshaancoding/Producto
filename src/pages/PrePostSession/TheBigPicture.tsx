import { IonText, IonContent, IonPage, IonCard, IonCardSubtitle, IonButton} from '@ionic/react';
import CountBar from '../../helper/CounterBar';
import { useState } from 'react';
import { useHistory } from 'react-router';

const BigPicture: React.FC = () => {
    const [color, setColor] = useState("secondary") 
    const history = useHistory()
    return (
        <IonPage>
            <IonContent>
                <CountBar useStartTime minutes={2} seconds={0} finish={() => setColor("primary")}/>
                <IonText><p id="Title">The Big Picture: Why do you want to be productive?</p></IonText> 
                <IonText><p className="Description">It is sometimes helpful to take a look at the big picture sometimes. Even though you may feel "in the zone", taking a look at the big picture will increase your motivation and your quality of work. <br /> <br /> 
                Take a look at these questions that will help you visualize the big picture! The questions from David Goggin's book "Can't Hurt Me".
                </p></IonText> 

                <br />

                <IonCard className="card">
                    <IonCardSubtitle style={{color: 'white'}}>Be very truthful when you think! This may mean admitting that you are bad at school, or at your job, or that you are lazy and unproductive. That's okay! Being truthful is usually the first step that you need to take in order to improve. If you are strugging at becoming truthful to yourself, look at yourself at the mirror and say your thoughts out loud! Shout at yourself that you need to be more productive!!</IonCardSubtitle>
                </IonCard>
                <IonCard className="card">
                    <IonCardSubtitle style={{color: 'white'}}>How you can push your past normal stopping point on the task that you are planning on doing? Remember that you have to remove that governor from your mind. You are only 40% capable of what you think you are. Stop that limit.</IonCardSubtitle>
                </IonCard>
                <IonCard className="card">
                    <IonCardSubtitle style={{color: 'white'}}>What is the goal that you want to achieve? What/How does it feel like, or look like? Visualize it vividly in your mind and use it to push through your task. Visualize not only completing the task, but also being productive during the entire day!</IonCardSubtitle>
                </IonCard>
                <IonCard className="card">
                    <IonCardSubtitle style={{color: 'white'}}>What are your barriers that is limiting you to success? How will you attack those problems when they occur? (Remember you could use other techniques like the 40% rule, Cookie Jar, or anything else) Visualize overcoming those barriers during your session and even after your session is done! Visualize it throughout the day! </IonCardSubtitle>
                </IonCard>
                <IonCard className="card">
                    <IonCardSubtitle style={{color: 'white'}}>Why are you doing this? What is driving you toward this achievement? Where does the darkness you're using as fuel come from? What has calloused your mind? You need to have the answers to these questions in the forefront of your mind in order to push through the most difficult tasks. Answer these questions for not only the task that you are doing, but also being productive!</IonCardSubtitle>
                </IonCard>
                <IonCard className="card">
                    <IonCardSubtitle style={{color: 'white'}}>What did you achieve in life? What life obstacles did you overcome? Capture the feeling of success during those moments.</IonCardSubtitle>
                </IonCard>

                <br /> 

                <IonButton id="Continue" color={color} onClick={() => {if (color == "primary") history.replace("/WorkSession")}}>
                    Continue
                </IonButton>

                <div id="footer" />

            </IonContent>
        </IonPage>
    )
}

export default BigPicture;