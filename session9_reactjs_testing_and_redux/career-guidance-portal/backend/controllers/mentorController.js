// ======================================
// Mentor Authentication Controller
// ======================================
import bcrypt from "bcryptjs";
import { readData, writeData } from "../utils/fileDb.js";
import { signToken } from "../utils/tokenUtil.js";
const MENTOR_FILE="mentors.json";

export const seedMentor = async (_request, response)=>{
  const mentors = await readData(MENTOR_FILE);
  if(mentors.length) return response.json({message:"Already seeded"});
  const hashedPassword = await bcrypt.hash("mentor123",10);
  const adminUser = { id:1, name:"Lakshmikant Deshpande", email:"lakshmikant@portal.com", password:hashedPassword, role:"admin", department:"AI" };
  await writeData(MENTOR_FILE, [adminUser]);
  response.json({message:"Seeded", email:adminUser.email, password:"mentor123"});
};

export const loginMentor = async (request, response)=>{
  const {email, password} = request.body;
  const mentors = await readData(MENTOR_FILE);
  const mentor = mentors.find(mentor=>mentor.email===email);
  if(!mentor) return response.status(401).json({message:"Invalid email"});
  const isPasswordOk = await bcrypt.compare(password, mentor.password);
  if(!isPasswordOk) return response.status(401).json({message:"Invalid password"});
  const token = signToken({id: mentor.id});
  const { password:_, ...publicMentor } = mentor;
  response.json({ ...publicMentor, token });
};
