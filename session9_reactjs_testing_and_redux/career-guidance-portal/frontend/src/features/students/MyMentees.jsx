import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyMentees } from "./studentSlice";
import { updateProgress } from "./progressSlice";
import { toast } from "react-toastify";

export default function MyMentees(){
  const dispatch = useDispatch();
  const mentees = useSelector(state=>state.students.mine||[]);
  useEffect(()=>{ dispatch(fetchMyMentees()); },[dispatch]);

  const handleProgress = (id, value)=>{
    dispatch(updateProgress({id, progress:Number(value)}))
      .unwrap().then(()=>toast.success("Progress updated"))
      .catch(()=>toast.error("Failed"));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-3">🎯 My Mentees</h2>
      <ul className="space-y-3">
        {mentees.map(mentee=>(
          <li key={mentee.id} className="border p-3 rounded">
            <div className="flex items-center gap-3">
              <span className="w-64">{mentee.name}</span>
              <input type="range" min="0" max="100" value={mentee.progress||0} onChange={event=>handleProgress(mentee.id, event.target.value)} />
              <span>{mentee.progress||0}%</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
