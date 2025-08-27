import Link from 'next/link'
import React from 'react'

const projects = [
  {
    title: 'SecureZip',
    mockup: '', // Add mockup URL if available
    live: '', // Add live site URL if available
    code: 'https://github.com/bidyadharsahu/file_compression',
    description: `SecureZip app is a powerful web application built using React, TypeScript, Supabase, and Vercel. It reduces the size of PDF files by up to 40% using advanced compression algorithms like Huffman encoding and Run Length Encoding (RLE). The compressed files are then securely stored in the cloud using Supabase, ensuring that users can easily access their files while maintaining the quality and accessibility of the original documents. The primary goal of SecureZip app is to help users efficiently manage large PDFs, enhancing productivity and simplifying file management.`,
    technologies: 'React, Next.js, TypeScript, Supabase, Vercel'
  },
  {
    title: 'Carpooling DApp using Chainlink',
    mockup: '',
    live: '',
    code: 'https://github.com/bidyadharsahu/carpooling-using-chainlink',
    description: `Developed a decentralized carpooling application using blockchain technology, integrating Chainlink oracles for secure transaction verification and smart contracts written in Solidity to ensure trustless ride-sharing among users. The app supports MetaMask wallet for authentication and payments, with the primary goal of promoting eco-friendly transportation through a transparent and decentralized platform.`,
    technologies: 'Solidity, Node.js, React, Remix, MetaMask, MongoDB'
  },
  {
    title: 'Task Manager App',
    mockup: '',
    live: '', // Add live site URL if available
    code: 'https://github.com/bidyadharsahu/Tracker',
    description: `Created a task management web app that helps users track and manage their tasks with deadlines. Features include real-time task updates, due date reminders, and persistent storage using Supabase. The goal is to improve personal productivity and time management with a simple yet effective tool.`,
    technologies: 'TypeScript, Supabase, Vercel'
  },
  {
    title: 'Personal Portfolio Website',
    mockup: '',
    live: '', // Add live site URL if available
    code: 'https://github.com/bidyadharsahu/portfolio',
    description: `Designed and developed a responsive personal portfolio to showcase projects, skills, and achievements. Optimized for both mobile and desktop with a modern tech stack and deployed on AWS for scalability. Goal is to create a professional online presence and serve as a dynamic resume for potential clients and employers.`,
    technologies: 'TypeScript, AWS Amplify'
  },
  {
    title: 'Campus Connect',
    mockup: '',
    live: '', // Add live site URL if available
    code: '',
    description: `A full-stack student platform where users can calculate SGPA/CGPA, view faculty information, and access updated class timetables and exam routines. Features real-time admin updates and notification alerts for exam schedules. Goal is to streamline academic resource management for students and improve information access on campus.`,
    technologies: 'React, Supabase, Vercel'
  },
]

const Portfolio = () => {
  return (
    <div className="text-center">
      <p>Open Source Contributions:</p>
      {/* <Link className="link link-primary" href="https://github.com/danielcranney/profileme-dev/pull/34">ProfileMe.dev</Link> */}
      <div className="flex flex-wrap items-start mb-10">
        {projects.map((project, index) => (
          <div key={index} className="md:w-1/2 flex flex-col items-center justify-center p-4">
            {project.mockup && <img src={project.mockup} alt={`${project.title} mockup`} className="mb-4" />}
            <h1 className="text-3xl mb-2">{project.title}</h1>
            <p className="mb-2 text-left">{project.description}</p>
            <p className="mb-2 text-sm text-gray-600"><b>Technologies:</b> {project.technologies}</p>
            <div className="flex gap-2">
              {project.live && <Link href={project.live} target='_blank' className="btn btn-secondary">Live</Link>}
              {project.code && <Link href={project.code} target='_blank' className="btn btn-primary">Source</Link>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Portfolio
