
import React,{useState,useContext,useEffect} from 'react';
import {ShapesContext} from '../../../../App';

let Editor = require('../../../../entities/editor.js');

function PrefixedComp (props) {

    const context = useContext(ShapesContext);
 
    const {shape,triple,type} = props;

    let initialValue=shape.type.value;
    if(type !='shape'){
      initialValue = triple.type.value
    }

    const [value,setValue] = useState(initialValue);


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

    const handleChange = (e) =>{
          setValue(e.target.value);
          if(type == 'shape'){
            context.setShapeTypeValue(shape.id,e.target.value);
          }else{
            context.setTripleTypeValue(shape.id,triple.id,e.target.value);
          }
    }


  

    return  (<div className='row col-sm'>
                <select className={getPrefixContex()+' col-sm form-control'}>
                  { 
                    context.prefixes.map((pre) =>{
                      return <option key={pre.key} value={pre.val}>{pre.key}</option>
                    })
                  }
                </select>
                   
                <input  className={shape.type.value+' form-control col-sm'} 
                        context="text" 
                        value={value}
                        onChange={handleChange} />
               
              </div>);
              
                               
    

}


    

export default PrefixedComp;

