import React from 'react';

import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onImageSubmit}) => {
   return (
      <div>
         <p className='f4'>
            This Magic App will detect faces in your images. Give it a try!
         </p>
         <div className='center'>
            <div className='form center pa4 br3 shadow-4'>
               <input 
                  className='f4 pa2 w-70 center outline-0' 
                  type='text' 
                  onChange={onInputChange}
               />
               <button 
                  className='w-30 grow f4 link ph3 pv2 dib white bg-mid-gray'
                  onClick={onImageSubmit}
               >
                  Detect
               </button>
            </div>
         </div>
      </div>
   );
}

export default ImageLinkForm;