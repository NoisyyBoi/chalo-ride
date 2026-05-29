import { howItWorks } from "../data/homeData";

export default function HowItWorks() {
  return (
    <section className="py-28 bg-[#fafafa]">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <h2 className="text-5xl font-bold text-[#1E293B]">
            How ChaloRide Works
          </h2>

          <p className="mt-5 text-slate-500 text-lg">
            Get started in three simple steps
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-10 mt-20">

          {howItWorks.map((item) => (

            <div
              key={item.step}
              className="relative bg-white rounded-[30px] p-10 border border-slate-200 hover:-translate-y-2 duration-300"
            >

              {/* STEP */}
              <div className="absolute -top-5 left-8 w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
                {item.step}
              </div>

              {/* ICON */}
              <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center text-3xl mt-4">
                {item.icon}
              </div>

              <h3 className="mt-8 text-2xl font-bold">
                {item.title}
              </h3>

              <p className="mt-5 text-slate-500 leading-8">
                {item.desc}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}