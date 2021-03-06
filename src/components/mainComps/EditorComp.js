import React, {useState,useContext,useEffect,useRef} from 'react';
import 'yashe/dist/yashe.min.css';
import {AppContext} from '../../App';

import YASHE from 'yashe';
import Editor from '../../entities/editor';

import yasheUtils from '../../utils/yasheUtils';
import Prefix from '../../entities/shexEntities/shexUtils/prefix';

import '../../css/Yashe.css';
import '../../css/themes/author.css';
import '../../css/themes/author-dark.css';

const ERROR_EDITOR_MSG = 'Ops... There are some errors in the editor';
const COMPLEX_SHAPE_MSG = 'Sorry that Shape is too complex for me';

function EditorComp() {

    const [yashe,setYashe] = useState(null);
    const divRef = useRef(null);
    const context = useContext(AppContext);
    let oldShapes = [];
    

    const defaultPrefixes = [
                new Prefix('','http://example.org/',0),
                new Prefix('schema','http://schema.org/',1),
                new Prefix('xsd','http://www.w3.org/2001/XMLSchema#',2)
    ]

    useEffect(() => {
    
        if (!yashe) {
            const options = {
                persistent:false,
                lineNumbers: true,
                showTooltip:true,
                theme:'author-dark',
                value:yasheUtils.DEFAULT_SHAPE
            }
            
            const y = YASHE(divRef.current,options);

            
            y.on('humanEvent', function(shapes,width) {
                Editor.getInstance().draw(shapes);
                //console.log(shapes)
                oldShapes = shapes;
                let data={size:{width:width}};
                context.handleResize(null,data);
            });

            y.on('prefixChange', function(prefixes,width) {
                Editor.getInstance().draw(oldShapes,prefixes);
                console.log(width)
                let data={size:{width:width}};
                context.handleResize(null,data);
            });

            y.on('forceError', function(prefixes) {
                hideError();
                loading();
                setTimeout(function() {
                    loaded();  
                    showError(COMPLEX_SHAPE_MSG);
                },500)
            });

            
            const debounce = function(func, wait, immediate) {
                let timeout; let result;
                return function() {
                    const context = this; 
                    const args = arguments;
                    const later = function() {
                    timeout = null;
                    if (!immediate) result = func.apply(context, args);
                    };
                    const callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if (callNow) result = func.apply(context, args);
                    return result;
                };
            };
           
/*
           
            y.on('keyup',debounce(function( e ) {
                    if(!y.hasErrors(y)){
                                hideError();
                                let newShapes = getNewShapes();
                                //console.log(newShapes)
                                if(oldShapes.length == newShapes.length){ //Any new shape?
                                    if(newShapes.toString()!=oldShapes.toString()){ //Any cupdate?
                                        oldShapes = replaceShapes(newShapes);
                                    }
                                }else{
                                    updateAssist();
                                } 
                            }else{
                                showError(ERROR_EDITOR_MSG);
                            }   
                }, 500)   
            ); 
        
   */

            y.on('delete', function() {
                oldShapes = replaceShapes(getNewShapes());
                updatePrefixes(defaultPrefixes);
            });

            y.on('upload', function() {
                if(!y.hasErrors()){                   
                    updateAssist();
                    updatePrefixes(getNewPrefixes());
                }
            });

           
            
            y.on('blur', function() {
                if(!y.hasErrors()){                   
                    updateAssist();
                    updatePrefixes(getNewPrefixes());
                }else{
                    showError(ERROR_EDITOR_MSG);
                }   
            });
            

            //Fired after a key is handled through a key map
            //(for example "Ctrl-Z")
        /*     y.on('keyHandled', function() {
                if(!y.hasErrors()){
                    oldShapes = replaceShapes(getNewShapes());
                    updatePrefixes(getNewPrefixes());
                }
            }); */
 
            

            //Load example from Galery
            y.on('galery', function() {
                if(!y.hasErrors()){                   
                    updateAssist();
                    updatePrefixes(getNewPrefixes());
                }
            });

        
            y.refresh();
            setYashe(y);
            
            Editor.getInstance().setYashe(y);

            oldShapes = replaceShapes(getNewShapes());
            updatePrefixes(defaultPrefixes)
        }
    }, [yashe]
    );

    

    const getNewShapes = function() {
        return yasheUtils.replaceShapes();
    }

    const getNewPrefixes = function() {
        return yasheUtils.updatePrefixes();
    }

    const replaceShapes = (newShapes)=>{
        context.replaceShapes(newShapes);
        return newShapes;
    }

    const updatePrefixes = (newPrefixes)=>{
        context.replacePrefixes(newPrefixes);
        return newPrefixes;
    }


    const updateAssist = function(){
        loading();
        setTimeout(function() {  
            oldShapes = replaceShapes(getNewShapes());                
            loaded();
        },500)
    }


     const animate = function(before1,after1,before2,after2){
        let e1 = document.getElementsByClassName(before1)[0];
        if(e1) e1.className = after1;
        let e2 = document.getElementsByClassName(before2)[0];
        if(e2) e2.className = after2;
     }

    const loading = function(){
        animate('showAsist','hideAsist','hideLoader','showLoader');
    }

    const loaded = function(){
         animate('showLoader','hideLoader','hideAsist','showAsist');
    }

    const showError = function(err){
        animate('hideError','showError','showAsist','hideAsist');
        document.getElementsByClassName('errorMsg')[0].textContent = err;
    }

    const hideError = function(){
        animate('showError','hideError','hideAsist','showAsist');
    }



    return  (<div className="col edit" ref={divRef}/>);

}

   
export default EditorComp;

