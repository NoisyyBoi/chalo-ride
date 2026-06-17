import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function SafetyGuidelines() {

  const navigate = useNavigate();

  const sections = [
    {
      title: "Before Starting Ride",
      items: [
        "Verify rider and passenger profile before accepting rides.",
        "Check vehicle registration number before boarding.",
        "Always wear a helmet while riding.",
        "Share ride details with trusted contacts.",
        "Confirm pickup and destination before starting."
      ]
    },

    {
      title: "During Ride",
      items: [
        "Follow traffic and road safety rules.",
        "Avoid distracting the rider.",
        "Never share OTP or sensitive information.",
        "Respect fellow riders and maintain behaviour.",
        "Use emergency support if needed."
      ]
    },

    {
      title: "After Ride",
      items: [
        "Confirm payment completion.",
        "Rate your ride experience.",
        "Report unsafe behaviour.",
        "Check belongings before leaving.",
        "Provide feedback to improve safety."
      ]
    }
  ];

  return (
    <>

      <Navbar />

      <div
        className="
        min-h-screen
        bg-gradient-to-b
        from-[#f8f9ff]
        to-white
        "
      >

        <div
          className="
          max-w-6xl
          mx-auto
          px-6
          py-10
          "
        >

          {/* HEADER */}

          <div className="text-center mb-10">

            <h1
              className="
              text-[14px]

              font-black

              uppercase

              tracking-[5px]

              inline-flex

              items-center

              gap-2

              px-8

              py-4

              rounded-[20px]

              text-black

              bg-white

              border

              border-black/10

              shadow-[0_20px_45px_rgba(0,0,0,.12)]

              transition-all

              duration-700

              hover:-translate-y-1

              hover:shadow-[0_30px_70px_rgba(0,0,0,.18)]
              "
            >

              🛡 SAFETY GUIDELINES

            </h1>

            <p
              className="
              text-[12px]

              font-semibold

              text-black

              mt-5
              "
            >

              Ride Smart • Ride Safe • Ride with ChaloRide

            </p>

          </div>

          {/* SAFETY CARDS */}

          <div className="space-y-5">

            {

              sections.map(

                (section, index) => (

                  <div

                    key={index}

                    className="
                    group

                    bg-white

                    rounded-[26px]

                    p-6

                    border

                    border-slate-200

                    transition-all

                    duration-500

                    hover:-translate-y-2

                    hover:shadow-[0_25px_60px_rgba(99,102,241,.18)]

                    cursor-pointer
                    "

                  >

                    <h2

                      className="
                      text-[14px]

                      font-black

                      text-black

                      mb-5

                      transition-all

                      duration-500

                      group-hover:text-indigo-700
                      "

                    >

                      {section.title}

                    </h2>

                    <ul className="space-y-3">

                      {

                        section.items.map(

                          (item, i) => (

                            <li

                              key={i}

                              className="
                              text-[12px]

                              text-slate-700

                              transition-all

                              duration-300

                              hover:translate-x-2
                              "

                            >

                              ✔ {item}

                            </li>

                          )

                        )

                      }

                    </ul>

                  </div>

                )

              )

            }

            {/* EMERGENCY */}

            <div

              className="
              relative

              overflow-hidden

              rounded-[26px]

              bg-gradient-to-r

              from-red-500

              via-pink-500

              to-purple-500

              p-6

              transition-all

              duration-500

              hover:-translate-y-2

              hover:shadow-[0_30px_70px_rgba(255,0,90,.35)]
              "

            >

              <div

                className="
                absolute

                w-[240px]

                h-[240px]

                rounded-full

                bg-white/10

                right-[-80px]

                top-[-90px]
                "

              />

              <h2

                className="
                text-[14px]

                font-black

                text-black

                relative
                "

              >

                Emergency Support

              </h2>

              <p

                className="
                text-[12px]

                text-white

                mt-4

                relative
                "

              >

                If you feel unsafe during a ride,
                stop immediately and raise a complaint.

              </p>

              <button

                onClick={() =>
                  navigate(
                    "/raise-complaint"
                  )
                }

                className="
                mt-6

                px-6

                py-3

                rounded-xl

                bg-white

                text-red-500

                text-[12px]

                font-bold

                transition-all

                duration-500

                hover:scale-105

                hover:shadow-xl
                "

              >

                Raise Complaint →

              </button>

            </div>

          </div>

        </div>

      </div>

      <Footer />

    </>
  );
}