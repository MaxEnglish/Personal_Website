import React from 'react';
import { Link } from "react-router-dom";
import '../Home.css';
import Navbar from '../Navbar'
import {AiFillLinkedin, AiFillGithub, AiFillInstagram, AiFillMail, AiFillEnvironment, AiFillPhone} from 'react-icons/ai'

export default function Home() {

  const linkTo = (URL) => {
    window.open(URL, '_blank');
  }

  return (
    <main className='px-8 md:px-20 lg:px-40'>
    
    <Navbar />

    <section id='home' className='min-h-screen text-center mt-4 flex flex-col justify-center '>
        <div className="mx-auto bg-gradient-to-b from-teal-500 rounded-full w-56 h-56 relative overflow-hidden md:h-96 md:w-96 mb-2">
          <img src='/avatar.png' layout="fill"/>
        </div>
        <h1 className='text-3xl md:text-5xl font-medium text-teal-500'>MAX ENGLISH</h1>
        <h3 className='text-xl md:text-2xl'>Web Developer and Software Engineer</h3>
        <p className='text-md py-1 text-gray-800 md:text-xl'> Enthusiastic and motivated to improve the user experience by creating responsive, multi-browser web applications utilizing modern frontend frameworks! Eager to learn more and gain valuable experience in my field! </p>
        <div className='text-5xl py-4 flex justify-center gap-16 text-gray-600'>
          <AiFillLinkedin 
          className='cursor-pointer'
          onClick={()=>linkTo("https://www.linkedin.com/in/max-english-774261180/")}
          /> 
          <AiFillGithub 
          className='cursor-pointer'
          onClick={()=>linkTo("https://github.com/MaxEnglish")}
          />
          <AiFillInstagram 
          className='cursor-pointer'
          onClick={()=>linkTo("https://www.instagram.com/max_inglish_/")}
          />
        </div>
    </section>

    <section id='portfolio' className='mt-10 section-break'>
      <h1 className='text-xl font-medium'>Portfolio</h1>
      <p className='mt-1 text-md mb-10'>Here are some personal projects I developed for this website</p>

      <div className='columns-3 gap-4 flex justify-center'>
        <Link to="/scrabble">
          <div className='flex flex-col items-center text-center shadow-lg p-2.5 h-48 w-48'>
            <img src='SCRABBLE.PNG' className='container mx-auto w-48'/>
            <p className='font-semibold'>Singleplayer Scrabble</p>
          </div>
        </Link>
        <Link to="/wordle">
        <div className='flex flex-col items-center text-center shadow-lg p-2.5 h-48 w-48'>
            <img src='WORDLE.webp' className='container mx-auto w-32'/>
            <p className='font-semibold'>Wordle</p>
        </div>
        </Link>
        <Link>
        <div className='flex flex-col items-center text-center shadow-lg p-2.5 h-48 w-48'>
            <img src='CROSSWORD.png' className='container mx-auto w-32'/>
            <p className='font-semibold'>Crossword Puzzle</p>
        </div>
        </Link>
      </div>
    </section>


    <section id='experience' className='section-break'>
      <h1 className='text-xl font-medium'>Experience </h1>
      <p className='mt-1 text-md'> My practical experience pertaining to web development </p>

      <div className='mt-4 flex md:flex-row gap-8'>
        <div className='w-full shadow-lg rounded-md px-4 py-5 flex flex-col items-center text-center gap-1'>
          <img src='/NLX.PNG' className='w-48' alt='Plugin-Example' />
          <h2 className='text-xl'>NLX SWE Internship, Summer 2022</h2>
          <p className='text-gray-500'>Built a Figma Plugin to import data from Figma to NLX's website</p>
          <p className='text-xl underline decoration-gray-400'>Tools I Used</p>
          <ul>
            <li>React</li>
            <li>Typescript</li>
            <li>AWS</li>
          </ul>
          <p className='text-xl nlx-link' onClick={()=> linkTo('https://www.figma.com/community/plugin/1139545615887918828/Voice-Compass-by-NLX')}>Click <span className='underline'>here</span> to check it out</p>
        </div>

        <div className='w-full shadow-lg rounded-md px-4 py-5 flex flex-col items-center text-center gap-1'>
          <img className='w-48 agora-logo' src='/AGORA.PNG' alt='gambar' />
          <h2 className='text-xl'>Marist Capstone Project, Fall 2022</h2>
          <p className='text-gray-500'>Developed the frontend for a knowledge management platform</p>
          <p className='text-xl underline decoration-gray-400'>Tools I Used</p>
          <ul>
            <li>Javascript</li>
            <li>EJS</li>
            <li>Bootstrap</li>
          </ul>
        </div>

      </div>

    </section>

    <section id='expertise'>
      <h1 className='text-xl font-medium'>Expertise </h1>
      <p className='mt-1 text-md'> What do I know? Hmmm.... well let's see </p>

      
    </section>

    <section id="footer" className='mt-5 rounded bg-black py-8 px-8'>
      <div className='text-white md:text-center'>
        <h1 className='font-medium text-lg'>Contact Me</h1>
        <p>Wanna talk anything?</p>

        <ul className='md:flex justify-center gap-4'>
          <li className='flex items-center gap-2'>
            <AiFillMail />
            <p>damasukmath@gmail.com</p>
          </li>
          <li className='flex items-center gap-2'>
            <AiFillEnvironment />
            <p>Kab. Tegal</p>
          </li>
          <li className='flex items-center gap-2'>
            <AiFillPhone/>
            <p>0858-0058-9558</p>
          </li>
        </ul>

        <div className='flex text-xl text-white gap-4 mt-2 md:justify-center'>
          <AiFillLinkedin /> 
          <AiFillGithub />
          <AiFillInstagram />
        </div>

        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"/>

        <p className="text-center text-sm text-gray-300 sm:text-center">
          © 2022
        </p>

      </div>
      
    </section>

    </main>
  );
}


