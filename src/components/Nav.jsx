import {React, useEffect, useState} from 'react'
import './Nav.css'

export const Nav = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
        setDark(window.scrollY > 100);
    })
    return () => {
      // window.removeEventListener("scroll")
    }
 })
  
  
  return (
    <div className={`nav-container ${dark && "nav-container-dark"}`}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" className="nav-logo" />
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPsVAeFlYeYOEUzb3TV1ML91_LPkkFML5lRQcMdr9nQu2CqO-WzT-RLmkM5_cOKvkaBkI&usqp=CAU" alt="Minha foto" className="nav-avatar" />
    </div>
  )
}
