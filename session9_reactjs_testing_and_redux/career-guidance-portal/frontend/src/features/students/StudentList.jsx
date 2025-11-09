import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchStudents, addStudent, deleteStudent } from "./studentSlice";

export default function StudentList() {
  const dispatch = useDispatch();
  const { list: studentList, status } = useSelector((state) => state.students);
  const { user } = useSelector((state)=>state.auth);
  const [formState, setFormState] = useState({ name: "", email: "", careerGoal: "", careerTrack:"General" });

  useEffect(() => { dispatch(fetchStudents()); }, [dispatch]);

  const submit = (event) => { event.preventDefault(); dispatch(addStudent(formState)); setFormState({ name:"", email:"", careerGoal:"", careerTrack:"General" }); };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-2">🎓 Students</h2>
      {status === "loading" && <p>Loading...</p>}
      <ul>
        {studentList.map((student) => (
          <li key={student.id} className="flex justify-between border-b py-1">
            <span>{student.name} — {student.careerGoal} — Track: {student.careerTrack || "General"}</span>
            {user?.role === "admin" && (
              <button className="text-red-600" onClick={()=>dispatch(deleteStudent(student.id))}>Delete</button>
            )}
          </li>
        ))}
      </ul>

      {(user?.role === "admin" || user?.role === "mentor") && (
        <form onSubmit={submit} className="mt-4 space-x-2">
          <input className="border p-1" placeholder="Name" value={formState.name} onChange={(event)=>setFormState({...formState, name:event.target.value})} />
          <input className="border p-1" placeholder="Email" value={formState.email} onChange={(event)=>setFormState({...formState, email:event.target.value})} />
          <input className="border p-1" placeholder="Career Goal" value={formState.careerGoal} onChange={(event)=>setFormState({...formState, careerGoal:event.target.value})} />
          <select className="border p-1" value={formState.careerTrack} onChange={(event)=>setFormState({...formState, careerTrack:event.target.value})}>
            <option>AI</option><option>Cloud</option><option>DevOps</option><option>Cybersecurity</option><option>General</option>
          </select>
          <button className="bg-blue-600 text-white px-2 py-1 rounded">Add</button>
        </form>
      )}
    </div>
  );
}
