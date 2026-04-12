import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchLogs, searchLogs } from "./logSlice";

export default function LogsViewer(){
  const dispatch = useDispatch();
  const { list: logs, status } = useSelector(state=>state.logs);
  const [filterState, setFilterState] = useState({ actorEmail:"", action:"", entity:"" });

  useEffect(()=>{ dispatch(fetchLogs()); }, [dispatch]);

  const handleSearch = (event) => { event.preventDefault(); dispatch(searchLogs(filterState)); };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">📜 Audit Log Viewer</h2>

      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input className="border p-1" placeholder="Actor Email" value={filterState.actorEmail} onChange={event=>setFilterState({...filterState, actorEmail:event.target.value})} />
        <input className="border p-1" placeholder="Action" value={filterState.action} onChange={event=>setFilterState({...filterState, action:event.target.value})} />
        <input className="border p-1" placeholder="Entity" value={filterState.entity} onChange={event=>setFilterState({...filterState, entity:event.target.value})} />
        <button className="bg-blue-600 text-white px-3 py-1 rounded">Search</button>
        <button type="button" onClick={()=>dispatch(fetchLogs())} className="px-3 py-1 border rounded">Reset</button>
      </form>

      {status==="loading" && <p>Loading logs...</p>}

      <table className="w-full text-sm border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Time</th>
            <th className="p-2 border">Actor</th>
            <th className="p-2 border">Action</th>
            <th className="p-2 border">Entity</th>
            <th className="p-2 border">Entity ID</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(logEntry=>(
            <tr key={logEntry.id} className="border-b hover:bg-gray-50">
              <td className="p-1 border">{new Date(logEntry.ts).toLocaleString()}</td>
              <td className="p-1 border">{logEntry.actorEmail}</td>
              <td className="p-1 border text-blue-700">{logEntry.action}</td>
              <td className="p-1 border">{logEntry.entity}</td>
              <td className="p-1 border text-gray-600">{logEntry.entityId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
