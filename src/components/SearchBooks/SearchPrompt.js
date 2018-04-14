import React from 'react'
import bg from '../../img/bird_bg.JPG'

const componentStyle = {
  backgroundImage:  `url(${bg})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  padding:0,
  opacity: "0.2",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  position: "fixed",
};

const textStyle = {
  fontSize: "40px",
  textAlign: "center",
  color:"rgb(46, 124, 49)",
  fontFamily: "Times New Roman, Times, serif",
}

function SearchPrompt (props){
  return (
    <div>
    <div className="search-prompt" style={componentStyle}>
    </div>
      <p style={textStyle}> Find a 📖 by <br/> typing in the Search Bar ☝️  </p>
    </div>
  )
}


export default SearchPrompt;