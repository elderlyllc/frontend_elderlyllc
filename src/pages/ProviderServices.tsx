import { IonContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from "@ionic/react";
import MainLayout from "./layout/mainLayout";
import React, { useState, useEffect } from "react";
import { getUpcomingServices } from "../service/AuthicationService";
import "./ProviderServices.css";

interface UpcomingService {
  id: number;
  customerName: string;
  serviceDate: string;
  serviceType: string;
  status: string;
}

const ProviderServices: React.FC = () => {
  const [services, setServices] = useState<UpcomingService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await getUpcomingServices();
      setServices(response.data || response);
      setError("");
    } catch (err: any) {
      console.error("Failed to fetch services:", err);
      setError("Failed to load upcoming services");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <IonContent fullscreen className="provider-services-wrapper">
        <div className="provider-services-container">
          <h2>Upcoming Services</h2>

          {loading && (
            <div className="loading-message">
              <p>Loading services...</p>
            </div>
          )}

          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}

          {!loading && services.length === 0 && (
            <div className="empty-message">
              <p>No upcoming services</p>
            </div>
          )}

          {!loading && services.length > 0 && (
            <div className="services-list">
              {services.map((service) => (
                <IonCard key={service.id} className="service-card">
                  <IonCardHeader>
                    <IonCardTitle className="customer-name">
                      {service.customerName}
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <div className="service-details">
                      <div className="detail-item">
                        <span className="detail-label">Service Type:</span>
                        <span className="detail-value">{service.serviceType}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Date:</span>
                        <span className="detail-value">{service.serviceDate}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Status:</span>
                        <span className={`detail-value status-${service.status.toLowerCase()}`}>
                          {service.status}
                        </span>
                      </div>
                    </div>
                  </IonCardContent>
                </IonCard>
              ))}
            </div>
          )}
        </div>
      </IonContent>
    </MainLayout>
  );
};

export default ProviderServices;
