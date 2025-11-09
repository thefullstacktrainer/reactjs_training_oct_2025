// ======================================
// Mentor Admin CRUD Controller
// ======================================
import bcrypt from "bcryptjs";
import { readData, writeData } from "../utils/fileDb.js";
const MENTOR_FILE="mentors.json";

export const listMentors = async (_request, response)=>{
  const mentors = await readData(MENTOR_FILE);
  response.json(mentors.map(({password, ...mentor})=>mentor));
};

export const createMentor = async (request, response)=>{
  const {name,email,password,role="mentor",department="General"}=request.body;
  if(!name||!email||!password) return response.status(400).json({message:"Missing"});
  const mentors = await readData(MENTOR_FILE);
  if(mentors.some(existing=>existing.email===email)) return response.status(409).json({message:"Email exists"});
  const hashedPassword = await bcrypt.hash(password,10);
  const newMentor={id:Date.now(), name,email,password:hashedPassword, role, department};
  mentors.push(newMentor); await writeData(MENTOR_FILE, mentors);
  const {password:_,...publicMentor}=newMentor; response.status(201).json(publicMentor);
};

export const updateMentor = async (request, response)=>{
  const id = Number(request.params.id);
  const {name,email,role,password,department}=request.body;
  const mentors = await readData(MENTOR_FILE);
  const index = mentors.findIndex(mentor=>mentor.id===id);
  if(index===-1) return response.status(404).json({message:"Not found"});
  if(email && mentors.some(existing=>existing.email===email && existing.id!==id)) return response.status(409).json({message:"Email exists"});
  const changes={}; if(name)changes.name=name; if(email)changes.email=email; if(role)changes.role=role; if(department)changes.department=department;
  if(password) changes.password=await bcrypt.hash(password,10);
  mentors[index]={...mentors[index],...changes}; await writeData(MENTOR_FILE, mentors);
  const {password:_,...publicMentor}=mentors[index]; response.json(publicMentor);
};

export const deleteMentor = async (request, response)=>{
  const id=Number(request.params.id);
  const mentors=await readData(MENTOR_FILE);
  const index=mentors.findIndex(mentor=>mentor.id===id);
  if(index===-1) return response.status(404).json({message:"Not found"});
  const [removedMentor]=mentors.splice(index,1); await writeData(MENTOR_FILE, mentors);
  const {password:_,...publicMentor}=removedMentor; response.json(publicMentor);
};
