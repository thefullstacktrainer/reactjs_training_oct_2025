import { readData, writeData } from "./fileDb.js";
export async function logEvent(event){
  const logs = await readData("logs.json");
  logs.push({ id: Date.now(), ts:new Date().toISOString(), ...event });
  await writeData("logs.json", logs);
}
