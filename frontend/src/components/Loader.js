import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <Spinner animation='border' role='statud'
    style={{
        margin: 'auto',
        width: '100px',
        height: '100px',
        display:'block'
    }}>
        <span className='sr-only'>Loading</span>
      
    </Spinner>
  )
}

export default Loader
