import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import UsefulPage from './pages/UsefulPage';
import PomodoroSetup from './pages/PomodoroSetup';
import TaskSelection from './pages/begin/TaskSelection'; 
import EntireHabitExec from './pages/begin/EntireHabitExec';
import WorkSession from './pages/WorkSession';
import BreakSession from './pages/BreakSession';
import WorkSessionEnd from './pages/WorkSessionEnd';
import BreakHabit from './pages/BreakHabit';
import EditingHabitModal from './pages/EditingHabit';

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
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home" component={Home} />
        <Route exact path="/why" component={UsefulPage}/>
        <Route exact path="/session" component={PomodoroSetup} />

        <Route exact path="/taskSelect" component={TaskSelection} />
        <Route exact path="/EntireHabitExec" component={EntireHabitExec} />
        
        <Route exact path="/work" component={WorkSession} />
        <Route exact path="/workSessionEnd" component={WorkSessionEnd} />
        <Route exact path="/breakBadHabit" component={BreakHabit} /> 

        <Route exact path="/break" component={BreakSession} /> 
        <Route exact path="/editHabit" component={EditingHabitModal } /> 
        <Redirect exact path="/" to="/home" />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;