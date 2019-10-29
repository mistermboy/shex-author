
import React,{useState,useContext,useEffect} from 'react';
import {ShapesContext} from '../../../../App';

let Editor = require('../../../../entities/editor.js');

function PrefixedComp (props) {

    const context = useContext(ShapesContext);
 
    const {shape,triple,type} = props;

    let initialValue = shape.type.value;
    //We can't initializae initialPrefix 
    //beacause if it is called by a triple 
    //we don't know its shape's type
    let initialPrefix; 
    if(type !='shape'){
      initialValue = triple.type.value;
      initialPrefix = triple.type.prefix.prefixName;
    }else{ 
      initialPrefix = shape.type.prefix.prefixName;
    }

    const [value,setValue] = useState(initialValue);
    const [prefix,setPrefix] = useState(initialPrefix);


   const getPrefixContex = ()=>{
        let prefix = 'prefixShape';
        let context = shape.type.context;
        if( context == 'tripleName'){
            prefix = 'prefixTriple';
        }
        if( context == 'valueName'){
            prefix = 'prefixValue';
        }
        return prefix;
    }

    const handleTypeChange = (e) =>{
          setValue(e.target.value);
          if(type == 'shape'){
            context.setShapeTypeValue(shape.id,e.target.value);
          }else{
            context.setTripleTypeValue(shape.id,triple.id,e.target.value);
          }
    }

      const handlePrefixChange = (e) =>{
          setPrefix(e.target.value);
          if(type == 'shape'){
            context.setShapePrefix(shape.id,e.target.value);
          }else{
            context.setTriplePrefix(shape.id,triple.id,e.target.value);
          }
    }


  

    return  (<div className='row col-sm'>
                <select className={getPrefixContex()+' col-sm form-control'}
                        value={prefix}
                        onChange={handlePrefixChange}>
                  { 
                    context.prefixes.map((pre) =>{
                      return <option key={pre.key} value={pre.val}>{pre.key}</option>
                    })
                  }
                </select>
                   
                <input  className={shape.type.value+' form-control col-sm'} 
                        context="text" 
                        value={value}
                        onChange={handleTypeChange} />
               
              </div>);
              
                               
    

}


    

export default PrefixedComp;

