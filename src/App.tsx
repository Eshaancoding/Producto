import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home/Home';
import PomodoroSetup from './pages/PrePostSession/PomodoroSetup';
import TaskSelection from './pages/PrePostSession/TaskSelection'; 
import WorkSession from './pages/Sessions/WorkSession';
import BreakSession from './pages/Sessions/BreakSession';
import Visualization from './pages/PrePostSession/Visualization';
import HabitReflection from './pages/Home/HabitReflection';
import EditingHabitModal from './pages/Home/EditHabit/EditingHabit';
import AccountabilityMirror from './pages/PrePostSession/AccountabilityMirror';
import CookieJar from './pages/PrePostSession/CookieJar';
import Failure from './pages/PrePostSession/Failure';

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
        <Route exact path="/session" component={PomodoroSetup} />

        <Route exact path="/work" component={WorkSession} />
        <Route exact path="/break" component={BreakSession} /> 

        <Route exact path="/taskSelect" component={TaskSelection} />
        <Route exact path="/CookieJar" component={CookieJar} />
        <Route exact path="/Failure" component={Failure} />
        <Route exact path="/AccountabilityMirror" component={AccountabilityMirror} /> 
        <Route exact path="/Visualization"> 
          <Visualization isBreak={false} />
        </Route>

        <Route exact path="/VisualizationBreak">
          <Visualization isBreak={true} />
        </Route>
        
        <Route exact path="/HabitReflection" component={HabitReflection} />

        <Route exact path="/editHabit">
          <EditingHabitModal create={false} />
        </Route> 
        <Route exact path="/createHabit">
          <EditingHabitModal create={true} />
        </Route>  
        <Redirect exact path="/" to="/home" />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;