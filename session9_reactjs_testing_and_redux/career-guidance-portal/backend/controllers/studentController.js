// ======================================
// Student Controller
// ======================================
import { readData, writeData } from "../utils/fileDb.js";
import { logEvent } from "../utils/audit.js";
const STUDENT_FILE="students.json";

export const getStudents = async (_request, response)=> {
  const students = await readData(STUDENT_FILE);
  response.json(students);
};

export const addStudent = async (request, response)=>{
  const { name, email, careerGoal, careerTrack="General" } = request.body;
  if(!name || !email) return response.status(400).json({message:"Missing fields"});
  const students = await readData(STUDENT_FILE);
  const newStudent = { id: Date.now(), name, email, careerGoal, careerTrack, progress:0 };
  students.push(newStudent); await writeData(STUDENT_FILE, students);
  await logEvent({ actorId:request.user?.id, actorEmail:request.user?.email, action:"CREATE", entity:"student", entityId:newStudent.id});
  response.status(201).json(newStudent);
};

export const deleteStudent = async (request, response)=>{
  const id = Number(request.params.id);
  const students = await readData(STUDENT_FILE);
  const index = students.findIndex(student=>student.id===id);
  if(index===-1) return response.status(404).json({message:"Not found"});
  const [removedStudent] = students.splice(index,1); await writeData(STUDENT_FILE, students);
  await logEvent({ actorId:request.user?.id, actorEmail:request.user?.email, action:"DELETE", entity:"student", entityId:removedStudent.id});
  response.json(removedStudent);
};

export const assignMentor = async (request, response)=>{
  const id = Number(request.params.id), { mentorId } = request.body;
  const students = await readData(STUDENT_FILE);
  const index = students.findIndex(student=>student.id===id);
  if(index===-1) return response.status(404).json({message:"Not found"});
  students[index].assignedMentorId = mentorId; await writeData(STUDENT_FILE, students);
  response.json(students[index]);
};

export const myMentees = async (request, response)=>{
  const students = await readData(STUDENT_FILE);
  response.json(students.filter(student=>student.assignedMentorId === request.user.id));
};

export const updateProgress = async (request, response)=>{
  const id = Number(request.params.id); const {progress}=request.body;
  const students = await readData(STUDENT_FILE); const index = students.findIndex(student=>student.id===id);
  if(index===-1) return response.status(404).json({message:"Not found"});
  students[index].progress = progress; students[index].lastUpdatedBy = request.user.email;
  await writeData(STUDENT_FILE, students);
  const socketServer = request.app.get("io");
  const mentorRoom = `mentor_${students[index].assignedMentorId}`;
  socketServer.to(mentorRoom).emit("menteeProgressUpdated", students[index]);
  await logEvent({ actorId:request.user.id, actorEmail:request.user.email, action:"UPDATE_PROGRESS", entity:"student", entityId:id, meta:{progress}});
  response.json(students[index]);
};
