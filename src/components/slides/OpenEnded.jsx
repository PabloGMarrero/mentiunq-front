import React from 'react';
import { TagCloud } from 'react-tagcloud'
import { useState, useEffect } from 'react';


const OpenEnded = ({question}) => {
  const [options] = useState([]);

  useEffect(()=>{
    if(question){

      if (question.mentiOptions != undefined) {
        processOptions(question.mentiOptions);
      }
    }
  }, [question])
  
  const processOptions = (mentiOptions) => {
    mentiOptions.forEach(mentiOption => {      
      let foundElement = options.find(element => element.value.toLowerCase() === mentiOption.name.toLowerCase());
      if (foundElement === undefined) {
        options.push({value: mentiOption.name, count: 1});
      } else {
        foundElement.count = foundElement.count + 1; 
      }  
    })
  };

    return < hola/>

}

export default OpenEnded;