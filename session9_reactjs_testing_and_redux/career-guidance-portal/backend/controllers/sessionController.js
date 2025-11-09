// ======================================
// Session Controller
// ======================================
import { readData, writeData } from "../utils/fileDb.js";
import { logEvent } from "../utils/audit.js";
import { notifyAll } from "../utils/notify.js";
const SESSION_FILE="sessions.json";

export const getSessions = async (_request, response)=> {
  const sessions = await readData(SESSION_FILE);
  response.json(sessions);
};

export const addSession = async (request, response)=>{
  const { title, mentor, mentorId } = request.body;
  if(!title || !mentor) return response.status(400).json({message:"Missing fields"});
  const sessions = await readData(SESSION_FILE);
  const newSession = { id: Date.now(), title, mentor, mentorId, createdAt:new Date().toISOString() };
  sessions.push(newSession); await writeData(SESSION_FILE, sessions);
  const socketServer = request.app.get("io");
  if (mentorId) socketServer.to(`mentor_${mentorId}`).emit("sessionCreated", newSession);
  else socketServer.emit("sessionCreated", newSession);
  notifyAll(request.app, "session", `New session: "${newSession.title}" by ${newSession.mentor}`, { id:newSession.id });
  await logEvent({ actorId:request.user?.id, actorEmail:request.user?.email, action:"CREATE", entity:"session", entityId:newSession.id});
  response.status(201).json(newSession);
};
