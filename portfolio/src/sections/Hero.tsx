import profileImg from "../assets/img/profile.jpg";
const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gray-900 text-white">
      {/* Avatar */}
      <img
        src={profileImg}
        alt="Profile"
        className="w-100 h-100 rounded-full mb-6 object-cover border-4 border-white"
      />

      {/* Name */}
      <h1 className="text-4xl md:text-6xl font-bold mb-4">Viktor Shutak</h1>

      <p className="text-xl text-blue-400 mb-6">Frontend Developer</p>

      <p className="max-w-xl text-gray-300 mb-8">
        I develop web applications using React, TypeScript and modern tools.
        Focused on clean code, user experience and scalable solutions.
      </p>

      {/* Buttons */}
      <div className="flex gap-4 flex-wrap justify-center">
        <a
          href="#contact"
          className="px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition"
        >
          Contact Me
        </a>

        <a
          href="#projects"
          className="px-6 py-3 border border-white rounded-lg hover:bg-white hover:text-black transition"
        >
          View Projects
        </a>
      </div>
    </section>
  );
};

export default Hero;
