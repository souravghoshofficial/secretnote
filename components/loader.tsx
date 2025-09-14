import React from 'react'
import { Loader2 } from "lucide-react"


const Loader = () => {
  return (
    <div className={`animate-spin`}>
        <Loader2 />
    </div>
  )
}

export default Loader