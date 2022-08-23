import { IonText, IonTextarea, IonCard, IonLabel, IonPage, IonTitle, IonContent, useIonViewWillEnter, IonButton} from '@ionic/react';
import { List } from '../Sessions/WorkSession';
import { useState } from 'react';
import { Storage } from '@ionic/storage';
import { useHistory } from 'react-router';
import Delay from '../../helper/Delay';
import { getDate } from '../../helper/DateHelper';
import { isPlatform } from '@ionic/react';

const CookieJar: React.FC = () => {
    const store = new Storage()
    store.create()
    const [responses, setResponses] = useState(["", ""])
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
        if (index == 0) {
            await store.set("CookieResponse", str)
        }
    }

    function handleContinue () {
        if (color == "primary") {
            history.replace("/AccountabilityMirror")
        }
    }

    return (
        <IonPage>
            <IonContent>
                <IonText>
                    <p id='Title' className={isPlatform("ios") ? "ios" : undefined}>Cookie Jar</p>
                </IonText>
                <List items={[
                    "Take inventory of your Cookie Jar. Crack your journal open again. Write it all out. Remember, this is not some breezy stroll through your personal trophy room. Don’t just write down your achievement hit list. Include life obstacles you’ve overcome as well, like quitting smoking or overcoming depression or a stutter.",
                    "Add in those minor tasks you failed earlier in life, but tried again a second or third time and ultimately succeeded at. Feel what it was like to overcome those struggles, those opponents, and win."
                ]} />
                <Delay minutes={0} seconds={20} initialTime={initialTime}>
                    <IonCard className='card' style={{ margin: 20 }}>
                        <IonLabel><span className="highlight">What did you achieve in life? What life obstacles did you overcome?</span></IonLabel>
                        <IonTextarea autoGrow placeholder="Enter response here" onIonChange={(e) => {setResponse(e.detail.value as string, 0)}} />
                    </IonCard>
                </Delay>
                <Delay minutes={0} seconds={30} initialTime={initialTime}>
                    <List items={[
                        "Then get to work. Set ambitious goals before each workout and let those past victories carry you to new personal bests. If it’s a run or bike ride, include some time to do interval work and challenge yourself to beat your best mile split. Or simply maintain a maximum heart rate for a full minute, then two minutes. If you’re at home, focus on pull-ups or push-ups. Do as many as possible in two minutes. Then try to beat your best.",
                        "When the pain hits and tries to stop you short of your goal, dunk your fist in, pull out a cookie, and let it fuel you! If you’re more focused on intellectual growth, train yourself to study harder and longer than ever before, or read a record number of books in a given month. Your Cookie Jar can help there too.",
                    ]} />
                </Delay>
                <Delay minutes={0} seconds={45} initialTime={initialTime}>
                    <IonCard className='card' style={{ margin: 20 }}>
                        <IonLabel><span className="highlight">Think of any type of pain that you may encounter during this session when pushing yourself. What "cookie" are you going to grab when that pain hits?</span></IonLabel>
                        <IonTextarea autoGrow placeholder="Enter response here" onIonChange={(e) => {setResponse(e.detail.value as string, 1)}} />
                    </IonCard>
                </Delay>
                <Delay minutes={1} seconds={0} initialTime={initialTime}>
                    <List items={[
                        "Because if you perform this challenge correctly and truly challenge yourself, you’ll come to a point in any exercise where pain, boredom, or self-doubt kicks in, and you’ll need to push back to get through it. The Cookie Jar is your shortcut to taking control of your own thought process. Use it that way!",
                        "The point here isn’t to make yourself feel like a hero for the fuck of it. It’s not a hooray-for-me session. It’s to remember what a badass you are so you can use that energy to succeed again in the heat of battle!"
                    ]} />

                    <IonButton color={color} onClick={handleContinue} id="Continue">
                        Continue
                    </IonButton>
                </Delay>

                <div id="footer" />
            </IonContent>
        </IonPage>
    )
}

export default CookieJar;