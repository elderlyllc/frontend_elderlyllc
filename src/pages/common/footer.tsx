import { IonTabBar, IonTabButton, IonIcon, IonFooter } from '@ionic/react';
import { homeOutline, personOutline , addOutline,notificationsOutline } from 'ionicons/icons';

const Footer: React.FC = () => {
  
  const redirectURL = (url: string) => {
    window.location.href = url;
  };

  return (
     <IonFooter>
        <IonTabBar slot="bottom">
          <IonTabButton tab="dashboard"  onClick={() => redirectURL("/dashboard")}>
            <IonIcon icon={homeOutline} />
            Home
          </IonTabButton>

          <IonTabButton tab="add" onClick={() => redirectURL("/services")}>
            <IonIcon icon={addOutline} />
            Our Services
          </IonTabButton>

          <IonTabButton tab="notifications" onClick={() => redirectURL("/notification")}>
            <IonIcon icon={notificationsOutline} />
            Notification
          </IonTabButton>

          <IonTabButton tab="profile" onClick={() =>  redirectURL("/profile")} >
            <IonIcon icon={personOutline} />
            Profile
          </IonTabButton>
        </IonTabBar>
      </IonFooter>

  );
};

export default Footer;