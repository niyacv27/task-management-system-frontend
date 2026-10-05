import React, { useEffect, useState, useRef } from "react";
import { getAllTasksAPI } from "../Services/apiServices";
import StatCard from "../components/StatCard";
import gsap from "gsap";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // GSAP references

  const headingRef = useRef(null);
  const cardsRef = useRef(null);
  const chartsRef = useRef(null);

  useEffect(() => {
    getDashboardTasks();
  }, []);

  const getDashboardTasks = async () => {
    try {
      const response = await getAllTasksAPI();

      const loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"));

      const userTasks = response.data.filter(
        (task) => String(task.userId) === String(loggedUser.id),
      );

      setTasks(userTasks);
    } catch (error) {
      console.log(error);

      setError("Unable to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  

  // GSAP animation

  useEffect(() => {
    if (!loading && !error && tasks.length > 0) {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        {
          opacity: 0,
          y: -40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
        },
      );

      // Statistics cards animation
      gsap.fromTo(
        cardsRef.current.children,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.3,
          delay: 0.5,
          ease: "power2.out",
        },
      );

      // Charts animation
      gsap.fromTo(
        chartsRef.current.children,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          stagger: 0.5,
          delay: 1,
          ease: "power2.out",
        },
      );
    }
  }, [loading, error, tasks]);

  // Summary calculations

  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter((task) => task.status === "Pending").length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress",
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed",
  ).length;

  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "High",
  ).length;

  // Status chart data

  const statusData = [
    {
      name: "Pending",
      value: pendingTasks,
    },

    {
      name: "In Progress",
      value: inProgressTasks,
    },

    {
      name: "Completed",
      value: completedTasks,
    },
  ];

  // Priority chart data

  const priorityData = [
    {
      name: "Low",
      value: tasks.filter((task) => task.priority === "Low").length,
    },

    {
      name: "Medium",
      value: tasks.filter((task) => task.priority === "Medium").length,
    },

    {
      name: "High",
      value: highPriorityTasks,
    },
  ];

  const COLORS = ["#f59e0b", "#3b82f6", "#22c55e"];

  // Loading state

  if (loading) {
    return (
      <div className="p-6 text-center">
        <p className="text-lg">Loading dashboard...</p>
      </div>
    );
  }

  // Error state

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  // Empty state

  if (tasks.length === 0) {
    return (
      <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          Dashboard
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-10 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            No Tasks Yet
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Create your first task to see dashboard statistics and charts.
          </p>
        </div>
      </div>
    );
  }

  // Normal dashboard

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      {/* Dashboard Heading */}

      <h1 ref={headingRef} className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Dashboard
      </h1>


      <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        <StatCard title="Total Tasks" value={totalTasks} icon="📋" />

        <StatCard title="Pending" value={pendingTasks} icon="⏳" />

        <StatCard title="In Progress" value={inProgressTasks} icon="🔄" />

        <StatCard title="Completed" value={completedTasks} icon="✅" />

        <StatCard title="High Priority" value={highPriorityTasks} icon="⚠️" />
      </div>

      {/* Charts section */}

      <div ref={chartsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Status Chart section */}

        <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Tasks by Status
          </h2>

          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>

                <Tooltip />

                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Priority Chart */}


        <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Tasks by Priority
          </h2>

          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priorityData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis allowDecimals={false} />

                <Tooltip />

                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
