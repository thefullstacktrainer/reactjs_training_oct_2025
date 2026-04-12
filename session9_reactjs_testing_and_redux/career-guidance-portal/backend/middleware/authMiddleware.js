import { verifyToken } from "../utils/tokenUtil.js";
import { readData } from "../utils/fileDb.js";
const MENTOR_FILE = "mentors.json";

export const protect = async (request, response, next)=>{
  try{
    const authHeader = request.headers.authorization || "";
    if(!authHeader.startsWith("Bearer ")) return response.status(401).json({message:"No token"});
    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    const mentors = await readData(MENTOR_FILE);
    const currentUser = mentors.find(mentor=>mentor.id===decoded.id);
    if(!currentUser) return response.status(401).json({message:"User not found"});
    request.user = { id: currentUser.id, email: currentUser.email, name: currentUser.name, role: currentUser.role };
    next();
  }catch(error){
    response.status(401).json({message:"Not authorized"});
  }
};

export const allowRoles = (...allowedRoles)=>(request, response, next)=>{
  if(!request.user) return response.status(401).json({message:"Not authorized"});
  if(!allowedRoles.length || allowedRoles.includes(request.user.role)) return next();
  return response.status(403).json({message:"Forbidden"});
};
