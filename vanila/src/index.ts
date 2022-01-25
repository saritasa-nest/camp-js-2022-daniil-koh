import {AuthForm} from "./Auth/AuthForm";
import {AuthHandlers} from "./Auth/AuthHandlers";
import {monitorAuthState} from "./firestore";


function render(){
  monitorAuthState.then(()=>{

  })

  const authForm: Element = document.getElementsByClassName('auth')[0]
  authForm.innerHTML = AuthForm()
}

AuthHandlers()
render()
