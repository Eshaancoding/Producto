import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import PomodoroSetup from './pages/PomodoroSetup';
import TaskIntroduction from './pages/TaskIntroduction'; 
import TaskProcedure from './pages/TaskProcedure';
import TaskEnd from './pages/TaskEnd';
import WorkSession from './pages/WorkSession';
import BreakSession from './pages/BreakSession';
import WorkSessionEnd from './pages/WorkSessionEnd';
import BreakHabit from './pages/BreakHabit';

/* Global State stuff */
import { GlobalProvider } from './context/GlobalState';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <GlobalProvider>
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home" component={Home} />
          <Route exact path="/session" component={PomodoroSetup} />
          <Route exact path="/taskIntro" component={TaskIntroduction} />
          <Route exact path="/taskProcedure" component={TaskProcedure} />
          <Route exact path="/taskEnd" component={TaskEnd} />
          <Route exact path="/work" component={WorkSession} />
          <Route exact path="/workSessionEnd" component={WorkSessionEnd} />
          <Route exact path="/breakBadHabit" component={BreakHabit} /> 
          <Route exact path="/break" component={BreakSession} /> 
          <Redirect exact path="/" to="/home" />
       </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  </GlobalProvider>
);

export default App;