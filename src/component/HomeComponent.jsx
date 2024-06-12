import React from 'react'
import LoginComponent from './LoginComponent'

const HomeComponent = () => {
    const style = {
        color: "white",
        fontSize: "50px",
        textAlign: "center",
        fontWeight: "bold",
        paddingTop: "150px",
        textShadow: "2px 2px 4px #000000"
    }
    return (
        <div>
            <p style={style}>Welcome to Employee Management System</p>
        </div>
    )
}

export default HomeComponent