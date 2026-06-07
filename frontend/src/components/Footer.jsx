import React from 'react'
import { MdBusinessCenter } from 'react-icons/md'
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className='w-full bg-background border-t border-border text-text-secondary'>
            <div className='px-5 py-6 flex flex-col sm:flex-row justify-between items-center gap-4'>

                {/* Logo */}
                <div className='flex items-center gap-2 text-text-primary font-bold text-lg'>
                    <MdBusinessCenter />
                    <span>JobSeeker</span>
                </div>

                {/* Links */}
                <div className='flex gap-5 text-xs'>
                    <Link to='/' className='hover:text-text-primary transition-colors duration-200'>Home</Link>
                    <Link to='/student/browsejob' className='hover:text-text-primary transition-colors duration-200'>Browse Jobs</Link>
                    <Link to='/student/profile' className='hover:text-text-primary transition-colors duration-200'>Profile</Link>
                </div>

                {/* Social Icons */}
                <div className='flex gap-4 text-lg'>
                    <a href='https://github.com' target='_blank' rel='noreferrer' className='hover:text-text-primary transition-colors duration-200'><FiGithub /></a>
                    <a href='https://linkedin.com' target='_blank' rel='noreferrer' className='hover:text-text-primary transition-colors duration-200'><FiLinkedin /></a>
                    <a href='https://twitter.com' target='_blank' rel='noreferrer' className='hover:text-text-primary transition-colors duration-200'><FiTwitter /></a>
                </div>

            </div>

            {/* Bottom Bar */}
            <div className='border-t border-border text-center py-3 text-xs'>
                © {new Date().getFullYear()} JobSeeker. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer