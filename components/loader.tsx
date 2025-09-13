import React from 'react'
import { Loader2 } from "lucide-react"

interface LoaderProps {
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ className }) => {
  return (
    <div className={`animate-spin`}>
        <Loader2 />
    </div>
  )
}

export default Loader