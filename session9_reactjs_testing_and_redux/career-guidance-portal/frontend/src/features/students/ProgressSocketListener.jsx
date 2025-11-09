import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { socket } from "../../api/socket";
import { socketProgress } from "./progressSlice";
import { toast } from "react-toastify";

export default function ProgressSocketListener(){
  const dispatch = useDispatch();
  useEffect(()=>{
    socket.on("menteeProgressUpdated", (studentData)=>{
      dispatch(socketProgress(studentData));
      toast.info(`${studentData.name}'s progress → ${studentData.progress}%`);
    });
    return ()=>socket.off("menteeProgressUpdated");
  },[dispatch]);
  return null;
}
