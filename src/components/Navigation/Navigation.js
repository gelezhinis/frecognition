import React from 'react';

import './Navigation.css';

const Navigation = ({onRouteChange, isSignedIn}) => {
   if (isSignedIn) {
      return (
         <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <div className='navigation-buttons'>
               <p onClick={() => onRouteChange('signout')} className='f3 br2 link dim black grow pa3 pointer'>Sign Out</p>
            </div>
         </nav>
      );
   } else {
      return (
         <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <div className='navigation-buttons'>
               <p onClick={() => onRouteChange('signin')} className='f3 br2 link dim black grow pa3 pointer'>Sign In</p>
               <p onClick={() => onRouteChange('register')} className='f3 br2 link dim black grow pa3 pointer'>Register</p>
            </div>
         </nav>
      );
   }
}

export default Navigation;