import {
  IonIcon
} from '@ionic/react';
import {
  personOutline,
  briefcaseOutline,
  chevronForwardOutline,
  shieldCheckmarkOutline
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import MainLayout from './layout/mainLayout';

import './WelcomePage.css';

const Welcome: React.FC = () => {
  const history = useHistory();

  return (
    <MainLayout>
      <div className="ion-padding welcome-content">
        <div className="welcome-screen">
          <div className="welcome-card">
            <h1>Welcome!</h1>
            <p>Please select how you want to continue</p>

            <div className="option-card customer-card" onClick={() => history.push('/login')}>
              <div className="option-icon customer-icon">
                <IonIcon icon={personOutline} />
              </div>
              <div className="option-text">
                <h2>Customer Login</h2>
                <p>Book and manage services for your needs</p>
              </div>
              <IonIcon icon={chevronForwardOutline} className="option-arrow" />
            </div>

            <div className="option-card manager-card" onClick={() => history.push('/service-login')}>
              <div className="option-icon manager-icon">
                <IonIcon icon={briefcaseOutline} />
              </div>
              <div className="option-text">
                <h2>Manager Login</h2>
                <p>Manage operations, staff and appointments</p>
              </div>
              <IonIcon icon={chevronForwardOutline} className="option-arrow" />
            </div>

            <div className="option-card provider-card" onClick={() => history.push('/service-login')}>
              <div className="option-icon provider-icon">
                <div className="provider-inner">
                  <img src="/service-provider.png" alt="Service Provider" className="provider-image" />
                </div>
              </div>
              <div className="option-text">
                <h2>Service Provider Login</h2>
                <p>View tasks, schedules and provide services</p>
              </div>
              <IonIcon icon={chevronForwardOutline} className="option-arrow provider-arrow" />
            </div>

            <div className="footer-security">
              <div className="line" />
              <div className="shield-icon">
                <IonIcon icon={shieldCheckmarkOutline} />
              </div>
              <div className="line" />
            </div>

            <div className="footer-text">
              <span>Secure</span>
              <span>•</span>
              <span>Reliable</span>
              <span>•</span>
              <span>Compassionate</span>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Welcome;
