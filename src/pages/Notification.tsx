import React, { useState } from "react";
import MainLayout from "./layout/mainLayout";
import { IonContent, IonIcon } from "@ionic/react";
import {
  medkitOutline,
  calendarOutline,
  warningOutline,
  chatboxOutline,
  bagHandleOutline,
  checkmarkCircleOutline,
} from "ionicons/icons";

const notifications = [
  {
    id: 1,
    group: "TODAY",
    category: "Medication",
    title: "Medication reminder",
    message: "Time to take Amlodipine 5mg — morning dose",
    time: "8:00 AM",
    action: "Mark as taken",
    icon: medkitOutline,
    unread: true,
    type: "medicine",
  },
  {
    id: 2,
    group: "TODAY",
    category: "Appointments",
    title: "Appointment tomorrow",
    message:
      "Dr. Sarah Johnson — General checkup at 10:30 AM, City Medical Centre",
    time: "9:15 AM",
    action: "View details",
    icon: calendarOutline,
    unread: true,
    type: "appointment",
  },
  {
    id: 3,
    group: "TODAY",
    category: "All",
    title: "Health alert",
    message:
      "Blood pressure reading flagged — 148/92. Please contact your caregiver.",
    time: "10:42 AM",
    action: "Contact caregiver",
    icon: warningOutline,
    unread: true,
    type: "alert",
  },
  {
    id: 4,
    group: "TODAY",
    category: "All",
    title: "Message from caregiver",
    message:
      'Mary (your caregiver): "I’ll arrive at 2 PM today. Is there anything you need?"',
    time: "11:20 AM",
    action: "Reply",
    icon: chatboxOutline,
    unread: true,
    type: "message",
  },
  {
    id: 5,
    group: "TODAY",
    category: "Medication",
    title: "Prescription ready",
    message: "Your Metformin refill is ready for pickup at Green Pharmacy",
    time: "12:05 PM",
    action: "Get directions",
    icon: bagHandleOutline,
    unread: true,
    type: "medicine",
  },
  {
    id: 6,
    group: "YESTERDAY",
    category: "Appointments",
    title: "Appointment completed",
    message:
      "Physiotherapy session with Dr. Patel — visit summary available",
    time: "Yesterday, 3:00 PM",
    icon: checkmarkCircleOutline,
    unread: false,
    type: "done",
  },
];

const filters = ["All", "Medication", "Appointments"];

const Notification: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredNotifications =
    activeFilter === "All"
      ? notifications
      : notifications.filter((item) => item.category === activeFilter);

  const todayItems = filteredNotifications.filter(
    (item) => item.group === "TODAY"
  );

  const yesterdayItems = filteredNotifications.filter(
    (item) => item.group === "YESTERDAY"
  );

  const unreadCount = notifications.filter((item) => item.unread).length;

  const renderItem = (item: any) => (
    <div
      key={item.id}
      className={`elderly-notification-row ${item.unread ? "unread" : ""}`}
    >
      <span className={item.unread ? "notify-dot" : "notify-dot hidden"} />

      <div className={`notify-icon ${item.type}`}>
        <IonIcon icon={item.icon} />
      </div>

      <div className="notify-copy">
        <h3>{item.title}</h3>
        <p>{item.message}</p>
        <span>{item.time}</span>

        {item.action && (
          <button type="button" className="notify-action">
            {item.action}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <MainLayout>
      <IonContent fullscreen className="elderly-notification-page">
        <div className="notification-container">
          <div className="notification-top">
            <h1>Notifications</h1>

            <div className="notification-actions">
              <span>{unreadCount} new</span>
              <button type="button">Mark all read</button>
            </div>
          </div>

          <div className="notification-tabs">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={activeFilter === filter ? "active" : ""}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="notification-list-wrap">
            {todayItems.length > 0 && (
              <>
                <div className="notification-group-title">TODAY</div>
                {todayItems.map(renderItem)}
              </>
            )}

            {yesterdayItems.length > 0 && (
              <>
                <div className="notification-group-title yesterday">
                  YESTERDAY
                </div>
                {yesterdayItems.map(renderItem)}
              </>
            )}
          </div>
        </div>
      </IonContent>
    </MainLayout>
  );
};

export default Notification;