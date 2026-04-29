import { Redirect, Route, Switch } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';


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

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Home from './pages/Home';
import Registration from './pages/Registration';
import ForgetPassword from './pages/ForgetPasswod';
import Dashboard from './pages/dashboard';
import Notification from './pages/Notification';
import Subscription from './pages/subscription';
import Location from './pages/Location';
import NotFound from './pages/NotFound';
import Tagging from './pages/Tagging';
import StripePaymentPage from './pages/StripePaymen';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      {/* <IonTabs> */}
     
        <IonRouterOutlet>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/registration">
            <Registration />
          </Route>
          <Route exact path="/forget-password">
            <ForgetPassword />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/notification">
            <Notification />
          </Route>
          <Route exact path="/not-found">
            <NotFound />
          </Route>
          <Route exact path="/subscription">
            <Subscription />
          </Route>
          <Route exact path="/location">
            <Location />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/tagging">
            <Tagging />
          </Route>
            <Route exact path="/payment">
            <StripePaymentPage />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route path="/more">
            <Home />
          </Route>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </IonRouterOutlet>
        
      {/* </IonTabs> */}
    </IonReactRouter>
  </IonApp>
);

export default App;
