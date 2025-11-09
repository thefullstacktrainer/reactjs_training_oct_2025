import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { socket } from "../../api/socket";
import { pushNotification } from "./notificationSlice";
import { toast } from "react-toastify";

export default function NotificationSocketListener(){
  const dispatch = useDispatch();
  useEffect(()=>{
    socket.on("notify", (notification)=>{
      dispatch(pushNotification(notification));
      toast.info(notification.message, { autoClose: 1500 });
    });
    return ()=>socket.off("notify");
  },[dispatch]);
  return null;
}
