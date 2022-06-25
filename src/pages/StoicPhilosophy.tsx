import { IonButton, IonCard, IonContent, IonText, IonPage, IonTitle, IonItem, useIonViewDidEnter, IonLabel, IonInput, IonList, IonListHeader, IonProgressBar } from '@ionic/react'
import { useEffect, useState } from 'react'
import "./TaskIntroduction.css"
import "./StoicPhilosophy.css"
import { useHistory } from 'react-router'

const StoicPage: React.FC = () => {
    const history = useHistory()
    const original_seconds = 15;
    const [seconds, setSeconds] = useState(original_seconds*10)
    var interval:any = null;
   

    useEffect(() => {
        interval = setInterval(() => {
            if (seconds === 0) {
                clearInterval(interval)        
                return null;
            }
            else {
                setSeconds(seconds => seconds - 1)
            }
        },100)
        return () => clearInterval(interval)
    }, [seconds])

    function handleClick () {
        if (seconds === 0) {
            history.push("/home") 
        }
    }
    
    return (
        <IonPage>
            <IonContent>
                <IonProgressBar value={seconds / (original_seconds*10)} />
                <IonTitle id="Title">Stoicism</IonTitle>
                <IonText>
                    <p id="Description">Great job on completing your task! So before you go, here's some quotes on living your life happily. These sets of quotes are derived from an ancient philosophy called <strong>Stoicism</strong>. Stoicism was founded by Zeno of Cyprus after he has lost all of his fortune from a terrible shipwreck. Although most people would be in great sadness after losing much of his or her fortune, Zeno of Cyprus had a different approach. These series of quotes will introduce the philosophy of Stoicism.
                    </p>  
                </IonText>
                <br /> 
                <IonCard>
                    <IonTitle className='header'>
                        1. "External things are not the problem. It's your assessment of them. Which you can erase right now." - Marcus Aurelius
                    </IonTitle>
                    <IonText>
                        <p className="Description">
                            This quote emphasizes that you have <span style={{color: 'rgb(200, 200, 200)'}}>control</span> over the events that happen to you. You are the only person who can judge whether a certain situation is good or bad! In other words, <span style={{color: 'rgb(200, 200, 200)'}}>try to change your perspective on events that you normally think as boring or unfortuante events.</span> <br /> <br /> For example, instead of thinking, <span style={{color: 'rgb(200, 200, 200)'}}>"Why do I have so much work! Why did my boss/teacher do this to me!! This is going to take forever and I am going to be so tired!" </span>  Try to think like this, <span style={{color: 'rgb(200, 200, 200)'}}> "Oh! My boss/teacher gave me more homework. They are pushing me to become a more disciplined and hardworking person! Let's try to do this!" </span>
                            <br /><br />
                            <span style={{color: 'rgb(200, 200, 200)', fontStyle: 'italic'}}>"It's your assessment of them."</span>
                        </p>
                    </IonText>
                </IonCard>
                <IonCard>
                    <IonTitle className='header'>
                        2. "Let us prepare our minds as if we’d come to the very end of life. Let us postpone nothing. Let us balance life’s books each day. The one who puts the finishing touches on their life each day is never short of time." - Seneca
                    </IonTitle> 
                    <IonText>
                        <p className='Description'>
                            The summary of this quote is to <span style={{color: 'rgb(200, 200, 200)'}}>think that you are going to die soon.</span> This may sound grim, but what it's really telling you is to not waste a minute or second of your life, because <span style={{color: 'rgb(200, 200, 200)'}}>life is precious.</span> It's pliable. It can change at any time, and it is important that you do not waste a second of it. It is also important to <span style={{color: 'rgb(200, 200, 200)'}}> appreciate what you have, and what you have experienced in your life </span>. You will no longer have <span style={{color: 'rgb(200, 200, 200)'}}> any excessive desire if you keep your minds focused on the possiblity of death. </span>
                            <br /><br /> 
                            <span style={{color: 'rgb(200, 200, 200)', fontStyle: 'italic'}}>"Let us balance life's books each day."</span>
                        </p> 
                    </IonText>
                </IonCard>
                <IonCard>
                    <IonTitle className='header'>
                        3. "I judge you unfortunate because you have never lived through misfortune. You have passed through life without an opponent—no one can ever know what you are capable of, not even you." - Seneca
                    </IonTitle>
                    <IonText>
                        <p className='Description'>
                            According to the Stoic philosophy, instead of dreading for the next barrier or failure to come, stoics like to <span style={{color: 'rgb(200,200,200)'}}>positively anticipate</span> the next barrier or failure to come. Because in experiencing misfortune, you will become a better version of yourself. You notice that you are <span style={{color: 'rgb(200,200,200)'}}>much more capable than you originally thought</span>! However, those who refrain themselves to misfortune and shy away, they will never realize their full potential.
                            <br /><br /> 
                            <span style={{color: 'rgb(200, 200, 200)', fontStyle: 'italic'}}>"No one can ever know what you are capable of, not even you."</span>
                        </p>
                    </IonText>
                </IonCard>
                <IonCard>
                    <IonTitle className='header'>
                        4. Premeditation of Evils - Ryan Holiday
                    </IonTitle>
                    <IonText>
                        <p className='Description'>
                            Instead of practicing of positive visualization, like visualization that you will accomplish your goal and everything goes smoothy, we should practice <span style={{color: 'rgb(200,200,200)'}}>negative visualization</span>. This involves <span style={{color: 'rgb(200, 200, 200)'}}> visualizing everything that could go wrong,  accepting this possiblity, and then visualize yourself overcoming the barrier. </span>
                        </p>
                    </IonText>
                </IonCard>
                <IonButton id="Continue" onClick={handleClick} color={(seconds !== 0) ? "secondary" : "primary"}>Continue</IonButton>
                <div id="footer" />
            </IonContent> 
        </IonPage>
    )
}

export default StoicPage