import {signIn} from "../firestore";

export const AuthForm: Function = () => {
  const authForm:Element = document.getElementsByClassName('auth')[0]
  authForm.addEventListener('submit', authFormAuthetication)

  async function authFormAuthetication(event: any): Promise<void> {
    event.preventDefault()
    const email: string = event.target.querySelector('#email').value
    const password: string = event.target.querySelector('#password').value
    await signIn(email, password)
  }

  return(`<body>
<main>
<div class="container">
  <h5 class="indigo-text">Please, login into your account</h5>
</div>
  <div class="container">
<div class="z-depth-1 grey lighten-4 row" style="display: inline-block; padding: 32px 48px 0px 48px; border: 1px solid #EEE;">

<form class="col s12" method="post">
<div class='row'>
<div class='col s12'>
  </div>
  </div>

  <div class='row'>
<div class='input-field col s12'>
<input class='validate' type='email' name='email' id='email' />
  <label for='email'>Enter your email</label>
</div>
</div>

<div class='row'>
<div class='input-field col s12'>
<input class='validate' type='password' name='password' id='password' />
  <label for='password'>Enter your password</label>
</div>
</div>

<br />
  <div class='row'>
<button type='submit' name='btn_login' class='col s12 btn btn-large waves-effect indigo'>Login</button>
  </div>
  </form>
  </div>
  </div>
  <a href="#!">Create account</a>

<div class="section"></div>
  <div class="section"></div>
  </main>

  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.1/jquery.min.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/js/materialize.min.js"></script>
  </body>`)
}

