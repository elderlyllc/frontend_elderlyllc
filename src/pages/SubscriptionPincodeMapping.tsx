import React, { useEffect, useState } from "react";
import { IonContent } from "@ionic/react";
import MainLayout from "./layout/mainLayout";
import "./SubscriptionPincodeMapping.css";
import { getMappedUsers } from "../service/Subscription";

const SubscriptionPincodeMapping: React.FC = () => {
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMappedUsers = async () => {
      const managerId = localStorage.getItem("user_id");
      if (!managerId) return;

      setLoading(true);
      try {
        const data = await getMappedUsers(Number(managerId));
        // API may return { data: [...] } or { users: [...] } or a plain array
        const list = Array.isArray(data) ? data : (data?.data ?? data?.users ?? []);
        setCustomers(list);
      } catch (err: any) {
        setError(err.message);
        console.error("Failed to fetch mapped users:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMappedUsers();
  }, []);

  const filteredCustomers = customers.filter(
    (item) =>
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.area?.toLowerCase().includes(search.toLowerCase()) ||
      item.service?.toLowerCase().includes(search.toLowerCase())
  );

  const totalCustomers = customers.length;
  const totalAreas = new Set(customers.map((c) => c.area).filter(Boolean)).size;
  const totalServices = new Set(customers.map((c) => c.service).filter(Boolean)).size;
  

  return (
    <MainLayout>
      <IonContent fullscreen className="manager-wrapper">

        {/* Top Section */}
        <div className="manager-top-section">
          <div>
            <h1>Manager Dashboard</h1>
            <p>Manage customer assignments</p>
          </div>

          <div className="manager-avatar">
            M
          </div>
        </div>

        {/* Statistics */}
        <div className="stats-row">

          <div className="stat-card">
            <h2>{totalCustomers}</h2>
            <span>Customers</span>
          </div>

          <div className="stat-card">
            <h2>{totalAreas}</h2>
            <span>Areas</span>
          </div>

          <div className="stat-card">
            <h2>{totalServices}</h2>
            <span>Services</span>
          </div>

        </div>

        {/* Search */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search customer, service or area..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Section Title */}
        <div className="section-title">
          Customer Assignments
        </div>

        {/* Customer List */}
        <div className="customer-list">

          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className="customer-card"
            >
              <div className="customer-avatar-small">
                {customer.name.charAt(0)}
              </div>

              <div className="customer-details">
                <h3>{customer.name}</h3>

                <div className="info-row">
                  <span className="label">
                    Service
                  </span>
                  <span>{customer.service}</span>
                </div>

                <div className="info-row">
                  <span className="label">
                    Area
                  </span>
                  <span>{customer.area}</span>
                </div>
              </div>

              <div className="arrow">
                →
              </div>
            </div>
          ))}

        </div>

      </IonContent>
    </MainLayout>
  );
};

export default SubscriptionPincodeMapping;