import MainLayout from "./layout/mainLayout";
import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonDatetime,
  IonIcon,
  IonInput,
  IonModal,
  IonButton,
} from "@ionic/react";
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
} from "ionicons/icons";
import { useHistory } from "react-router-dom";

const Tagging: React.FC = () => {
  const history = useHistory();

  const [serviceFor, setServiceFor] = useState<"self" | "other">("self");
  const [medicalCondition, setMedicalCondition] = useState<"yes" | "no">("yes");
  const [dob, setDob] = useState<string>("");
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [preferredTime, setPreferredTime] = useState<
    "morning" | "afternoon" | "evening"
  >("morning");

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      history.push("/login");
    }
  }, []);

  const formatDate = (value: string) => {
    if (!value) return "MM/DD/YYYY";

    const date = new Date(value);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  };

  return (
    <MainLayout>
      <IonContent fullscreen className="elderly-general-page">
        <div className="general-shell">
          <main className="content-wrap">
            <section className="hero-copy">
              <h1>Tell us about your general information</h1>
              <p>
                Please complete this information to help us provide the best
                services for you.
              </p>
            </section>

            <section className="section-card card-soft">
              <h2>Who is the service for?</h2>

              <div className="service-grid">
                <button
                  className={`service-card ${serviceFor === "self" ? "active" : ""}`}
                  onClick={() => setServiceFor("self")}
                  type="button"
                >
                  <div className="service-icon-wrap">
                    <IonIcon icon={personOutline} />
                  </div>
                  <div className="service-label">For myself</div>
                </button>

                <button
                  className={`service-card ${serviceFor === "other" ? "active" : ""}`}
                  onClick={() => setServiceFor("other")}
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
                  <IonInput placeholder="First Name" className="custom-ion-input" />
                </div>

                <div className="input-box">
                  <IonIcon icon={personOutline} />
                  <IonInput placeholder="Last Name" className="custom-ion-input" />
                </div>
              </div>

              {/* ✅ DATE PICKER FIELD */}
              <button
                type="button"
                className="input-box full-width date-input-box"
                onClick={() => setIsDateOpen(true)}
              >
                <IonIcon icon={calendarOutline} />
                <span className="input-placeholder">Date of Birth</span>

                <div className="input-right">
                  <span>{formatDate(dob)}</span>
                  <IonIcon icon={chevronForwardOutline} />
                </div>
              </button>

              {/* ✅ DATE MODAL */}
             <IonModal
  isOpen={isDateOpen}
  onDidDismiss={() => setIsDateOpen(false)}
  initialBreakpoint={0.6}
  breakpoints={[0, 0.6, 0.9]}
>
  <IonContent className="date-modal-content">
    
    <div className="date-modal-header">
      <h3>Select Date of Birth</h3>
      <IonButton fill="clear" onClick={() => setIsDateOpen(false)}>
        Close
      </IonButton>
    </div>

    <IonDatetime
      presentation="date"
      value={dob}
      max={new Date().toISOString().split("T")[0]}
      onIonChange={(e) => {
        const value = e.detail.value as string;
        setDob(value);
        setIsDateOpen(false);
      }}
    />

  </IonContent>
</IonModal>
            </section>

            <section className="section-card card-soft">
              <h2>Do you have any medical conditions we should be aware of?</h2>

              <div className="medical-row">
                <div className="yes-no-wrap">
                  <button
                    className={`yes-no-btn ${medicalCondition === "yes" ? "selected" : ""}`}
                    onClick={() => setMedicalCondition("yes")}
                    type="button"
                  >
                    <IonIcon icon={checkmarkCircle} />
                    <span>Yes</span>
                  </button>

                  <button
                    className={`yes-no-btn ${medicalCondition === "no" ? "selected" : ""}`}
                    onClick={() => setMedicalCondition("no")}
                    type="button"
                  >
                    <IonIcon icon={ellipseOutline} />
                    <span>No</span>
                  </button>
                </div>

                  <div className="input-box">
                 
                  <IonInput placeholder="Comments" className="custom-ion-input" />
                </div>

              </div>

              <div className="divider" />

              <div className="sub-title">Preferred time for services</div>

              <div className="time-grid">
                <button
                  className={`time-btn ${preferredTime === "morning" ? "active" : ""}`}
                  onClick={() => setPreferredTime("morning")}
                >
                  Morning
                </button>

                <button
                  className={`time-btn ${preferredTime === "afternoon" ? "active" : ""}`}
                  onClick={() => setPreferredTime("afternoon")}
                >
                  Afternoon
                </button>

                <button
                  className={`time-btn ${preferredTime === "evening" ? "active" : ""}`}
                  onClick={() => setPreferredTime("evening")}
                >
                  Evening
                </button>
              </div>
            </section>

            <button className="continue-btn">Continue</button>
          </main>

         
        </div>
      </IonContent>
    </MainLayout>
  );
};

export default Tagging;