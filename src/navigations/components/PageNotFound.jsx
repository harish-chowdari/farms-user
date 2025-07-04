import React from 'react';

// import {pageNotFound} from '../../assets/images/utils/index'

function PageNotFound() {
    return (
        <div className='w-[100vw] h-[100vh] flex flex-col justify-center items-center'>
            <div className='mx-5'>
                <div className='flex justify-start'>
                    {/* <img src={pageNotFound} alt="" className='h-[15rem]' /> */}
                </div>
                <h1 className='w-full text-[6vh]'>PAGE NOT FOUND</h1>
                <p className='w-full text-3xl'>Are you sure the website URL is correct?</p>
                <div className='w-full my-3'>
                    <button onClick={() => window.location.href = '/'} className='p-1 px-2 border-2 border-[#50AFF8] text-[#50AFF8] rounded-full text-3xl '>
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound