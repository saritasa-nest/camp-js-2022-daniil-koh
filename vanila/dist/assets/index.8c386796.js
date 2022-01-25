import"./modulepreload-polyfill.b7f2da20.js";import{i as l,O as n,g as d,s as c}from"./vendor.5dffac2f.js";const r=()=>` <div class='auth-form'> <div class="section"></div>
  <main>
      <div class="section"></div>

      <div class="section"></div>

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
              <label style='float: right;'>
            </div>

            <br />
            <center>
              <div class='row'>
                <button type='submit' name='btn_login' class='col s12 btn btn-large waves-effect indigo'>Login</button>
              </div>
            </center>
          </form>
        </div>
      </div>
      <a href="#!">Create account</a>

    <div class="section"></div>
    <div class="section"></div>
  </main>

</div>`;l({apiKey:"AIzaSyBKPLNeEY4yJUg0eA60u8nKg30q08zGaSM",authDomain:"vanilla-feff9.firebaseapp.com",projectId:"vanilla-feff9",storageBucket:"vanilla-feff9.appspot.com",messagingSenderId:"941812910791",appId:"1:941812910791:web:c9c94f814bb018d121cce2"});n();const m=async(t,i)=>{const a=d();c(a,t,i).then(s=>{const e=s.user;console.log(e)}).catch(s=>{const e=s.code,o=s.message;console.log(e,o)})},v=()=>{document.getElementsByClassName("auth-form")[0].addEventListener("submit",i);function i(a){a.preventDefault();const s=a.target.querySelector("#email").value,e=a.target.querySelector("#password").value;m(s,e)}},p=document.getElementsByClassName("auth")[0];p.innerHTML=r();v();
