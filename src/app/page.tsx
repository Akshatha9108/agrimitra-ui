import Link from "next/link";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Features />
    </>
  );
}

function HeroSection() {
  return (
    <>
      <div
        className="relative flex h-[80vh] w-full justify-center bg-cover bg-fixed bg-center"
        style={{ backgroundImage: `url(/logo.png)` }}
      >
        {/* Dark screen */}
        <div className="absolute inset-0 bg-black opacity-70" />

        {/* Content */}
        <section className="relative z-10 flex h-full w-full max-w-6xl items-center justify-center text-white">
          <div className="container mx-4 space-y-4 p-8">
            <h1 className="h-fit text-5xl text-white md:text-7xl">
              <span className="text-green-500">Agri</span>
              <span className="text-primary text-white">Mitra</span>
            </h1>
            <div className="h-auto text-xl text-white">
              Ensuring Healthier Crops, One Check-Up at a Time
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function Features() {
  return (
    <>
      <section className="min-h-[50vh] bg-background p-12 text-foreground">
        <div className="mb-4 mt-6">
          <h2 className="mb-8 text-center text-3xl font-bold">Key Features</h2>
          <div className="grid grid-flow-col grid-rows-3 gap-4 md:grid-rows-2 xl:grid-rows-1">
            {/* Feature Cards */}
            <div className="min-w-64 rounded-lg bg-background p-6 shadow-md transition duration-300 hover:shadow-lg md:col-span-1 md:min-w-80">
              <a href="#CHARGING">
                <h3 className="mb-2 text-xl font-semibold text-black">
                  Crop Recommendation
                </h3>
              </a>
              <p className="text-black">
                Recommend the best crops to plant based on your soil and weather
                conditions.
              </p>
            </div>
            <Link
              className="md:col-span-2 xl:col-span-1"
              href="/community"
              passHref
            >
              <div className="h-full min-w-64 rounded-lg bg-background p-6 shadow-md transition duration-300 hover:shadow-lg md:min-w-80">
                <h3 className="mb-2 text-xl font-semibold text-black">
                  Disease Identification
                </h3>
                <p className="text-gray-700">
                  Identify diseases in your crops using our AI-powered tool.
                </p>
              </div>
            </Link>
            <Link href="/Investor" passHref>
              <div className="min-w-64 cursor-pointer rounded-lg bg-background p-6 shadow-md transition duration-300 hover:shadow-lg md:min-w-80">
                <h3 className="mb-2 text-xl font-semibold text-black">
                  MitraAI
                </h3>
                <p className="text-gray-700">
                  Our Gemini powered AI tool who is your personal assistance for
                  all your agricultural needs.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
