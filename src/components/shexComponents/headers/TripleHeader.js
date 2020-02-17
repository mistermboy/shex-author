import React,{useState,useContext} from 'react';
import {ShapesContext} from '../../../App';

const primitives = ['String','Integer','Date','Boolean'];

function TripleHeader (props) {

    const context = useContext(ShapesContext); 
    const {triple,deleteTriple,customizeTriple} = props;

    const [name,setName] = useState(triple.type.value);
    const [primitive,setPrimitive] = useState(triple.value.value);  
    


    const handleNameChange = function(e){
        const name = e.target.value;
        triple.type.setValue(name);
        context.emit();
        setName(name);
    }

    const handlePrimitiveChange = function(e){
        const primitive = e.target.value;
        triple.value.setValue(primitive);
        context.emit();
        setPrimitive(primitive)
    }

   

    return (
        <div className="tripleHeader">
            <label>Triple </label>
            <input  type="text" 
                    className="form-control shapeName"
                    value={name}
                    onChange={handleNameChange}/>

            <select className="customSelector" value={primitive} onChange={handlePrimitiveChange}>
                {
                    primitives.map(prim =>{
                        return <option key={prim} value={prim.toLowerCase()}>{prim}</option>
                    })
                }
            </select>                                            
            <select className="customSelector">
                <option value="">Exactly one</option>
                <option value="*">Zero or more</option>
                <option value="+">One at least</option>
                <option value="?">One or none</option>
            </select>                        
            <button className="accordion mdc-icon-button material-icons" onClick={customizeTriple}>build</button>
            <button className="deleteShapeBtn mdc-icon-button material-icons" onClick={()=>deleteTriple(triple.id)}>delete</button>
        </div>
    );
                                   
    
}


export default TripleHeader;

