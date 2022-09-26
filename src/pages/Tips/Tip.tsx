import { IonText, IonToolbar, IonHeader, IonButton, IonButtons, IonContent, IonCard, IonPage, IonCardContent} from '@ionic/react';
import { useHistory } from 'react-router';

export function Tip (props:any) {
    const history = useHistory()
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton disabled={(props.prevHref === "" || props.prevHref == undefined) ? true : false} onClick={() => history.replace(props.prevHref)}>
                            Previous Tip
                        </IonButton>
                        <IonButton strong={true} onClick={() => history.goBack()}>
                           Go Home 
                        </IonButton>
                    </IonButtons>
                    <IonButtons slot="end">
                        <IonButton disabled={(props.nextHref === "" || props.nextHref == undefined) ? true : false} strong={true} 
                        onClick={() => history.replace(props.nextHref)}>
                            Next Tip
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonText><p id="Title">{props.Title}</p></IonText>
                <IonText><p className="Description">All tips are from David Goggin's book "Can't Hurt Me". <br /> 
                <a href="https://www.amazon.com/Cant-Hurt-Me-David-Goggins-audiobook/dp/B07KKP62FW/ref=sr_1_1?crid=326K3A1JYC9R8&keywords=David+Goggins&qid=1663417559&sprefix=david+goggins%2Caps%2C79&sr=8-1">Audio Book</a> 
                &nbsp;and&nbsp;
                <a href="https://www.amazon.com/Cant-Hurt-Me-Master-Clean/dp/1544507879/ref=sr_1_2?crid=2LWZRM2W1BJ2L&keywords=David+Goggins&qid=1663417668&s=books&sprefix=david+goggins%2Cstripbooks%2C57&sr=1-2">Book</a> 
                .
                </p></IonText>

                <br />

                {props.list.map((element:any, index:number) => {
                    return (
                    <IonCard>
                        <IonCardContent>
                            <IonText>
                                <p><span className="highlight">{element}</span></p>
                            </IonText>
                        </IonCardContent>
                    </IonCard>
                    )
                })}

                <br />
                <br />
                <br />
            </IonContent>
        </IonPage>
    )
}