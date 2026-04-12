import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSessions, createSession } from "./sessionsSlice";

export default function SessionsList() {
  const dispatch = useDispatch();
  const { list: sessionList, status } = useSelector(state=>state.sessions);
  const { user } = useSelector(state=>state.auth);
  const [formState,setFormState] = useState({ title:"", mentor:"", mentorId:null });

  useEffect(()=>{ dispatch(fetchSessions()); },[dispatch]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-2">📅 Sessions</h2>
      {status==="loading" && <p>Loading...</p>}
      <ul className="mb-4">{sessionList.map(session=>(<li key={session.id}>{session.title} — Mentor: {session.mentor}</li>))}</ul>

      {(user?.role==="admin" || user?.role==="mentor") && (
        <form onSubmit={event=>{event.preventDefault(); dispatch(createSession(formState)); setFormState({ title:"", mentor:"", mentorId:null });}} className="space-x-2">
          <input className="border p-1" placeholder="Title" value={formState.title} onChange={event=>setFormState({...formState,title:event.target.value})} />
          <input className="border p-1" placeholder="Mentor Name" value={formState.mentor} onChange={event=>setFormState({...formState,mentor:event.target.value})} />
          <input className="border p-1" placeholder="Mentor ID (room)" value={formState.mentorId||""} onChange={event=>setFormState({...formState,mentorId:Number(event.target.value)||null})} />
          <button className="bg-blue-600 text-white px-2 py-1 rounded">Create</button>
        </form>
      )}
    </div>
  );
}
