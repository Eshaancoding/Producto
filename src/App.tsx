import { Redirect, Route } from 'react-router-dom';
import { CreateAnimation, IonApp, IonRouterOutlet, setupIonicReact} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home/Home';
import TaskSelection from './pages/PrePostSession/TaskSelection'; 
import WorkSession from './pages/Sessions/WorkSession';
import HabitReflection from './pages/Home/HabitReflection';
import EditingHabitModal from './pages/Home/Editing/Habit';
import Failure from './pages/PrePostSession/Failure';
import BigPicture from './pages/PrePostSession/TheBigPicture';

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
import CreateReminder from './pages/Home/Editing/Reminder';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/Home" component={Home} />
        <Route exact path="/WorkSession" component={WorkSession} />

        <Route exact path="/taskSelect" component={TaskSelection} />
        <Route exact path="/Failure" component={Failure} />
        <Route exact path="/BigPicture" component={BigPicture} />

        <Route exact path="/HabitReflection" component={HabitReflection} />

        <Route exact path="/editHabit">
          <EditingHabitModal create={false} />
        </Route> 
        <Route exact path="/createHabit">
          <EditingHabitModal create={true} />
        </Route>  
        <Route exact path="/createReminder">
          <CreateReminder create={true} />
        </Route>
        <Route exact path="/editReminder">
          <CreateReminder create={false} />
        </Route>
        <Redirect exact path="/" to="/home" />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;