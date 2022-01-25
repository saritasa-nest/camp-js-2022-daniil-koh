import {signIn} from "../firestore";

export const AuthHandlers: any = () => {
    const authForm:Element = document.getElementsByClassName('auth')[0]
    authForm.addEventListener('submit', authFormAuthetication , {once:true})

    async function authFormAuthetication(event: any): Promise<void> {
      event.preventDefault()
      const email: string = event.target.querySelector('#email').value
      const password: string = event.target.querySelector('#password').value
      signIn(email, password)
      }
    }
