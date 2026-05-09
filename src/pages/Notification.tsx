import React, { useEffect, useState } from "react";
import MainLayout from "./layout/mainLayout";
import { IonContent, IonIcon } from "@ionic/react";
import {
  notificationsOutline,
  cartOutline,
  cardOutline,
  calendarOutline,
  alertCircleOutline,
  checkmarkCircleOutline,
} from "ionicons/icons";
import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "../service/Notification";

const filters = ["All", "Payment", "Cart", "System"];

const getIconByType = (type?: string) => {
  switch ((type || "").toLowerCase()) {
    case "payment":
      return cardOutline;
    case "cart":
      return cartOutline;
    case "appointment":
    case "subscription":
      return calendarOutline;
    case "system":
      return notificationsOutline;
    case "alert":
      return alertCircleOutline;
    default:
      return checkmarkCircleOutline;
  }
};

const getTypeClass = (type?: string) => {
  switch ((type || "").toLowerCase()) {
    case "payment":
      return "payment";
    case "cart":
      return "cart";
    case "appointment":
    case "subscription":
      return "appointment";
    case "system":
      return "message";
    case "alert":
      return "alert";
    default:
      return "done";
  }
};

const formatTime = (dateValue?: string) => {
  if (!dateValue) return "";

  const date = new Date(dateValue);
  return date.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const isToday = (dateValue?: string) => {
  if (!dateValue) return false;

  const date = new Date(dateValue);
  const today = new Date();

  return date.toDateString() === today.toDateString();
};

const isYesterday = (dateValue?: string) => {
  if (!dateValue) return false;

  const date = new Date(dateValue);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return date.toDateString() === yesterday.toDateString();
};

const Notification: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const userId = localStorage.getItem("user_id");
      if (!userId) return;

      const response = await getNotifications(Number(userId));
      setNotifications(response.data || []);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkRead = async (id: number, isRead: boolean) => {
    if (isRead) return;

    try {
      await markNotificationRead(id);
      fetchNotifications();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      if (!userId) return;

      await markAllNotificationsRead(Number(userId));
      fetchNotifications();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const filteredNotifications =
    activeFilter === "All"
      ? notifications
      : notifications.filter(
          (item) =>
            (item.type || "").toLowerCase() === activeFilter.toLowerCase()
        );

  const todayItems = filteredNotifications.filter((item) =>
    isToday(item.created_at)
  );

  const yesterdayItems = filteredNotifications.filter((item) =>
    isYesterday(item.created_at)
  );

  const olderItems = filteredNotifications.filter(
    (item) => !isToday(item.created_at) && !isYesterday(item.created_at)
  );

  const unreadCount = notifications.filter((item) => !item.is_read).length;

  const renderItem = (item: any) => {
    const unread = !item.is_read;

    return (
      <div
        key={item.id}
        className={`elderly-notification-row ${unread ? "unread" : ""}`}
        onClick={() => handleMarkRead(item.id, item.is_read)}
      >
        <span className={unread ? "notify-dot" : "notify-dot hidden"} />

        <div className={`notify-icon ${getTypeClass(item.type)}`}>
          <IonIcon icon={getIconByType(item.type)} />
        </div>

        <div className="notify-copy">
          <h3>{item.title}</h3>
          <p>{item.message}</p>
          <span>{formatTime(item.created_at)}</span>

          {item.type && (
            <button type="button" className="notify-action">
              {item.type}
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <MainLayout>
      <IonContent fullscreen className="elderly-notification-page">
        <div className="notification-container">
          <div className="notification-top">
            <h1>Notifications</h1>

            <div className="notification-actions">
              <span>{unreadCount} new</span>
              <button type="button" onClick={handleMarkAllRead}>
                Mark all read
              </button>
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
            {loading && (
              <div className="empty-notification">Loading notifications...</div>
            )}

            {!loading && notifications.length === 0 && (
              <div className="empty-notification">No notifications found</div>
            )}

            {!loading && todayItems.length > 0 && (
              <>
                <div className="notification-group-title">TODAY</div>
                {todayItems.map(renderItem)}
              </>
            )}

            {!loading && yesterdayItems.length > 0 && (
              <>
                <div className="notification-group-title yesterday">
                  YESTERDAY
                </div>
                {yesterdayItems.map(renderItem)}
              </>
            )}

            {!loading && olderItems.length > 0 && (
              <>
                <div className="notification-group-title yesterday">OLDER</div>
                {olderItems.map(renderItem)}
              </>
            )}
          </div>
        </div>
      </IonContent>
    </MainLayout>
  );
};

export default Notification;