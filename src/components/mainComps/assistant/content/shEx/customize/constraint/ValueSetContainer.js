import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../../../../App';
import shexUtils from '../../../../../../../utils/shexUtils';
import ValueSetComp from './ValueSetComp';

function ValueSetContainer (props) {
    const {triple} = props;
    const context = useContext(AppContext);
    const [valueSet,setValueSet]=useState([]);

    const deleteValue= function(id){
        const newValues = valueSet.filter(v => v.id != id);
        setValueSet(newValues);
        /* 
        triple.setFacets(newFacets);
        context.emit(); */
    }

    const addValue = function(){
        const value = shexUtils.addValueSetValue(valueSet);
        setValueSet([...valueSet,value]);
       // triple.addFacet(facet);
        //context.emit(); 
    }

    return (<div className='customConstraint'>
                <label >ValueSet</label>
                <div className="valueSetsCont">
                    {valueSet.map(v =>{                                        
                            return (<ValueSetComp 
                                    key={v.id}//Esto puede cascar si nos dan dos iguales
                                    valueSetValue={v}
                                    deleteValue={deleteValue} 
                                    />)
                    })}
                    
                    <button className="addFacet" title="Add Value" onClick={addValue}>+ Value</button>      
                </div>
            </div>);                          
}



export default ValueSetContainer;
