const projects = [
  {
    title: "Portfolio Website",
    description: "My personal portfolio built with React and Tailwind",
    tech: ["React", "TypeScript", "Tailwind"],
    github: "#",
    demo: "#",
  },
  {
    title: "Task Manager",
    description: "App to manage daily tasks",
    tech: ["React", "Node.js", "MongoDB"],
    github: "#",
    demo: "#",
  },
]

const Projects = () => {
  return (
    <section id="projects" className="py-20 px-6 bg-gray-100 text-black">
      <div className="max-w-5xl mx-auto">

        <h2 className="text-4xl font-bold text-center mb-10">
          Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-semibold mb-2">
                {project.title}
              </h3>

              <p className="text-gray-600 mb-4">
                {project.description}
              </p>

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
                <a href={project.github} className="text-blue-500">
                  GitHub
                </a>
                <a href={project.demo} className="text-blue-500">
                  Demo
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Projects