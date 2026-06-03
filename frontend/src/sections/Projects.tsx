const projects = [
  {
    title: "Fullstack Portfolio Website",
    description:
      "Personal portfolio with a React frontend, Express API, MongoDB message storage, backend validation, rate limiting, and email delivery through Resend.",
    tech: ["React", "TypeScript", "Tailwind", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/VictorSutac/Fullstack-portfolio-project",
    demo: "",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 px-6 bg-gray-100 text-black">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10">Projects</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>

              <p className="text-gray-600 mb-4">{project.description}</p>

              <div className="flex gap-2 flex-wrap mb-4">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-sm bg-gray-200 px-2 py-1 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  GitHub
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
