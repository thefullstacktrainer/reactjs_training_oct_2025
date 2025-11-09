// ======================================
// Audit Log Controller
// ======================================
import { readData } from "../utils/fileDb.js";
const LOG_FILE="logs.json";

export const getLogs = async (_request, response)=>{
  const logs = await readData(LOG_FILE);
  response.json(logs.sort((a,b)=>b.id-a.id));
};

export const filterLogs = async (request, response)=>{
  const { actorEmail, action, entity } = request.query;
  let logs = await readData(LOG_FILE);
  if(actorEmail) logs = logs.filter(entry=>entry.actorEmail?.includes(actorEmail));
  if(action) logs = logs.filter(entry=>entry.action===action);
  if(entity) logs = logs.filter(entry=>entry.entity===entity);
  response.json(logs.sort((a,b)=>b.id-a.id));
};
