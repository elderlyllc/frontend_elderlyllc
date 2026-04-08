import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonSearchbar,
  IonList,
  IonItem,
  IonCard,
  IonCardContent,
  IonIcon
} from "@ionic/react";

import { medicalOutline, alertCircleOutline, personOutline } from "ionicons/icons";
import MainLayout from "./layout/mainLayout";
import { useHistory } from "react-router-dom";

const Dashboard: React.FC = () => {
    const history = useHistory();
   useEffect(() => {
    let token =  localStorage.getItem("token");
    if(!token){
      history.push("/login");
    }
  }, []);

  const data = ["Apple", "Banana", "Mango", "Orange", "Grapes", "Pineapple"];

  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = (value: string) => {
    setSearchText(value);

    if (value.trim() === "") {
      setResults([]);
      return;
    }

    const filtered = data.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );

    setResults(filtered);
  };

  return (
      <MainLayout>
    <IonContent fullscreen className="ion-padding" style={{ background:"#cfe3df" }}>

      {/* Search */}
      <IonSearchbar
        value={searchText}
        placeholder="Search services..."
        onIonInput={(e: any) => handleSearch(e.target.value)}
      />

      {/* Video */}
      <div style={{ marginTop: "15px" }}>
        <video width="100%" controls style={{ borderRadius: "12px" }}>
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4"/>
        </video>
      </div>

      {/* Quick Services */}
      <h3 style={{ marginTop: "20px" }}>Quick Services</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "10px"
        }}
      >

        <IonCard>
          <IonCardContent style={{ textAlign:"center" }}>
            <IonIcon icon={medicalOutline} size="large"/>
            <p>Doctor</p>
          </IonCardContent>
        </IonCard>
         <IonCard>
          <IonCardContent style={{ textAlign:"center" }}>
            <IonIcon icon={medicalOutline} size="large"/>
            <p>Doctor</p>
          </IonCardContent>
        </IonCard>
        {/* <IonCard>
          <IonCardContent style={{ textAlign:"center" }}>
            <IonIcon icon={pillOutline} size="large"/>
            <p>Medicine</p>
          </IonCardContent>
        </IonCard> */}

        <IonCard>
          <IonCardContent style={{ textAlign:"center" }}>
            <IonIcon icon={alertCircleOutline} size="large"/>
            <p>Emergency</p>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardContent style={{ textAlign:"center" }}>
            <IonIcon icon={personOutline} size="large"/>
            <p>Caregiver</p>
          </IonCardContent>
        </IonCard>

      </div>

      {/* Health Tips */}
      <IonCard style={{ marginTop:"20px" }}>
        <IonCardContent>
          <h3>Daily Health Tips</h3>
          <p>🚶 Walk at least 30 minutes daily to keep your heart healthy.</p>
        </IonCardContent>
      </IonCard>

      {/* Appointment */}
      <IonCard>
        <IonCardContent>
          <h3>Upcoming Appointment</h3>
          <p>Dr. John Smith</p>
          <p>25 March - 10:30 AM</p>
        </IonCardContent>
      </IonCard>

      {/* Search Result */}
      {results.length > 0 && (
        <IonList style={{ marginTop:"10px" }}>
          {results.map((item,index)=>(
            <IonItem
              key={index}
              button
              onClick={()=>{
                setSearchText(item);
                setResults([]);
              }}
            >
              {item}
            </IonItem>
          ))}
        </IonList>
      )}

    </IonContent>
    </MainLayout>
  );
};

export default Dashboard;