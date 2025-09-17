import React from 'react'
import { auth } from "@/auth";
import { redirect } from 'next/navigation';
import LandingPage from './Landing';

const Home = async() => {
  const session = await auth();
  if(session?.user){
     redirect("/dashboard")
  }
  return (
   <LandingPage />
  )
}

export default Home