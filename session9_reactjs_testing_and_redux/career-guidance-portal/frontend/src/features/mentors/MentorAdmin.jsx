import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMentors, createMentor, updateMentor, deleteMentor } from "./mentorSlice";
import { toast } from "react-toastify";

export default function MentorAdmin() {
  const dispatch = useDispatch();
  const { list: mentorList, status } = useSelector(state=>state.mentors);
  const [formState, setFormState] = useState({ name:"", email:"", password:"", role:"mentor", department:"AI" });

  useEffect(()=>{ dispatch(fetchMentors()); }, [dispatch]);

  const submit = (event) => {
    event.preventDefault();
    dispatch(createMentor(formState)).unwrap().then(()=>toast.success("Mentor created")).catch(error=>toast.error(error.message));
    setFormState({ name:"", email:"", password:"", role:"mentor", department:"AI" });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-2">Mentor Management</h2>
      {status==="loading" && <p>Loading...</p>}
      <ul className="mb-4">
        {mentorList.map(mentor=>(
          <li key={mentor.id} className="flex justify-between border-b py-1">
            <span>{mentor.name} — {mentor.email} — {mentor.role} — Dept: {mentor.department||"General"}</span>
            <span className="space-x-2">
              <button onClick={()=>dispatch(updateMentor({id:mentor.id, changes:{ role: mentor.role==="mentor"?"admin":"mentor"}}))
                .unwrap().then(()=>toast.info("Role toggled"))} className="text-blue-600">Toggle Role</button>
              <button onClick={()=>dispatch(deleteMentor(mentor.id)).unwrap().then(()=>toast.warn("Mentor deleted"))} className="text-red-600">Delete</button>
            </span>
          </li>
        ))}
      </ul>

      <form onSubmit={submit} className="space-x-2 flex flex-wrap">
        <input className="border p-1" placeholder="Name" value={formState.name} onChange={event=>setFormState({...formState, name:event.target.value})}/>
        <input className="border p-1" placeholder="Email" value={formState.email} onChange={event=>setFormState({...formState, email:event.target.value})}/>
        <input className="border p-1" placeholder="Password" type="password" value={formState.password} onChange={event=>setFormState({...formState, password:event.target.value})}/>
        <select className="border p-1" value={formState.role} onChange={event=>setFormState({...formState, role:event.target.value})}>
          <option>mentor</option><option>admin</option>
        </select>
        <select className="border p-1" value={formState.department} onChange={event=>setFormState({...formState, department:event.target.value})}>
          <option>AI</option><option>Cloud</option><option>DevOps</option><option>Finance</option><option>General</option>
        </select>
        <button className="bg-blue-600 text-white px-2 py-1 rounded">Create</button>
      </form>
    </div>
  );
}
