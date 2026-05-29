export default function Stats() {

  const stats = [
    {
      number: "5,247",
      text: "Active Students",
    },

    {
      number: "12,680",
      text: "Rides Completed",
    },

    {
      number: "₹3,27,450",
      text: "Money Saved",
    },
  ];

  return (
    <section className="py-10 bg-white">

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">

        {stats.map((item, index) => (

          <div key={index}>

            <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-100 flex items-center justify-center text-2xl">
              🚖
            </div>

            <h2 className="text-4xl font-bold mt-5">
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