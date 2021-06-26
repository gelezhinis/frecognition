import React from 'react';
import Tilt from 'react-vanilla-tilt';

import logo from './logo.jpg';


const Logo = () => {
   return (
      <div className='ma4 mt3'>
         <Tilt 
            className="Tilt br2 shadow-2" 
            options={{ max : 100 }} style={{ height: 140, width: 150 }} 
         >
            <div className="Tilt-inner"><img src={logo} alt='logo' /></div>
         </Tilt>
      </div>
   );
}

export default Logo;