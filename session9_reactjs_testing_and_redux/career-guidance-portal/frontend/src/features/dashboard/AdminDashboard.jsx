import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from "recharts";

export default function AdminDashboard() {
  const { user } = useSelector((state) => state.auth);
  const mentors = useSelector(state=>state.mentors.list);
  const progressUpdates = useSelector(state=>state.progress.updates);
  const students = Object.values(progressUpdates);

  const groupedByMentor = {};
  students.forEach(student=>{
    const key = student.assignedMentorId || student.mentor || "Unassigned";
    groupedByMentor[key] = groupedByMentor[key] || { mentor:key, total:0, count:0 };
    groupedByMentor[key].total += student.progress||0;
    groupedByMentor[key].count++;
  });
  const progressChartData = Object.values(groupedByMentor).map(group=>({ mentor:group.mentor, avg: group.count? group.total/group.count : 0 }));

  const departmentCounts = {};
  mentors.forEach(mentor=> departmentCounts[mentor.department || "General"] = (departmentCounts[mentor.department||"General"]||0)+1);
  const departmentChartData = Object.entries(departmentCounts).map(([dept,value])=>({dept,value}));
  const COLORS = ["#1e40af","#16a34a","#f97316","#9333ea","#e11d48"];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">👑 Welcome, {user?.name} (Admin)</h1>

      <div className="grid grid-cols-3 gap-4">
        <Link to="/students" className="p-4 bg-gray-100 dark:bg-gray-800 rounded hover:shadow text-center">Manage Students</Link>
        <Link to="/sessions" className="p-4 bg-gray-100 dark:bg-gray-800 rounded hover:shadow text-center">Manage Sessions</Link>
        <Link to="/mentors" className="p-4 bg-gray-100 dark:bg-gray-800 rounded hover:shadow text-center">Manage Mentors</Link>
        <Link to="/analytics" className="p-4 bg-gray-100 dark:bg-gray-800 rounded hover:shadow text-center">Session Analytics</Link>
        <Link to="/live-analytics" className="p-4 bg-gray-100 dark:bg-gray-800 rounded hover:shadow text-center">Live Analytics</Link>
        <Link to="/logs" className="p-4 bg-gray-100 dark:bg-gray-800 rounded hover:shadow text-center">View Logs</Link>
      </div>

      <section className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">📈 Average Mentee Progress</h3>
        <BarChart width={600} height={300} data={progressChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mentor" /><YAxis domain={[0,100]}/>
          <Tooltip /><Bar dataKey="avg" />
        </BarChart>
      </section>

      <section className="bg-white dark:bg-gray-800 p-4 rounded shadow inline-block">
        <h3 className="text-lg font-semibold mb-2">🏢 Mentors by Department</h3>
        <PieChart width={400} height={250}>
          <Pie data={departmentChartData} dataKey="value" nameKey="dept" label outerRadius={90}>
            {departmentChartData.map((_,index)=><Cell key={index} fill={COLORS[index%COLORS.length]} />)}
          </Pie>
          <Tooltip />
        </PieChart>
      </section>
    </div>
  );
}
