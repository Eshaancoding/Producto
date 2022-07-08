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
        })
    }
    useIonViewWillEnter(viewEnter)

    return (
        <ZenMessage
            title={(<> Rewarding Yourself </>)}
            header={(<>Say to yourself, "I know it's <strong>painful</strong>, I know this <strong>doesn't feel good</strong>, but I am <strong>focused</strong> on this and I going to start accessing the reward."</>)}
            description={<><strong>Think</strong> about the <strong>effort</strong> that you have just done. Be <strong>proud</strong> of the that you just put! Remember how <strong>hard</strong> it was to get started on this habit? Well, you just <strong>overcome</strong> that massive barrier! Being proud of your effort, no matter how small, is one of the most important aspects of gaining a <strong>growth mindset.</strong> Growth Mindset says that, <strong>"I am not there yet, but striving itself is the end goal."</strong> What you end up doing is evoking a dopamine release based on actually doing the habit itself, instead of the end reward or goal.</> }
            minutes={0}
            seconds={30}
            href="/breakBadHabit"
        />
    )
}

export default WorkSessionEnd;
