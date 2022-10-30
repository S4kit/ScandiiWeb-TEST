import React from "react";

import "../App.css"

class Header extends React.Component {
  render() {
    return (

      <header>

        <h1 style={{ textAlign: 'left' }}>{this.props.title}</h1>


      </header>
    );
  }
}

export default Header;
