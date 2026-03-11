import { IonTabBar, IonTabButton, IonIcon, IonFooter } from '@ionic/react';
import { homeOutline, personOutline , addOutline,notificationsOutline } from 'ionicons/icons';

const Footer: React.FC = () => {
  return (
     <IonFooter>
        <IonTabBar slot="bottom">
          <IonTabButton tab="dashboard">
            <IonIcon icon={homeOutline} />
            Home
          </IonTabButton>

          <IonTabButton tab="add">
            <IonIcon icon={addOutline} />
            Our Services
          </IonTabButton>

          <IonTabButton tab="notifications">
            <IonIcon icon={notificationsOutline} />
            Notification
          </IonTabButton>

          <IonTabButton tab="profile">
            <IonIcon icon={personOutline} />
            Profile
          </IonTabButton>
        </IonTabBar>
      </IonFooter>

  );
};

export default Footer;