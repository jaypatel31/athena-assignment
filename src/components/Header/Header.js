import React from 'react'
import styles from '../../styles/Header.module.css';
import Image from 'next/image'
import logo from '../../images/logo.png'

const Header = () => {
  return (
    <div className={styles.header_container}>
        <div className={styles.header_left}>
            <Image src={logo} alt='athenahealth logo' width={36} height={36}/>
            <div>
                Product 
            </div>
            <div>
                Our Story
            </div>
            <div>
                Resources
            </div>
        </div>
        <div className={styles.header_right}>
            <button>Book a demo</button>
        </div>
    </div>
  )
}

export default Header