import React from 'react'
import { FiMapPin } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const Card = ({ item }) => {
    return (
        <div className='bg-background hover:border-primary border border-border text-text-primary cursor-default flex gap-3 md:gap-5 p-3 md:p-5 items-center rounded-xl transition-all duration-300 ease-in-out'>
            
            <div className='flex-shrink-0 flex justify-center items-center w-12 h-12 md:w-16 md:h-16 text-xl md:text-3xl font-bold border-2 border-primary-hover rounded-full text-primary-hover'>
                {item?.companyName?.charAt(0)}
            </div>

            <div className='flex-1 min-w-0 flex flex-col gap-1'>
                <p className='text-sm md:text-lg font-semibold truncate'>
                    {item?.jobTitle}
                </p>

                <p className='text-xs md:text-sm text-text-secondary flex items-center gap-1'>
                    <FiMapPin className='flex-shrink-0' />
                    <span className='truncate'>{item?.companyName}</span>
                </p>

                <div className='flex flex-wrap gap-2 mt-1'>
                    <span className='text-xs text-text-secondary bg-secondary px-2 py-0.5 rounded-full'>
                        {item?.location}
                    </span>
                    <span className='text-xs font-medium text-primary-hover bg-secondary px-2 py-0.5 rounded-full'>
                        ₹{item?.salaryRange?.min } - ₹{item?.salaryRange?.max } LPA
                    </span>
                </div>
            </div>

            <div className='flex-shrink-0'>
                <Link
                    to={`/student/job/${item?._id}`}
                    className='text-primary-hover border border-primary-hover text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 rounded-xl hover:bg-primary hover:text-text-primary transition-all duration-300 ease-in-out whitespace-nowrap'
                >
                    View Details
                </Link>
            </div>

        </div>
    )
}

export default Card