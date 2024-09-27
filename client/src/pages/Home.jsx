import React from 'react'
import image from "../assets/image.png"

function Home() {
  return (
    <div>
      <div className="top flex items-center mt-5 justify-center">
        <div className='flex items-center justify-center '>
        <div className=" h-full w-full ml-20 text-4xl font-bold leading-relaxed">
          <h1>Solution for</h1>
          <h1>Creative</h1>
          <h1>Collaboration</h1>
          <h1 className='text-base font-thin w-11/12'>Elevate your team management with our sophisticated platform.
          Seamlessly streamline CRUD operations on employee data to enhance collaboration and drive productivity.</h1>
        </div>
        </div>
        <div className="right">
          <img src={image} className='h-full w-full rounded-xl mr-80 mb-5' />
        </div>
      </div>
    </div>
  )
}

export default Home
