import { projects } from "../data/project";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-blue-100 font-sans">
      {/* Navigation */}
      <nav className="max-w-6xl mx-auto px-6 py-8 flex justify-between items-center">
        <span className="text-xl font-black tracking-tighter">AFIF.DEV</span>
        <div className="hidden md:flex space-x-8 text-sm font-semibold text-gray-500">
          <a href="#projects" className="hover:text-blue-600 transition">
            Projects
          </a>
          <a href="#experience" className="hover:text-blue-600 transition">
            Experience
          </a>
          <a href="#organizations" className="hover:text-blue-600 transition">
            Leadership
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-50 rounded-full">
          Available for Opportunities
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Muhammad Ilham Afif,{" "}
          <span className="text-blue-600 text-opacity-80">S.Kom.</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl leading-relaxed mb-10">
          Result-oriented Informatics Engineering graduate with a 3.84/4.00
          GPA. Specialized in building secure enterprise-scale systems using
          Java Spring Boot and Next.js.
        </p>
        <div className="flex flex-wrap gap-4 font-bold">
          <a
            href="mailto:milhamafif027@gmail.com"
            className="bg-gray-900 text-white px-10 py-4 rounded-xl hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-200"
          >
            Get in Touch
          </a>
          <a
            href="https://linkedin.com/in/muhammadilhamafif/"
            target="_blank"
            className="border border-gray-200 px-10 py-4 rounded-xl hover:bg-gray-50 transition-all"
          >
            LinkedIn Profile
          </a>
        </div>
      </header>

      {/* Projects Grid */}
      <section
        id="projects"
        className="max-w-6xl mx-auto px-6 py-24 border-t border-gray-100"
      >
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl font-bold mb-4 tracking-tight">
              Featured Projects
            </h2>
            <p className="text-gray-500 font-medium">
              Selected works from internship and academic research.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((project, i) => (
            <div key={i} className="group">
              <div className="p-10 border border-gray-100 rounded-[2rem] bg-gray-50 group-hover:bg-white group-hover:shadow-2xl group-hover:border-blue-50 transition-all duration-500">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-4 block">
                  {project.tech}
                </span>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed text-sm md:text-base">
                  {project.description}
                </p>
                <a
                  href={project.link}
                  target="_blank"
                  className="inline-flex items-center font-black text-xs tracking-widest text-gray-400 group-hover:text-blue-600 transition-all"
                >
                  EXPLORE PROJECT{" "}
                  <span className="ml-3 group-hover:translate-x-2 transition-transform">
                    →
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Professional Experience Section - Clean Timeline */}
      <section
        id="experience"
        className="max-w-6xl mx-auto px-6 py-32 border-t border-gray-100"
      >
        <h2 className="text-sm font-black text-gray-400 uppercase tracking-[0.3em] mb-16">
          Professional Experience
        </h2>
        <div className="space-y-20">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h3 className="text-xl font-bold">
                PT. Tanjung Enim Lestari Pulp and Paper
              </h3>
              <p className="text-gray-400 font-medium text-sm mt-2 uppercase tracking-wider">
                Software Developer Intern 
              </p>
              <p className="text-blue-600 font-bold text-sm mt-1">
                2025 
              </p>
            </div>
            <div className="md:col-span-2 space-y-4">
              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                Engineered a Computerized Maintenance Management System (CMMS)
                to automate preventive maintenance workflows.
              </p>
              <ul className="space-y-3 text-gray-500 text-sm list-disc pl-4">
                <li>
                  Built full-stack applications using Next.js and Spring Boot,
                  ensuring high performance.
                </li>
                <li>
                  Architected RESTful APIs with SQL for real-time reporting and
                  data management.
                </li>
                <li>
                  Collaborated with stakeholders for UAT and requirement
                  gathering.
                </li>
                <li>
                  Mentored entry-level interns on code structure and
                  debugging.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Organizational Experience */}
      <section id="organizations" className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16 tracking-tight">
            Leadership & Organizations
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h4 className="font-bold text-lg mb-2">HIMA ILKOM UNNES</h4>
              <p className="text-blue-600 text-sm font-bold mb-4">
                Strategic Planning
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Formulated orientation programs for new students, ensuring
                alignment with departmental vision and academic objectives.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h4 className="font-bold text-lg mb-2">Computer Science Sport</h4>
              <p className="text-blue-600 text-sm font-bold mb-4">
                Project Leadership
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Served as PIC for major sports tournaments, managing stakeholder
                coordination and ensuring seamless event flow.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h4 className="font-bold text-lg mb-2">Data Analyst Workshop</h4>
              <p className="text-blue-600 text-sm font-bold mb-4">
                Operations Coordination
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Overseeing technical execution and maintaining effective
                communication with all participating parties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-16 text-center border-t border-gray-100">
        <p className="text-gray-400 text-sm font-medium">
          © 2026 Muhammad Ilham Afif, S.Kom. • Built with Next.js & Tailwind
          CSS.
        </p>
      </footer>
    </div>
  );
}
