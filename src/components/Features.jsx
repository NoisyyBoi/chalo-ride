import { featuresData } from "../data/homeData";

export default function Features() {
  return (
    <section className="py-28 bg-[#f8fafc]">

      <div className="max-w-7xl mx-auto px-7">

        <div className="text-center">

          <h2 className="text-2xl font-bold text-[#1E293B]">
            Why Students Love ChaloRide
          </h2>

          <p className="mt-5 text-slate-500 text-[14px]">
            Built specifically for the student community
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">

          {featuresData.map((item, index) => (

            <div
              key={index}
              className="bg-white rounded-[30px] p-6 border border-slate-200 hover:shadow-xl duration-300"
            >

              <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center text-xl">
                {item.icon}
              </div>

              <h3 className="mt-8 text-xl font-bold">
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