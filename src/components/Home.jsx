import React from 'react'
import Products from './Products'

const hero = {
    height: '600px',
    backgroundImage: `url(./assets/bg.webp)`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    // position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '2rem',
    color: '#fff'
}

const Home = () => {
    return (
        <>
        <div style={hero}>
            Home
        </div>
        <Products />
        </>
    )
}
export default Home