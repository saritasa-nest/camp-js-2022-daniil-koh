import {AuthForm} from "./Auth/AuthForm";
// import {AuthHandlers} from "./Auth/AuthHandlers";
import {Table} from "./Table/Table";

let authorization:boolean = false;

export const changeAuthStatus = (value:boolean): void => {
  authorization = value;
  render()
}
export const getAuthStatus = (): boolean => authorization

function render(){
    const mainDiv: Element = document.getElementsByClassName('main')[0]
    const authForm: Element = document.getElementsByClassName('auth')[0]
  if (getAuthStatus()){
    mainDiv.innerHTML = Table()
    authForm.innerHTML = ''
  }else{
    authForm.innerHTML = AuthForm()
    mainDiv.innerHTML = ''
      console.log('it is work')
  }
}

render()
