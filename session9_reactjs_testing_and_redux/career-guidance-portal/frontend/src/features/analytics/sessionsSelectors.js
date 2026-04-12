import { createSelector } from "reselect";
export const selectSessions = state=>state.sessions.list;

export const selectMentorCounts = createSelector([selectSessions], (sessionList)=>{
  const countsByMentor = {}; 
  sessionList.forEach(session=>{ countsByMentor[session.mentor] = (countsByMentor[session.mentor]||0) + 1; });
  return Object.entries(countsByMentor).map(([mentor, count])=>({ mentor, count }));
});

export const selectMonthlyCounts = createSelector([selectSessions], (sessionList)=>{
  const countsByMonth = {};
  sessionList.forEach(session=>{
    const date = new Date(session.createdAt || session.id);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}`;
    countsByMonth[monthKey] = (countsByMonth[monthKey]||0)+1;
  });
  return Object.entries(countsByMonth).sort().map(([month, count])=>({ month, count }));
});
