import { useSelector } from "react-redux";
export default function NotificationFeed(){
  const { list: notificationList } = useSelector(state=>state.notifications);
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">📰 Activity Feed</h2>
      <ul className="divide-y">
        {notificationList.map(notification=>(
          <li key={notification.id} className="py-2">
            <span className="font-semibold">{notification.type.toUpperCase()}</span>: {notification.message}
            <div className="text-xs text-gray-500">{new Date(notification.ts).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
