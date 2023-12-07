import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconSearch from './IconSearch.js';

import styles from './NavBar.module.css'

function NavBar() {
  const navigate = useNavigate()
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
    navigate('/')
  }
  const toBook = () => {
    navigate('/book')
  }
  const toSearch = () => {
    navigate('/search')
  }
  return (
    <div style={{ background: NavBarBG }} className={styles.wrapper}>
      <h2 onClick={toHome} className={styles.title}>
        Movies App
      </h2>
      <h2 onClick={toBook} className={styles.title}>
        Cinema
      </h2>
      <div onClick={toSearch} className={styles.icon}>
        <IconSearch color='#fff' />
      </div>
    </div>
  )

}

export default NavBar