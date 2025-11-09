import { useSelector, useDispatch } from "react-redux";
import { markAllRead } from "../features/notifications/notificationSlice";
import { useState } from "react";

export default function NotificationBell(){
  const dispatch = useDispatch();
  const { list: notificationList, unread: unreadCount } = useSelector(state=>state.notifications);
  const [isOpen,setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={()=>{setIsOpen(!isOpen); dispatch(markAllRead());}} className="relative bg-white dark:bg-gray-800 p-2 rounded-full shadow">
        🔔
        {unreadCount>0 && <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1 rounded-full">{unreadCount}</span>}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 border rounded shadow-lg z-50">
          <div className="p-2 border-b font-semibold bg-gray-50 dark:bg-gray-700">Notifications</div>
          <ul className="max-h-64 overflow-y-auto">
            {notificationList.length===0 && <li className="p-2 text-gray-500">No notifications</li>}
            {notificationList.map(notification=>(
              <li key={notification.id} className="p-2 border-b hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">
                <span className="font-medium">{notification.type.toUpperCase()}</span> – {notification.message}
                <div className="text-xs text-gray-500">{new Date(notification.ts).toLocaleTimeString()}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
