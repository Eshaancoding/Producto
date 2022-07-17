import { IonPage, IonContent, IonTitle, IonText, IonButton, useIonViewWillEnter, IonProgressBar} from "@ionic/react"
import { useHistory } from "react-router";

function SpaceTimeBridging(props: any) {
    const history = useHistory()
    return (
        <IonPage>
            <IonContent>
                <IonTitle id="Title">Space Time Bridging</IonTitle>
                    <IonText>
                        <p id="Description">
                            Space Time Bridging is an exercise that shifts the brain to focus from the peri-personal space to extrapersonal space. Peri-personal space refers the anything inside your body, and your immediate environment, and extrapersonal space refers to anything outside your body (ex: the environment). It's important to stay in the extrapersonal space because it focuses your body and mind to the outside world instead of your inside world. For example, focusing on the extrapersonal space would lead to focus more on the benefit of continuing to do the goal for weeks or months (extrapersonal space) instead of how bad it feels to do the habit now (interpersonal space). <br /> <br />
                        </p>
                    </IonText>
                    <IonButton id="Continue" onClick={() => {history.replace("/STBStepOne")}}>Start Exercise</IonButton>
            </IonContent>
        </IonPage>
    )
}

export default SpaceTimeBridging;