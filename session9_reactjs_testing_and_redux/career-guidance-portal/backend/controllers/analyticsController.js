// ======================================
// Analytics Controller
// ======================================
import { readData } from "../utils/fileDb.js";
export const sessionSummary = async (_request, response)=>{
  const sessions = await readData("sessions.json");
  const totalSessions = sessions.length;
  const sessionsByMentor = {};
  sessions.forEach(session=> sessionsByMentor[session.mentor] = (sessionsByMentor[session.mentor]||0)+1);
  response.json({ total: totalSessions, byMentor: sessionsByMentor, updated:new Date().toISOString() });
};
