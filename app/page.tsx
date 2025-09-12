import React from 'react'
import { auth } from "@/auth";
import { redirect } from 'next/navigation';

const Home = async() => {
  const session = await auth();
  if(session?.user){
     redirect("/dashboard")
  }
  return (
    <div className='w-full min-h-screen flex items-center justify-center'>Home</div>
  )
}

export default Home