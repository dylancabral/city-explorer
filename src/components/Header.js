import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import  Navbar from 'react-bootstrap/Navbar' 


class Header extends React.Component{
  render(){
    return(
      <header>
        <Navbar>
          <h1>
            City Explorer
          </h1>
          <p>
            Explore a city with the input below.
          </p>
        </Navbar>
      </header>
    )
  }
}

export default Header; 
