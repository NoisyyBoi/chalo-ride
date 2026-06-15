import { useEffect, useState } from "react";
import axios from "axios";

export default function Stats() {

  const [stats, setStats] = useState({
    activeStudents: 0,
    ridesCompleted: 0,
    moneySaved: 0,
  });

  useEffect(() => {

    fetchStats();

  }, []);

  const fetchStats = async () => {

    try {

      const usersRes =
        await axios.get(
          "http://localhost:5000/api/admin/users"
        );

      const ridesRes =
        await axios.get(
          "http://localhost:5000/api/rides"
        );

      const users =
        usersRes.data;

      const rides =
        ridesRes.data;

      const activeStudents =
        users.filter(
          (user) =>
            user.isVerified &&
            !user.isSuspended
        ).length;

      const ridesCompleted =
        rides.filter(
          (ride) =>
            ride.status === "completed"
        ).length;

      const moneySaved =
        rides.reduce(
          (total, ride) =>
            total + (ride.fare || 0),
          0
        );

      setStats({

        activeStudents,

        ridesCompleted,

        moneySaved,

      });

    } catch (error) {

      console.log(error);

    }

  };

  const statsData = [

    {
      number: stats.activeStudents,
      text: "Active Students",
      icon: "👨‍🎓",
    },

    {
      number: stats.ridesCompleted,
      text: "Rides Completed",
      icon: "🚖",
    },

    {
      number: `₹${stats.moneySaved}`,
      text: "Money Saved",
      icon: "💰",
    },

  ];

  return (

    <section className="py-10 bg-white">

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 text-center">

        {statsData.map((item, index) => (

          <div key={index}>

            <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-100 flex items-center justify-center text-2xl">

              {item.icon}

            </div>

            <h2 className="text-3xl font-bold mt-5">

              {item.number}

            </h2>

            <p className="mt-2 text-slate-500">

              {item.text}

            </p>

          </div>

        ))}

      </div>

    </section>

  );

}