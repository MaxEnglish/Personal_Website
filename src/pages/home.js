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
      <h1 className='text-3xl font-semibold'>Personal Projects</h1>
      <p className='mb-10 mt-1 text-lg'>Word games I developed for this website using React and vanilla Javascript embedded into this application</p>

      <div className='columns-3 col-gap flex'>
      <Link to="/wordle">
        <div className='flex flex-col items-center text-center shadow-lg p-2.5 h-48 w-48 game-effect'>
            <img src='WORDLE.webp' className='container mx-auto w-32'/>
            <p className='font-semibold'>Wordle</p>
        </div>
        </Link>
        <Link to='/crossword'>
        <div className='flex flex-col items-center text-center shadow-lg p-2.5 h-48 w-48 game-effect'>
            <img src='CROSSWORD.png' className='container mx-auto w-32'/>
            <p className='font-semibold'>Crossword Puzzle</p>
        </div>
        </Link>
        <Link to="/scrabble">
          <div className='flex flex-col items-center text-center shadow-lg p-2.5 h-48 w-48 game-effect'>
            <img src='SCRABBLE.PNG' className='container mx-auto w-48'/>
            <p className='font-semibold'>Singleplayer Scrabble</p>
          </div>
        </Link>
      </div>
    </section>


    <section id='experience' className='section-break mt-20'>
      <h1 className='text-3xl font-semibold'>Experience </h1>
      <p className='mt-1 mb-10 text-lg'> My past jobs pertaining to web development </p>

      <div className='mt-4 flex md:flex-row gap-8'>
        <div className='w-full shadow-lg rounded-md px-4 py-5 flex flex-col items-center text-center gap-1'>
          <img src='/NLXLOGO.PNG' className='nlx-logo' alt='Plugin-Example' />
          <h2 className='text-2xl'>NLX SWE Internship, Summer 2022</h2>
          <p className='text-gray-500'>Built a Figma Plugin to import data from Figma to NLX's website using:</p>
          <ul>
            <li>React</li>
            <li>Typescript</li>
            <li>AWS</li>
          </ul>
          <p className='text-xl nlx-link' onClick={()=> linkTo('https://www.figma.com/community/plugin/1139545615887918828/Voice-Compass-by-NLX')}>Click <span className='underline'>here</span> to check it out</p>
        </div>

        <div className='w-full shadow-lg rounded-md px-4 py-5 flex flex-col items-center text-center gap-1'>
          <img className='agora-logo' src='/AGORA.PNG' alt='There was an image here... hmmm' />
          <h2 className='text-2xl mt-4'>Marist Capstone Project, Fall 2022</h2>
          <p className='text-gray-500'>Developed the frontend for a knowledge management platform using: </p>
          <ul>
            <li>Javascript</li>
            <li>EJS</li>
            <li>Bootstrap</li>
            <li>Express</li>
          </ul>
        </div>

      </div>

    </section>

    <section id='expertise' className='mt-20'>
      <h1 className='text-3xl font-semibold'>Expertise </h1>
      <p className='mt-1 text-md'> Hover over category to view </p>
      <ul>
        <li className='accordian'>
          Frontend
          <i class="down-arrow"></i>
        </li>
        <div className='subtext'>
          <ul>
            <li>React</li>
            <li>Bootstrap</li>
            <li>Tailwind</li>
            <li>Typescript</li>
            <li>HTML</li>
            <li>CSS</li>
            <li>Figma</li>
          </ul>
        </div>
        <li className='accordian'>
          Backend
          <i class="down-arrow"></i>
        </li>
        <div className='subtext'>
        <ul>
            <li>Express.js</li>
            <li>REST APIs</li>
            <li>SQL</li>
            <li>AWS</li>
          </ul>
        </div>
        <li className='accordian'>
          Programming Languages
          <i class="down-arrow"></i>
        </li>
        <div className='subtext'>
        <ul>
            <li>Javascript (Primary Language) </li>
            <li>Java</li>
            <li>C++</li>
            <li>Python</li>
          </ul>
        </div>
        <li className='accordian'>
          Other
          <i class="down-arrow"></i>
        </li>
        <div className='subtext'>
        <ul>
            <li>Microsoft Office</li>
            <li>Photoshop & Illustrator</li>
            <li>Product Design</li>
            <li>Working with teams & good communication</li>
          </ul>
        </div>
      </ul>
    </section>

    <section id="footer" className='mt-5 rounded bg-black py-8 px-8'>
      <div className='text-white md:text-center'>
        <h1 className='font-medium text-lg'>Contact Me</h1>

        <ul className='md:flex justify-center gap-4'>
          <li className='flex items-center gap-2'>
            <AiFillMail />
            <p>maxjenglish@gmail.com</p>
          </li>
          <li className='flex items-center gap-2'>
            <AiFillEnvironment />
            <p>Poughkeepsie, NY</p>
          </li>
          <li className='flex items-center gap-2'>
            <AiFillPhone/>
            <p>475-277-9094</p>
          </li>
        </ul>

        <div className='flex text-xl text-white gap-4 mt-2 md:justify-center'>
          <AiFillLinkedin /> 
          <AiFillGithub />
          <AiFillInstagram />
        </div>

        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"/>

        <p className="text-center text-sm text-gray-300 sm:text-center">
          © 2023
        </p>

      </div>
      
    </section>

    </main>
  );
}


