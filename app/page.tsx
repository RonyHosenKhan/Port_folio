"use client"

import { useEffect } from "react"
import { useState } from "react"
import {
  ArrowRight,
  Award,
  Code,
  Database,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Menu,
  Smartphone,
  Twitter,
  X,
} from "lucide-react"
import { motion } from "framer-motion"
import CountUp from "react-countup"
import { useInView } from "react-intersection-observer"
import { ThemeToggle } from "@/components/theme-toggle"
import ProblemSolvingStats from "@/components/problem-solving-stats"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <MobileMenu />
      <DesktopHeader />

      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* About Section */}
        <AboutSection />

        {/* Skills Section */}
        <SkillsSection />

        {/* Problem Solving Section */}
        <ProblemSolvingSection />

        {/* Projects Section */}
        <ProjectsSection />

        {/* Education Section */}
        <EducationSection />

        {/* Contact Section */}
        <ContactSection />
      </main>

      <Footer />
    </div>
  )
}

// Mobile Menu Component
function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          Rony
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <Menu className="h-6 w-6 text-gray-800 dark:text-gray-200" />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-white dark:bg-gray-900 pt-16">
          <div className="flex flex-col items-center space-y-6 p-8">
            <NavLink href="#home" onClick={() => setIsOpen(false)}>
              Home
            </NavLink>
            <NavLink href="#about" onClick={() => setIsOpen(false)}>
              About
            </NavLink>
            <NavLink href="#skills" onClick={() => setIsOpen(false)}>
              Skills
            </NavLink>
            <NavLink href="#problem-solving" onClick={() => setIsOpen(false)}>
              Problem Solving
            </NavLink>
            <NavLink href="#projects" onClick={() => setIsOpen(false)}>
              Projects
            </NavLink>
            <NavLink href="#education" onClick={() => setIsOpen(false)}>
              Education
            </NavLink>
            <NavLink href="#contact" onClick={() => setIsOpen(false)}>
              Contact
            </NavLink>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-8 p-3 rounded-full bg-red-100 dark:bg-red-900 text-red-500 dark:text-red-300"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Desktop Header Component
function DesktopHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 hidden md:block">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          Rony
        </div>
        <nav className="flex space-x-8">
          <NavLink href="#home">Home</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#skills">Skills</NavLink>
          <NavLink href="#problem-solving">Problem Solving</NavLink>
          <NavLink href="#projects">Projects</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  )
}

// Navigation Link Component
function NavLink({
  href,
  children,
  onClick = () => {},
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="block sm:inline w-full sm:w-auto text-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
    </a>
  );
}


// Hero Section Component
function HeroSection() {
  return (
    <section id="home" className="py-16 md:py-32 px-4">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
        
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 text-center md:text-left"
        >
          <div className="relative mb-6">
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-purple-200 dark:bg-purple-900 rounded-full blur-2xl opacity-50"></div>
            <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-blue-200 dark:bg-blue-900 rounded-full blur-2xl opacity-50"></div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white relative z-10">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Rony
              </span>
            </h1>
          </div>

          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            <TypewriterEffect texts={["Frontend Developer", "Problem Solver", "CSE Student"]} />
          </h2>

          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto md:mx-0">
            CSE Undergraduate at University of Barishal, passionate about creating beautiful web experiences and solving
            complex problems.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-medium flex items-center hover:opacity-90 transition shadow-lg"
            >
              Contact Me <ArrowRight className="ml-2 h-4 w-4" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="px-6 py-3 border border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400 rounded-lg font-medium hover:bg-purple-50 dark:hover:bg-purple-900/20 transition flex items-center"
            >
              View Projects <ExternalLink className="ml-2 h-4 w-4" />
            </motion.a>
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-300 to-blue-300 dark:from-purple-700 dark:to-blue-700 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <div className="relative w-full h-full rounded-full bg-gradient-to-r from-purple-600 to-blue-500 p-1 shadow-xl">
              <div className="absolute inset-1 bg-white dark:bg-gray-900 rounded-full overflow-hidden flex items-center justify-center">
                <img
                  src="/images/profile.jpeg"
                  alt="Rony's profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            {/* Floating tags */}
            <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 p-2 rounded-md shadow text-sm text-gray-800 dark:text-gray-200">
              Frontend
              <div className="text-xs text-gray-500 dark:text-gray-400">Developer</div>
            </div>
            <div className="absolute bottom-2 left-2 bg-white dark:bg-gray-800 p-2 rounded-md shadow text-sm text-gray-800 dark:text-gray-200">
              Problem
              <div className="text-xs text-gray-500 dark:text-gray-400">Solver</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


// About Section Component
function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <SectionTitle>About Me</SectionTitle>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-lg"
        >
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="relative">
                <div className="w-full aspect-square bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl p-1 overflow-hidden">
                  <img
                    src="/images/profile.jpeg"
                    alt="Rony's profile"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3">
                  <div className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    <span className="font-medium text-gray-800 dark:text-gray-200">Developer</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-2/3">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                I'm a passionate Frontend Developer and problem solver currently pursuing my Computer Science and
                Engineering degree at the University of Barishal.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                With a strong foundation in web technologies and a keen eye for design, I create responsive and
                user-friendly web applications that deliver exceptional user experiences.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                When I'm not coding, I enjoy solving algorithmic problems on platforms like LeetCode, Codeforces, and
                CodeChef to sharpen my problem-solving skills.
              </p>

              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard value={2} label="Years Experience" />
                <StatCard value={22} label="Projects" />
                <StatCard value={1100} label="Problems Solved" />
                <StatCard value={5} label="Certifications" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Skills Section Component
function SkillsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section
      id="skills"
      className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container mx-auto px-4">
        <SectionTitle>My Skills</SectionTitle>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* Frontend Skills */}
          <SkillCard
            icon={<Code className="h-8 w-8 text-purple-600 dark:text-purple-400" />}
            title="Frontend Development"
            skills={[
              { name: "HTML/CSS", percentage: 90, color: "from-purple-600 to-blue-500" },
              { name: "JavaScript", percentage: 85, color: "from-purple-600 to-blue-500" },
              { name: "React", percentage: 80, color: "from-purple-600 to-blue-500" },
              { name: "Tailwind CSS", percentage: 90, color: "from-purple-600 to-blue-500" },
            ]}
            delay={0}
          />

          {/* Backend Skills */}
          <SkillCard
            icon={<Database className="h-8 w-8 text-blue-600 dark:text-blue-400" />}
            title="Backend & Database"
            skills={[
              { name: "Firebase", percentage: 75, color: "from-blue-500 to-purple-600" },
              { name: "SQL", percentage: 70, color: "from-blue-500 to-purple-600" },
              { name: "MongoDB", percentage: 65, color: "from-blue-500 to-purple-600" },
              { name: "Node.js", percentage: 60, color: "from-blue-500 to-purple-600" },
            ]}
            delay={0.2}
          />

          {/* Other Skills */}
          <SkillCard
            icon={<Award className="h-8 w-8 text-green-600 dark:text-green-400" />}
            title="Other Skills"
            skills={[
              { name: "Problem Solving", percentage: 85, color: "from-green-500 to-teal-500" },
              { name: "Git & GitHub", percentage: 80, color: "from-green-500 to-teal-500" },
              { name: "Responsive Design", percentage: 90, color: "from-green-500 to-teal-500" },
              { name: "UI/UX Basics", percentage: 75, color: "from-green-500 to-teal-500" },
            ]}
            delay={0.4}
          />
        </motion.div>
      </div>
    </section>
  )
}

// Problem Solving Section Component
function ProblemSolvingSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="problem-solving" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <SectionTitle>Problem Solving Journey</SectionTitle>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <ProblemSolvingStats
            leetcodeUsername="user1589T"
            codeforcesUsername="ronykhan"
            codechefUsername="ronycse8bu"
          />
        </motion.div>
      </div>
    </section>
  )
}

// Projects Section Component
function ProjectsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section
      id="projects"
      className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container mx-auto px-4">
        <SectionTitle>My Projects</SectionTitle>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* Project 1 - Tea House */}
          <ProjectCard
            title="Tea House Landing Page"
            description="A responsive landing page for a tea house featuring product showcases, customer reviews, and modern design elements."
            tags={["HTML", "CSS", "Responsive Design"]}
            image="/images/tea-house.jpeg"
            liveLink="https://ronyhosenkhan.github.io/tea-house-landing-page/"
            codeLink="https://github.com/RonyHosenKhan/tea-house-landing-page"
            delay={0}
          />

          {/* Project 2 - Fitness */}
          <ProjectCard
            title="Fitness Website"
            description="A complete fitness website with program details, membership options, and trainer information."
            tags={["HTML", "CSS", "JavaScript"]}
            image="/images/image.png"
            liveLink="https://ronyhosenkhan.github.io/Fitness/"
            codeLink="https://github.com/RonyHosenKhan/Fitness"
            delay={0.2}
          />

          {/* Project 3 - G3 Architecture */}
          <ProjectCard
            title="G3 Architecture"
            description="An architecture firm website showcasing projects, services, and company information with a clean, professional design."
            tags={["HTML", "CSS", "Responsive Design"]}
            image="/images/g3p.jpg"
            liveLink="https://ronyhosenkhan.github.io/G3-Architecture/"
            codeLink="https://github.com/RonyHosenKhan/G3-Architecture"
            delay={0.4}
          />
        </motion.div>

        <div className="text-center mt-12">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/RonyHosenKhan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gray-800 dark:bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-700 dark:hover:bg-gray-600 transition shadow-md"
          >
            <Github className="mr-2 h-5 w-5" />
            See More on GitHub
          </motion.a>
        </div>
      </div>
    </section>
  )
}

// Education Section Component
function EducationSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="education" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <SectionTitle>Education</SectionTitle>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
        >
          <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 mb-4 md:mb-0">
              <div className="w-20 h-20 bg-gradient-to-br from-white-500 to-gray-500 rounded-lg flex items-center justify-center shadow-md">
                <img
                  src="/images/bu.png"
                  alt="University of Barishal Logo"
                  className="w-12 h-12 object-contain"
                />
              </div>
            </div>
            <div className="md:w-3/4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                Bachelor of Science in Computer Science and Engineering
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">University of Barishal</p>
              <p className="text-gray-500 dark:text-gray-500">2020 - Present</p>
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                Relevant coursework: Data Structures and Algorithms, Object-Oriented Programming, Database Management
                Systems, Web Development, and Software Engineering.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full text-sm">
                  Data Structures
                </span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                  Algorithms
                </span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-full text-sm">
                  OOP
                </span>
                <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 rounded-full text-sm">
                  Database Systems
                </span>
                <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300 rounded-full text-sm">
                  Web Development
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Contact Section Component
function ContactSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container mx-auto px-4">
        <SectionTitle>Get In Touch</SectionTitle>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center mr-4">
                  <Mail className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Email</p>
                  <p className="text-lg font-medium text-gray-800 dark:text-gray-200">rony.cse8.bu@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center mr-4">
                  <Smartphone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Phone</p>
                  <p className="text-lg font-medium text-gray-800 dark:text-gray-200">+880 1798926678</p>
                </div>
              </div>

              <h3 className="text-xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200">Follow Me</h3>
              <div className="flex space-x-4">
                <motion.a
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://github.com/RonyHosenKhan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition shadow-md"
                >
                  <Github className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://www.linkedin.com/in/md-rony-hosen-khan-04238a215/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center hover:bg-blue-200 dark:hover:bg-blue-800/50 transition shadow-md"
                >
                  <Linkedin className="h-6 w-6 text-blue-700 dark:text-blue-300" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-sky-100 dark:bg-sky-900/50 rounded-lg flex items-center justify-center hover:bg-sky-200 dark:hover:bg-sky-800/50 transition shadow-md"
                >
                  <Twitter className="h-6 w-6 text-sky-500 dark:text-sky-300" />
                </motion.a>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Send Me a Message</h3>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  placeholder="Your email"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  placeholder="Your message"
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-medium hover:opacity-90 transition shadow-md"
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Rony
            </div>
            <p className="text-gray-400 mt-2">Frontend Developer & Problem Solver</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <a href="#home" className="text-gray-400 hover:text-white transition">
              Home
            </a>
            <a href="#about" className="text-gray-400 hover:text-white transition">
              About
            </a>
            <a href="#skills" className="text-gray-400 hover:text-white transition">
              Skills
            </a>
            <a href="#problem-solving" className="text-gray-400 hover:text-white transition">
              Problem Solving
            </a>
            <a href="#projects" className="text-gray-400 hover:text-white transition">
              Projects
            </a>
            <a href="#contact" className="text-gray-400 hover:text-white transition">
              Contact
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Rony. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// Section Title Component
function SectionTitle({ children }) {
  return (
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 relative">
      <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">{children}</span>
      
      <br />
      <div className="absolute w-40 h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bottom-0 left-1/2 transform -translate-x-1/2 mt-6 rounded-full shadow-md"></div>

    </h2>
  )
}

// Skill Card Component
function SkillCard({ icon, title, skills, delay = 0 }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
      className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
    >
      <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">{title}</h3>
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <SkillBar
            key={index}
            name={skill.name}
            percentage={skill.percentage}
            color={skill.color}
            delay={index * 0.1}
            inView={inView}
          />
        ))}
      </div>
    </motion.div>
  )
}

// Skill Bar Component
function SkillBar({ name, percentage, color, delay = 0, inView }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-gray-700 dark:text-gray-300">{name}</span>
        <span className="text-gray-500 dark:text-gray-400">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className={`h-2.5 rounded-full bg-gradient-to-r ${color}`}
        ></motion.div>
      </div>
    </div>
  )
}

// Project Card Component
function ProjectCard({ title, description, tags, image, liveLink, codeLink, delay = 0 }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition group"
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={image || "/placeholder.svg?height=300&width=500"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 w-full">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg font-medium flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition mb-2"
            >
              View Live Site <ExternalLink className="ml-1 h-4 w-4" />
            </motion.a>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 dark:text-purple-400 font-medium flex items-center hover:text-purple-700 dark:hover:text-purple-300 transition"
          >
            Live Demo <ExternalLink className="ml-1 h-4 w-4" />
          </a>
          <a
            href={codeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 font-medium flex items-center hover:text-blue-700 dark:hover:text-blue-300 transition"
          >
            View Code <Github className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

// Stat Card Component
function StatCard({ value, label }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div ref={ref} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center">
      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
        {inView ? <CountUp end={value} duration={2.5} /> : 0}
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
    </div>
  )
}

// Typewriter Effect Component
function TypewriterEffect({ texts }) {
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [text, setText] = useState("")

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(texts[textIndex].substring(0, charIndex + 1))
          setCharIndex(charIndex + 1)

          if (charIndex === texts[textIndex].length) {
            setIsDeleting(true)
            setTimeout(() => {}, 1500)
          }
        } else {
          setText(texts[textIndex].substring(0, charIndex - 1))
          setCharIndex(charIndex - 1)

          if (charIndex === 0) {
            setIsDeleting(false)
            setTextIndex((textIndex + 1) % texts.length)
          }
        }
      },
      isDeleting ? 50 : 150,
    )

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, textIndex, texts])

  return (
    <span>
      {text}
      <span className="animate-pulse">|</span>
    </span>
  )
}
