import ZenMessage from "../helper/ZenMessage";
import { LocalNotifications } from "@capacitor/local-notifications";
import { useIonViewWillEnter, IonCard, IonItem, IonLabel, IonText } from "@ionic/react";
import { Storage } from "@ionic/storage";
import { useState } from "react";

const WorkSessionEnd: React.FC = () => {
    const [response, setResponse ] = useState([])
    const store = new Storage()
    store.create()
    
    async function viewEnter () {
        // set notification
        await LocalNotifications.schedule({
            notifications: [{
                title: "Break Session", 
                body: "It's time to take a break!", 
                id: 1,
                extra: {
                data: "Break Session Notification"
                }
            }]
        })
        // get response information
        const resp = await store.get("steps") 
        setResponse(resp)
    }
    useIonViewWillEnter(viewEnter)

    return (
        <ZenMessage
            title={(<> Rewarding Yourself </>)}
            header={(<>Say to yourself, "I know it's <strong>painful</strong>, I know this <strong>doesn't feel good</strong>, but I am <strong>focused</strong> on this and I going to start accessing the reward." Then reward yourself over the entire habit that you just did! Be glad and happy that you are one step closer to achieving your daily goal, and positively anticipate the reward after you do the habit. </>)}
            description={<></>}
            minutes={0}
            seconds={30}
            href="/breakBadHabit"
            misc={
                response.map((value, index) => {
                    return (
                        <IonCard key={index}>
                            <IonItem>
                                <IonText><p>Step {index+1}: {value}</p></IonText>
                            </IonItem>
                        </IonCard>
                    )
                })
            }
        />
    )
}

export default WorkSessionEnd;
