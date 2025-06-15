import React from 'react'

const NotFoundClient = () => {
    document.title = 'Not Found 404'
    return (
        <div>
            <h1 className='text-5xl text-red-500 text-center mt-8'>
                Not Found-404
            </h1>
        </div>
    )
}

export default NotFoundClient