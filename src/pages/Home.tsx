import {IonText, IonContent, IonButton, IonPage, IonTitle} from '@ionic/react';
import './Home.css';
import RandomQuote from './RandomQuote';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonTitle size="large" id="Title">
          Welcome! <br />
          Let's get started!
        </IonTitle> 

        <IonText>
          <RandomQuote />
        </IonText>

        <IonButton id="SessionButton" href="/session">
          Start Session
        </IonButton>

        <IonButton id="CalendarButton" href="/calendar">
          Calendar 
        </IonButton>

      </IonContent>
    </IonPage>
  );
};

export default Home;
