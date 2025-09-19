export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Empowering Businesses with Elite IT Consulting & AI Innovation
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl mb-8">
          Global IT Outsourcing & AI Consulting – Canadian Quality, Global Talent.
        </p>
        <button className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-2xl shadow-md hover:shadow-lg transition">
          Get a Free Consultation
        </button>
      </section>

      {/* Quick Highlights */}
      <section className="py-16 px-6 grid md:grid-cols-3 gap-8 text-center">
        <div className="p-6 rounded-2xl shadow bg-white">
          <h3 className="text-xl font-bold mb-2">20+ Years Experience</h3>
          <p>Full-stack and AI expertise trusted by global enterprises.</p>
        </div>
        <div className="p-6 rounded-2xl shadow bg-white">
          <h3 className="text-xl font-bold mb-2">Cost-Effective Outsourcing</h3>
          <p>Scale quickly with top-tier global engineering teams.</p>
        </div>
        <div className="p-6 rounded-2xl shadow bg-white">
          <h3 className="text-xl font-bold mb-2">Enterprise-Grade AI</h3>
          <p>Cloud, automation, and AI-driven business transformation.</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-6 bg-white rounded-2xl shadow">
            <p className="italic mb-4">“AI-assisted design completely changed our process. We now explore more ideas in less time.”</p>
            <span className="font-semibold">– Ms. Zhang, Textile Director</span>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow">
            <p className="italic mb-4">“The team’s responsiveness is impressive. They adapted designs to our needs instantly.”</p>
            <span className="font-semibold">– Ms. Wang, Hotel Procurement</span>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow">
            <p className="italic mb-4">“AI brings fresh ideas every season, revitalizing our industry.”</p>
            <span className="font-semibold">– Mr. Chen, Fashion Magazine Editor</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-900 text-white py-12 px-6 text-center">
        <p className="mb-4 font-semibold">Trusted by enterprises worldwide for AI innovation and IT outsourcing.</p>
        <nav className="flex justify-center space-x-6 mb-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Sitemap</a>
          <a href="#" className="hover:underline">Contact</a>
        </nav>
        <p className="text-sm">© {new Date().getFullYear()} Best IT Consulting Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
