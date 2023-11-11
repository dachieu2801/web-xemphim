import React, { useState } from 'react';
import IconSearch from './IconSearch.js';

import styles from './NavBar.module.css'


function NavBar() {

  const [NavBarBG, setNavBarBG] = useState('rgba(0,0,0,0)')

  //thay đổi BG khi lăn chuột từ 0-100px
  function changeBackgroundHandle(params) {
    window.addEventListener('scroll', () => {
      // console.log(window.scrollY);
      if (window.scrollY > 0) {
        setNavBarBG('rgba(0,0,0,0)')
      }
      if (window.scrollY > 30) {
        setNavBarBG('rgba(0,0,0,0.25)')
      }
      if (window.scrollY > 60) {
        setNavBarBG('rgba(0,0,0,0.5)')
      }
      if (window.scrollY > 100) {
        setNavBarBG('rgba(0,0,0,1)')
      }
    })
  }
  changeBackgroundHandle()

 //chuyển page
  const toHome = () => {
    window.location.replace('/')
  }
  const toSearch = () => {
    window.location.replace('/search')
  }
  return (
    <div style={{ background: NavBarBG }} className={styles.wrapper}>
      <h2 onClick={toHome} className={styles.title}>
        Movies App
      </h2>
      <div onClick={toSearch} className={styles.icon}>
        <IconSearch color='#fff' />
      </div>
    </div>
  )

}

export default NavBar