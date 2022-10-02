import { IonPage, IonButton, IonContent, IonText, useIonViewDidEnter, IonCardTitle, IonCard, IonCardContent} from "@ionic/react";
import { useState } from "react";
import CloseButton from "../../helper/CloseButton";
import { QuestionAnswer } from "./QuestionAnswers";

function getRandomInt(max:number) {
  return Math.floor(Math.random() * max);
}

export function QAPage (props:any) {
    const [indx, setIndx] = useState(0)
    const [answerShown, setAnswerShown] = useState(false)
    const [buttonTitle, setButtonTitle] = useState("Show Answer")

    useIonViewDidEnter(() => {
        setIndx(getRandomInt(Object.keys(QuestionAnswer).length))
    })

    function handleClick () {
        if (buttonTitle == "Show Answer") {
            setAnswerShown(true)
            setButtonTitle("Next Question")
        }
        else if (buttonTitle == "Next Question") {
            setAnswerShown(false)
            setButtonTitle("Show Answer")
            const prev_index = indx
            var new_indx = getRandomInt(Object.keys(QuestionAnswer).length)
            while (true) {
                if (new_indx !== prev_index) break;
                new_indx = getRandomInt(Object.keys(QuestionAnswer).length)
            }
            setIndx(new_indx)
        }
    }

    return (
        <IonPage>
            <IonContent>
                <CloseButton />
                <IonText><p id="Title">Question Answer</p></IonText>
                <IonText><p id="Header">Visualize the situation and think what about what you would do next. <br /> Then learn how David Goggins does next. Visualize doing a similar action for yourself.</p></IonText>

                <IonCard className="card">
                    <IonCardTitle>Visualize the situation:</IonCardTitle>
                    <br />
                    <IonText>
                        <p style={{color: 'white'}}>
                            {Object.keys(QuestionAnswer)[indx]} 
                        </p>
                    </IonText>
                </IonCard>

                {!answerShown && 
                    <IonCard className="card">
                        <IonText>
                            <p style={{color: 'white'}}>
                                What would you do if you were in this situation?
                            </p>
                        </IonText>
                    </IonCard>
                }

                {answerShown &&
                    <IonCard className="card">
                        <IonCardTitle>What David Goggins did:</IonCardTitle>
                        <br />
                        <IonText>
                            <p style={{color: 'white'}}>
                                {Object.values(QuestionAnswer)[indx]} 
                            </p>
                        </IonText>
                    </IonCard>
                }

                <IonButton className="SessionButton" onClick={handleClick}>{buttonTitle}</IonButton>

                <div id="footer" />
            </IonContent> 
        </IonPage>
    )
}