const skills = [
  "React",
  "TypeScript",
  "JavaScript",
  "HTML & CSS",
  "Tailwind",
  "Git",
  "Node.js",
  "REST API",
];

const About = () => {
  return (
    <section id="about" className="py-20 px-6 bg-white text-black">
      <div className="max-w-4xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-4xl font-bold mb-4">About Me</h2>
        <div className="w-16 h-1 bg-blue-500 mx-auto mb-8"></div>

        {/* Text */}
        <p className="text-lg text-gray-600 mb-4">
          I am a frontend developer specializing in React and TypeScript. I
          build modern, responsive web applications with a focus on clean
          architecture and usability.
        </p>

        <p className="text-lg text-gray-600 mb-10">
          I have experience working with JavaScript, Node.js and MongoDB, and I
          continuously improve my skills through building personal projects and
          structured learning. Currently, I am looking for my first commercial
          experience and open to freelance opportunities.
        </p>

        {/* Skills */}
        <h3 className="text-2xl font-semibold mb-6">Skills</h3>

        <div className="flex flex-wrap justify-center gap-3">
          {skills.map((skill) => (
            <div
              key={skill}
              className="px-4 py-2 bg-gray-100 rounded-lg text-sm"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
