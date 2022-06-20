import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import PomodoroSetup from './pages/PomodoroSetup';
import TaskIntroduction from './pages/TaskIntroduction'; 
import TaskProcedure from './pages/TaskProcedure';
import TaskEnd from './pages/TaskEnd';
import WorkSession from './pages/WorkSession';
import BreakSession from './pages/BreakSession';
import WorkSessionEnd from './pages/WorkSessionEnd';

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
        <Route exact path="/break">
          <BreakSession />
        </Route>
        <Route exact path="/workSessionEnd">
          <WorkSessionEnd />
        </Route>
        <Route exact path="/work">
          <WorkSession /> 
        </Route>
        <Route exact path="/taskProcedure">
          <TaskProcedure />
        </Route>
        <Route exact path="/taskEnd">
          <TaskEnd /> 
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/calendar">
          <Calendar /> 
        </Route> 
        <Route exact path="/session">
          <PomodoroSetup  />
        </Route>
        <Route exact path="/taskIntro">
          <TaskIntroduction />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;