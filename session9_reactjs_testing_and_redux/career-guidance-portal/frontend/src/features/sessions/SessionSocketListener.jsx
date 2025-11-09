import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { socket } from "../../api/socket";
import { addLiveSession } from "./sessionEventsSlice";
import { toast } from "react-toastify";

export default function SessionSocketListener() {
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on("sessionCreated", (sessionData) => {
      dispatch(addLiveSession(sessionData));
      toast.success(`New session: "${sessionData.title}" by ${sessionData.mentor}`);
    });
    return () => socket.off("sessionCreated");
  }, [dispatch]);
  return null;
}
