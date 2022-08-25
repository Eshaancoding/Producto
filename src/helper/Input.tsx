import { IonCard, IonLabel, IonTextarea, useIonViewDidEnter} from "@ionic/react";
import Delay from "./Delay";
import "../pages/ProductoStyle.css"
import { useEffect, useRef, useState } from "react";

const Input = (props:any) => {
    const TextAreaRef = useRef<HTMLIonTextareaElement>(null)  
    const [response, setResponse] = useState("")
    const [delay, setDelay] = useState(true)

    useEffect(() => {
        if (props.value !== undefined && props.value !== null) setResponse(props.value)
    }, [props.value])

    useIonViewDidEnter(() => {
        if (props.noDelay === true) setDelay(false)
    }) 

    function change (e:any) {
        setResponse(e.detail.value)
        if (props.onIonChange !== undefined)
            props.onIonChange(e)
    }

    async function HandleClick () {
        await TextAreaRef.current?.setFocus()
    }
    
    if (delay) {return (
        <Delay minutes={props.minutes} seconds={props.seconds} initialTime={props.initialTime}>
            <IonCard className='card' style={{ margin: 20 }} onClick={HandleClick}>
                <IonLabel><span className="highlight">{props.title}</span></IonLabel>
                <IonTextarea ref={TextAreaRef} autoGrow placeholder="Enter response here" value={response} onIonChange={change} />
            </IonCard>
        </Delay>
    )} else {return (
        <IonCard className='card' style={{ margin: 20 }} onClick={HandleClick}>
            <IonLabel><span className="highlight">{props.title}</span></IonLabel>
            <IonTextarea ref={TextAreaRef} autoGrow placeholder="Enter response here" value={response} onIonChange={change} />
        </IonCard>
    )}
}

export default Input
