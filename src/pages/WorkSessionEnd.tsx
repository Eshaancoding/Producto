import ZenMessage from "../helper/ZenMessage";
import { LocalNotifications } from "@capacitor/local-notifications";
import { useIonViewWillEnter } from "@ionic/react";

const WorkSessionEnd: React.FC = () => {
    
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
        }).then((result) => console.log("success", result)).catch((value) => {console.log("rejected", value)})
    }
    useIonViewWillEnter(viewEnter)

    return (
        <ZenMessage
            title={<><strong>Congratulations</strong> on finishing the session! <br /> </>} 
            header={<><strong>Think</strong> about the work that you have just done. <br /> Be <strong>proud</strong> of the <strong>effort</strong> that you just put!</>}
            description={<>Being proud of your effort, no matter how small, is one of the most important aspects of gaining a <strong>growth mindset.</strong> So you should celebrate your effort! </> }
            minutes={0}
            seconds={30}
            href="/breakBadHabit"
        />
    )
}

export default WorkSessionEnd;
