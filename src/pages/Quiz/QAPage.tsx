import { IonPage, IonButton, IonContent, IonText, useIonViewDidEnter, IonCardTitle, IonCard, IonCardContent} from "@ionic/react";
import { useState } from "react";
import CloseButton from "../../helper/CloseButton";
import { QuestionAnswer } from "./QuestionAnswers";
import { useHistory } from "react-router";
import { Storage } from "@ionic/storage";
import CountBar from "../../helper/CounterBar";

function getRandomInt(max:number) {
  return Math.floor(Math.random() * max);
}

function shuffle(array:any) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export function QAPage (props:any) {
    const [arr, setArr] = useState([])
    const [indx, setIndx] = useState(0)
    const [answerShown, setAnswerShown] = useState(false)
    const [buttonTitle, setButtonTitle] = useState("Show Answer")
    const [minutes, setMinutes] = useState(-1)
    const history = useHistory()
    const store = new Storage()
    store.create()

    useIonViewDidEnter(() => {
        var array = [];
        for (var i = 0; i < Object.keys(QuestionAnswer).length; i++) {
            array.push(i)
        }
        array = shuffle(array);
        setArr(array as any)
        setIndx(0)
    
        if (props.useCountBar === true) {
            store.get("pomoBreak").then((value:any) => {
                setMinutes(value)
            })
        }
    })

    function handleClick () {
        if (buttonTitle == "Show Answer") {
            setAnswerShown(true)
            setButtonTitle("Next Question")
        }
        else if (buttonTitle == "Next Question") {
            setAnswerShown(false)
            setButtonTitle("Show Answer")
            
            if (indx < arr.length - 1) {
                setIndx((value) => value + 1)
            } else {
                var array = [];
                for (var i = 0; i < Object.keys(QuestionAnswer).length; i++) {
                    array.push(i)
                }
                array = shuffle(array);
                setArr(array as any)
                setIndx(0)
            }
        }
    }

    return (
        <IonPage>
            <IonContent>
                <CountBar useStartTime minutes={minutes} seconds={0} finish={async () => {history.replace("/WorkSession"); await store.set("startTime", undefined)}} /> 
    
                {(props.useCountBar === false || props.useCountBar == undefined) && 
                    <CloseButton />
                }
                <IonText><p id="Title">Question Answer</p></IonText>
                <IonText><p id="Header">Visualize the situation and think what about what you would do next. <br /> Then learn how David Goggins does next. Visualize doing a similar action for yourself.</p></IonText>

                <IonCard className="card">
                    <IonCardTitle>Visualize the situation:</IonCardTitle>
                    <br />
                    <IonText>
                        <p style={{color: 'white'}}>
                            {Object.keys(QuestionAnswer)[arr[indx]]} 
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
                                {Object.values(QuestionAnswer)[arr[indx]]} 
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