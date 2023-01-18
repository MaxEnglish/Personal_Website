import { Link } from "react-router-dom";

export default function Navbar(){
    return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow-sm px-8 md:px-20 lg:px-40 flex justify-between items-center z-50">
            <h1 className="font-burtons text-lg my-header">Max English Personal Website</h1>
            <ul className="flex items-center">
                <h1 className='hover:bg-sky-50 cursor-pointer navbar-padding' onClick={()=> document.getElementById('portfolio').scrollIntoView({behavior: 'smooth', block: 'center'})}>Projects</h1>
                <h1 className='hover:bg-sky-50 cursor-pointer navbar-padding' onClick={()=> document.getElementById('experience').scrollIntoView({behavior: 'smooth', block: 'center'})}>Experience</h1>
                <h1 className='hover:bg-sky-50cursor-pointer navbar-padding' onClick={()=> document.getElementById('expertise').scrollIntoView({behavior: 'smooth', block: 'center'})}>Expertise</h1>
                <h1 className='hover:bg-sky-50 cursor-pointer navbar-padding right-navbar-padding' onClick={()=> document.getElementById('about-me').scrollIntoView({behavior: 'smooth', block: 'center'})}>About Me</h1>
                <Link to='/resume' target="_blank">
                    <div className="px-4 py-2 bg-gradient-to-r from-cyan-500 text- to-teal-500 bg-blue-300 rounded-md ml-8 text-white resume-btn">Resume</div>
                </Link>
            </ul>
        </nav>
    )
}