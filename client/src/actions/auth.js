import { AUTH } from '../constants/actionTypes.js';
import * as api from '../api/index.js';




export const signin = (formData,history) => async (dispatch)=>{
    
  
       try{
         
        
          const {data} = await api.signIn(formData);
          

          dispatch({type: AUTH , data});
           history('/');
       }
       catch(error)
       {
          console.log(error);
       }
};



export const signup = (formData,history) => async (dispatch)=>{
    try{
        //Sign up user...
        
        const {data} = await api.signUp(formData);
        
        dispatch({type: AUTH , data});
        history('/');
    }
    catch(error)
    {
       console.log(error);
    }
};
