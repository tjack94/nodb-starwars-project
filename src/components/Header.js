import React from "react"
import './Header.css'

const Header = ({children})=> (
    <header>
        <h1 className= "title">{children}</h1>
    </header>
)
export default Header