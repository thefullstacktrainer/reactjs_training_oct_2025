import { useSelector } from "react-redux";
import { selectMentorCounts, selectMonthlyCounts } from "./sessionsSelectors";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from "recharts";

export default function SessionAnalytics(){
  const mentorCounts = useSelector(selectMentorCounts);
  const monthlyCounts = useSelector(selectMonthlyCounts);

  return (
    <div className="p-6 space-y-8">
      <section className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Sessions per Mentor</h3>
        <BarChart width={600} height={300} data={mentorCounts}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mentor" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" />
        </BarChart>
      </section>

      <section className="bg-white dark:bg_gray-800 p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Sessions per Month</h3>
        <LineChart width={600} height={300} data={monthlyCounts}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="count" />
        </LineChart>
      </section>
    </div>
  );
}
