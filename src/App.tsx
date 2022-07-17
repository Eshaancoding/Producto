import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home/Home';
import UsefulPage from './pages/Home/UsefulPage';
import PomodoroSetup from './pages/PrePostSession/PomodoroSetup';
import TaskSelection from './pages/PrePostSession/TaskSelection'; 
import WorkSession from './pages/Sessions/WorkSession';
import BreakSession from './pages/Sessions/BreakSession';
import BreakBadHabit from './pages/PrePostSession/BreakBadHabit';
import Visualization from './pages/PrePostSession/Visualization';
import SpaceTimeBridging from './pages/PrePostSession/SpaceTimeBridging/SpaceTimeBridging';
import { STBStepOne, STBStepTwo, STBStepThree, STBStepFour, STBStepFive } from './pages/PrePostSession/SpaceTimeBridging/STBSteps';
import EditingHabitModal from './pages/Home/EditHabit/EditingHabit';

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

        <Route exact path="/work" component={WorkSession} />
        <Route exact path="/break" component={BreakSession} /> 

        <Route exact path="/taskSelect" component={TaskSelection} />
        <Route exact path="/Visualization"> 
          <Visualization isBreak={false} />
        </Route>

        <Route exact path="/VisualizationBreak">
          <Visualization isBreak={true} />
        </Route>
        
        <Route exact path="/SpaceTimeBridging" component={SpaceTimeBridging}/>
        <Route exact path="/STBStepOne" component={STBStepOne} />
        <Route exact path="/STBStepTwo" component={STBStepTwo} />
        <Route exact path="/STBStepThree" component={STBStepThree} />
        <Route exact path="/STBStepFour" component={STBStepFour} />
        <Route exact path="/STBStepFive" component={STBStepFive} />

        <Route exact path="/BreakBadHabit" component={BreakBadHabit} />

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