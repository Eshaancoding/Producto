import ZenMessage from "../../helper/ZenMessage";
import { LocalNotifications } from "@capacitor/local-notifications";
import { Storage } from "@ionic/storage";
import { useIonViewWillEnter } from "@ionic/react";
import { useState } from "react";

const BreakBadHabit: React.FC = () => {
    const [badHabit, setBadHabit] = useState("")
    const store = new Storage()
    store.create()

    async function IonEnter() {
        // set notifications
        await LocalNotifications.schedule({
            notifications: [{
                title: "Work Session", 
                body: "It's time to work!", 
                id: 2,
                extra: {
                data: "Work Session Notification"
                }
            }]
        })

        // get bad habit
        const habits: any = await store.get("habits")
        var habitString: string = ""
        habits.map(function (object: any, index: number) {
            if (object["isBadHabit"]) {
                if (habitString === "") habitString += object["title"]
                else habitString += (", " + object["title"])
            }
        })
        setBadHabit(habitString)
    }

    useIonViewWillEnter(IonEnter)

    return (
        <ZenMessage
            title={<>Breaking Bad Habits</>}
            header={
                <>
                    <strong>1. </strong> Bring conscious awareness that you have done a bad habit. <br />
                    <strong>2. </strong> Capture the sequence of events during the bad habit <br /> 
                    <strong>3. </strong> Do a <strong>easy and good</strong> habit immediately afterwards (ex: drinking water or meditating) <br />
                    Your bad habits are: <strong>{badHabit}</strong> <br />
                    <strong>4. </strong> Visualize the negative consequences if you continue to do each bad habit for a year or more. 
                </>
            }
            description={<>
                This technique is uses a method called <strong>Long-Term Depression</strong>, where neurons that fire at differing times would lead to a weaker connection. So, for every bad habit that you do, try to do a good habit <strong>immediately</strong> after the bad habit so you initiate long-term depression
                <br />
                For example, if I do a bad habit like Youtube or playing games, I immediately rush to do computer programming (a good habit that I love, and therefore is easy to execute since I <strong>don't need any motivation</strong> to do it)
                <br /> <br />
                Fear is also a great motivator. So visualizing fear and the negative consequences can create more motivation to break the bad habit.
            </>}
            minutes={0}
            seconds={30}
            href="/VisualizationBreak"
            removeAndrew={true}
        />
    )
}

export default BreakBadHabit;