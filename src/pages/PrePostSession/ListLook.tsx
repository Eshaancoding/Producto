import ZenMessage from "../../helper/ZenMessage";
import { useIonViewWillEnter } from "@ionic/react";
import { LocalNotifications } from "@capacitor/local-notifications";

const ListLook: React.FC = () => {
    
    useIonViewWillEnter(async () => {
        await LocalNotifications.schedule({
            notifications: [{
                title: "Motivation Session", 
                body: "It's time for a motivation session!",
                id: 1,
                extra: {
                    data: "Motivation Session Notification"
                }
            }]
        })
    })

    return (
        <ZenMessage 
            title={<>What to do during the Motivation Session!</>}    
            header={<>While you take your break, take a look at all the challenges and do them! Don't do any electronics during this period!</>}
            description={<>The challenges are listed in the next page right below where all the session information is! Ex: take a look at your accountability mirror, your schedule, your past accomplishments, etc. <strong>Do not do any electronics during this period!</strong></>}
            minutes={0}
            seconds={15}
            href="/MotivationSession"
        />
    )
}

export default ListLook;