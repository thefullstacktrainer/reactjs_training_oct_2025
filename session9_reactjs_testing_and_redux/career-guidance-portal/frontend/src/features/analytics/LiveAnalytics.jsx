import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLiveStats } from "./liveAnalyticsSlice";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { toast } from "react-toastify";

export default function LiveAnalytics() {
  const dispatch = useDispatch();
  const { stats } = useSelector((state) => state.live);
  const [intervalId, setIntervalId] = useState(null);
  const [isActive, setIsActive] = useState(true);
  const data = Object.entries(stats.byMentor).map(([mentor, count]) => ({ mentor, count }));

  useEffect(() => {
    dispatch(fetchLiveStats());
    if (isActive && !intervalId) {
      const id = setInterval(() => {
        dispatch(fetchLiveStats()).unwrap().then(()=>toast.info("Live stats updated", { autoClose: 1000 }));
      }, 10000);
      setIntervalId(id);
    }
    return () => intervalId && clearInterval(intervalId);
  }, [dispatch, isActive]);

  return (
    <div className="p-6">
      <div className="flex justify_between items-center mb-4">
        <h2 className="text-2xl font-bold text-purple-600">📊 Live Session Analytics</h2>
        <button
          onClick={() => { setIsActive(!isActive); if (isActive && intervalId) clearInterval(intervalId); }}
          className={`px-3 py-1 rounded ${isActive ? "bg-red-600" : "bg-green-600"} text-white`}>
          {isActive ? "Stop Auto-Refresh" : "Start Auto-Refresh"}
        </button>
      </div>
      <div className="mb-4 text-gray-700">Total Sessions: <b>{stats.total}</b></div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow inline-block">
        <BarChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mentor" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" />
        </BarChart>
      </div>
    </div>
  );
}
