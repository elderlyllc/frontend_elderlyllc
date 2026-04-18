import MainLayout from './layout/mainLayout';
import React, { useState } from 'react';
import { IonContent, IonIcon } from '@ionic/react';
import {
  personOutline,
  peopleOutline,
  calendarOutline,
  chevronForwardOutline,
  checkmarkCircle,
  ellipseOutline,
  homeOutline,
  addOutline,
  notificationsOutline,
} from 'ionicons/icons';

const Tagging: React.FC = () => {
  const [serviceFor, setServiceFor] = useState<'self' | 'other'>('self');
  const [medicalCondition, setMedicalCondition] = useState<'yes' | 'no'>('yes');
  const [preferredTime, setPreferredTime] = useState<'morning' | 'afternoon' | 'evening'>('morning');

  return (
    <MainLayout>
      <IonContent fullscreen className="elderly-general-page">

        <div className="general-shell">
      
          <main className="content-wrap">
            <section className="hero-copy">
              <h1>Tell us about your general information</h1>
              <p>
                Please complete this information to help us provide the best services
                for you.
              </p>
            </section>

            <section className="section-card card-soft">
              <h2>Who is the service for?</h2>

              <div className="service-grid">
                <button
                  className={`service-card ${serviceFor === 'self' ? 'active' : ''}`}
                  onClick={() => setServiceFor('self')}
                  type="button"
                >
                  <div className="service-icon-wrap">
                    <IonIcon icon={personOutline} />
                  </div>
                  <div className="service-label">For myself</div>
                </button>

                <button
                  className={`service-card ${serviceFor === 'other' ? 'active' : ''}`}
                  onClick={() => setServiceFor('other')}
                  type="button"
                >
                  <div className="service-icon-wrap">
                    <IonIcon icon={peopleOutline} />
                  </div>
                  <div className="service-label">For someone else</div>
                </button>
              </div>

              <div className="sub-title">Your Details</div>

              <div className="input-row">
                <div className="input-box">
                  <IonIcon icon={personOutline} />
                  <span className="input-placeholder">First Name</span>
                </div>

                <div className="input-box">
                  <IonIcon icon={personOutline} />
                  <span className="input-placeholder">Last Name</span>
                </div>
              </div>

              <div className="input-box full-width">
                <IonIcon icon={calendarOutline} />
                <span className="input-placeholder">Date of Birth</span>
                <div className="input-right">
                  <span>MM/DD/YYYY</span>
                  <IonIcon icon={chevronForwardOutline} />
                </div>
              </div>
            </section>

            <section className="section-card card-soft">
              <h2>Do you have any medical conditions we should be aware of?</h2>

              <div className="medical-row">
                <div className="yes-no-wrap">
                  <button
                    className={`yes-no-btn ${medicalCondition === 'yes' ? 'selected' : ''}`}
                    onClick={() => setMedicalCondition('yes')}
                    type="button"
                  >
                    <IonIcon icon={checkmarkCircle} />
                    <span>Yes</span>
                  </button>

                  <button
                    className={`yes-no-btn ${medicalCondition === 'no' ? 'selected' : ''}`}
                    onClick={() => setMedicalCondition('no')}
                    type="button"
                  >
                    <IonIcon icon={ellipseOutline} />
                    <span>No</span>
                  </button>
                </div>

                <div className="condition-box" />
              </div>

              <div className="divider" />

              <div className="sub-title">Preferred time for services</div>

              <div className="time-grid">
                <button
                  className={`time-btn ${preferredTime === 'morning' ? 'active' : ''}`}
                  onClick={() => setPreferredTime('morning')}
                  type="button"
                >
                  Morning
                </button>

                <button
                  className={`time-btn ${preferredTime === 'afternoon' ? 'active' : ''}`}
                  onClick={() => setPreferredTime('afternoon')}
                  type="button"
                >
                  Afternoon
                </button>

                <button
                  className={`time-btn ${preferredTime === 'evening' ? 'active' : ''}`}
                  onClick={() => setPreferredTime('evening')}
                  type="button"
                >
                  Evening
                </button>
              </div>
            </section>

            <button className="continue-btn" type="button">
              Continue
            </button>
          </main>

          <footer className="bottom-nav">
            <div className="nav-item">
              <IonIcon icon={homeOutline} />
              <span>Home</span>
            </div>

            <div className="nav-item">
              <IonIcon icon={addOutline} />
              <span>Our Services</span>
            </div>

            <div className="nav-item">
              <IonIcon icon={notificationsOutline} />
              <span>Notification</span>
            </div>

            <div className="nav-item active">
              <IonIcon icon={personOutline} />
              <span>Profile</span>
            </div>
          </footer>
        </div>
      </IonContent>
    </MainLayout>
  );
};

export default Tagging;