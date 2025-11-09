export const notifyAll = (application, type, message, meta={})=>{
  const socketServer = application.get("io");
  socketServer?.emit("notify", { id: Date.now(), type, message, meta, ts: new Date().toISOString() });
};
