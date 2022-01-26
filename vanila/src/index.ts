import {AuthForm} from "./Auth/AuthForm";
import {Table} from "./Table/Table";
import {Navbar} from "./Navbar/Navbar";

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
    mainDiv.innerHTML = Navbar() + Table()
    authForm.innerHTML = ''
  }else{
    authForm.innerHTML = AuthForm()
      console.log(mainDiv.children.length)
    for (let i = 0; i < mainDiv.children.length; i++){
      const childElement: Element| null = mainDiv.children.item(i)
      if (childElement) {
        childElement.innerHTML = ''
      }
    }
      console.log('it is work')
  }
}

render()
