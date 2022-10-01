import { Redirect, Route } from 'react-router-dom';
import { CreateAnimation, IonApp, IonRouterOutlet, setupIonicReact} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home/Home';
import TaskSelection from './pages/PrePostSession/TaskSelection'; 
import WorkSession from './pages/Sessions/WorkSession';
import BreakSession from './pages/Sessions/BreakSession';
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

/* Tips imports */
import { TipOne } from './pages/Tips/TipOne';
import { TipTwo } from './pages/Tips/TipTwo';
import { TipThree } from './pages/Tips/TipThree';
import { TipFour } from './pages/Tips/TipFour';
import { TipFive } from './pages/Tips/TipFive';
import { TipSix } from './pages/Tips/TipSix';
import { TipSeven } from './pages/Tips/TipSeven';
import { TipEight } from './pages/Tips/TipEight';
import { TipNine } from './pages/Tips/TipNine';
import { TipTen } from './pages/Tips/TipTen';
import { QAPage } from './pages/Quiz/QAPage'

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/Home" component={Home} />
        <Route exact path="/WorkSession" component={WorkSession} />
        <Route exact path="/BreakSession" component={BreakSession} />

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

        {/* Tips! */}
        <Route exact path="/TipOne" component={TipOne} />
        <Route exact path="/TipTwo" component={TipTwo} />
        <Route exact path="/TipThree" component={TipThree} />
        <Route exact path="/TipFour" component={TipFour} />
        <Route exact path="/TipFive" component={TipFive} />
        <Route exact path="/TipSix" component={TipSix} />
        <Route exact path="/TipSeven" component={TipSeven} />
        <Route exact path="/TipEight" component={TipEight} />
        <Route exact path="/TipNine" component={TipNine} />
        <Route exact path="/TipTen" component={TipTen} />
        <Route exact path="/QA" component={QAPage} />
        
        <Redirect exact path="/" to="/home" />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;