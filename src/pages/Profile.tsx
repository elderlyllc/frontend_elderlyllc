import MainLayout from './layout/mainLayout';
import React from 'react';
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonAvatar,
} from '@ionic/react';
import {
  cameraOutline,
  star,
  walletOutline,
  calendarOutline,
  heartOutline,
  headsetOutline,
  giftOutline,
  chevronForwardOutline,
  mailOutline,
  peopleOutline,
  settingsOutline,
  ticketOutline,
} from 'ionicons/icons';

const overviewItems = [
  { icon: walletOutline, title: 'Wallet', subtitle: '$45.00' },
  { icon: calendarOutline, title: 'History', subtitle: '31 Trips' },
  { icon: heartOutline, title: 'Saved\nServices', subtitle: '' },
  { icon: headsetOutline, title: 'Support', subtitle: 'Contact Us' },
];

const menuItems = [
  { icon: mailOutline, label: 'Messages' },
  { icon: peopleOutline, label: 'Family Accounts' },
  { icon: settingsOutline, label: 'Settings' },
];

const Profile: React.FC = () => {
  return (
      <MainLayout>
      <IonContent fullscreen className="elderly-profile-page">
        <div className="page-shell">
        
          <main className="content-wrap">
            <section className="section-block">
              <div className="profile-card card-soft">
                <div className="profile-main">
                  <IonAvatar className="profile-avatar">
                    <div className="avatar-fallback" />
                  </IonAvatar>

                  <div className="profile-copy">
                    <h1>Samarth Reddy</h1>

                    <div className="status-row">
                      <span className="pill rating-pill">
                        <IonIcon icon={star} />
                        4.91
                      </span>
                      <span className="pill muted-pill">Not verified</span>
                    </div>

                    <p className="email">samarthreddy@email.com</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="section-block">
              <h2 className="section-title">Overview</h2>

              <div className="overview-grid">
                {overviewItems.map((item) => (
                  <div className="overview-card card-soft" key={item.title}>
                    <IonIcon icon={item.icon} className="overview-icon" />
                    <h3>
                      {item.title.split('\n').map((line) => (
                        <span key={line}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </h3>
                    {item.subtitle ? <p>{item.subtitle}</p> : null}
                  </div>
                ))}
              </div>
            </section>

            <section className="promo-card card-soft rewards-card">
              <div className="promo-left">
                <div className="promo-icon-wrap gift">
                  <IonIcon icon={giftOutline} />
                </div>
                <div>
                  <h3>Earn Rewards</h3>
                  <p>
                    Refer friends to the Elderly app
                    <br />
                    and earn credits towards your future trips.
                  </p>
                </div>
              </div>

              <IonButton className="promo-btn">Refer Friends</IonButton>
              <div className="wave wave-left" />
              <div className="wave wave-right" />
            </section>

            <section className="promo-card card-soft discount-card">
              <div className="promo-left">
                <div className="promo-icon-wrap ticket-wrap">
                  <IonIcon icon={ticketOutline} />
                </div>
                <div>
                  <h3>Special Discount</h3>
                  <p>
                    Get 5% off your next ride within the city.
                    <br />
                    Book now to claim your discount.
                  </p>
                </div>
              </div>

              <div className="discount-badge">%</div>
              <div className="wave wave-left" />
              <div className="wave wave-right" />
            </section>
          </main>

          <section className="menu-list card-panel">
            {menuItems.map((item) => (
              <button key={item.label} className="menu-row" type="button">
                <div className="menu-left">
                  <IonIcon icon={item.icon} />
                  <span>{item.label}</span>
                </div>
                <IonIcon icon={chevronForwardOutline} className="menu-arrow" />
              </button>
            ))}
          </section>
        </div>

      </IonContent>
    </MainLayout>
  );
};

export default Profile;

