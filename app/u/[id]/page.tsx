import React from 'react'

const page = ({params}: {params: {id: string}}) => {
  const { id } = params;
  return (
    <div>
        <h2>Username : {id}</h2>
    </div>
  )
}

export default page