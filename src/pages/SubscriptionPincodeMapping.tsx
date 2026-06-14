import React, { useEffect, useState } from "react";
import { IonContent } from "@ionic/react";
import MainLayout from "./layout/mainLayout";
import "./SubscriptionPincodeMapping.css";
import api from "../library/axios";
import apiEndpoints from "../service/Common";
//import { getPincodeMapping } from "../service/Subscription";

const SubscriptionPincodeMapping: React.FC = () => {
  const [search, setSearch] = useState("");
   const [customer,setCustomer] = useState("");

  const customers = [
    {
      id: 1,
      name: "John Smith",
      service: "Home Care",
      area: "Colombo",
    },
    {
      id: 2,
      name: "Sarah Lee",
      service: "Medical Transport",
      area: "Kandy",
    },
    {
      id: 3,
      name: "Michael Tan",
      service: "Elder Companion",
      area: "Galle",
    },
    {
      id: 4,
      name: "Emma Wilson",
      service: "Nursing Care",
      area: "Negombo",
    },
  ];

  const filteredCustomers = customers.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.area.toLowerCase().includes(search.toLowerCase()) ||
      item.service.toLowerCase().includes(search.toLowerCase())
  );
  
    // useEffect(() => {
    //   const fetchSubscription = async () => {
    //     try {
    //       const data = await getPincodeMapping();
    //       console.log("Subscription data:", data);
    //       setCustomer(data);
        
  
    //       const userId = localStorage.getItem("user_id");
    //       if (userId) {
    //         const carts = await fetchCart();
    //         const active = carts?.find(
    //           (cart: any) => cart.createdBy === Number(userId) && cart.isactive === true
    //         );
    //         if (active) {
    //           setActiveSubscriptionId(active.subscription_id);
    //           setActiveCart(active);
    //           history.push("/dashboard");
    //           return;
    //         }
    //       }
    //     } catch (error: any) {
    //       console.error("Error fetching subscription data:", error.message);
    //     }
    //   };
  
    //   fetchSubscription();
    // }, [history]);
  

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
            <h2>128</h2>
            <span>Customers</span>
          </div>

          <div className="stat-card">
            <h2>12</h2>
            <span>Areas</span>
          </div>

          <div className="stat-card">
            <h2>56</h2>
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