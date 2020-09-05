import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { $loginAnimations } from "./login-animations";
import { $authProviders } from "./providers";
import { AuthService, User } from "@wizdm/connect/auth";
// import {UserProfile} from '../user/user-profile.service';

type pageTypes = 'register' | 'signIn' | 'forgotPassword' | 'resetPassword' | 'changePassword' | 'changeEmail' | 'delete';

let $msgs = {
  register: {// Register new user page
    title: 'Register',
    caption: 'Register with my email' 
  }, 
  signIn: { // Regular sign-in page
    title: 'Sign-in',
    caption: 'Sign-in with my email' 
  },
  forgotPassword: {// Ask for password reset page
    title: 'Reset password',
    caption: 'Reset the password' 
  },
  resetPassword: {// Reset to a new password page (2nd step after forgotPassword)
    title: 'New password',
    caption: 'Change the password' 
  },
  changeEmail: {// Change the email 
    title: 'Change email',
    caption: 'Update the email' 
  },
  changePassword: {// Change the password (while authenticated)
    title: 'Change password',
    caption: 'Update the password' 
  },
  delete: {// Delete the user account
    title: 'Delete account',
    caption: 'delete the account' 
  }
};

@Component({
  selector : 'wm-login',
  templateUrl : './login.component.html',
  styleUrls : ['./login.component.scss'],
  animations: $loginAnimations
})
export class LoginComponent implements OnInit{

  readonly msgs = $msgs;
  public page: pageTypes;
  private code: string;

  readonly form: FormGroup;
  private name: FormControl;
  private email: FormControl;
  private password: FormControl;
  private newEmail: FormControl;
  private newPassword: FormControl;
  
  private providers = $authProviders;
  private hide = true;
  public error = null;
   public errorCode = null;
  public progress = false;
  
  constructor(private auth: AuthService,
              // private user: UserProfile,
              private route : ActivatedRoute,
              private router: Router) {

    this.name = new FormControl(null, Validators.required);
    this.email = new FormControl(null, [Validators.required, Validators.email]);
    this.password = new FormControl(null, Validators.required);
    this.newEmail = new FormControl(null, [Validators.required, Validators.email]);
    this.newPassword = new FormControl(null, Validators.required);

    this.form = new FormGroup({});

    this.switchPage('signIn');
  }

  ngOnInit() {

    // this.auth.extendUser(this);

    // Discrimnate among the login option using the queryParameters
    this.route.queryParamMap.subscribe( (params: ParamMap) => {

      let mode  = params.get('mode') || 'signIn';
      this.code = params.get('oobCode');

      console.log('login mode: ', mode);

      switch(mode) {

        case 'signOut':
        this.signOut();
        break;

        // case 'verifyEmail':
        // this.verifyEmail( this.code );
        // break;

        default:
        this.switchPage(mode as pageTypes);
      }
    });
  }

  private switchPage(page: pageTypes) {

    // Removes all the controls from the form group
    Object.keys(this.form.controls).forEach( control => {
      this.form.removeControl(control);
    });
    
    // Add the relevant controls to the form according to selected page
    switch(this.page = page) {

      case 'register':
      this.form.addControl('name', this.name);
      this.form.addControl('email', this.email);
      this.form.addControl('password', this.password);
      break;

      default:
      case 'signIn':
      this.form.addControl('email', this.email);
      this.form.addControl('password', this.password);      
      break;

   
    }
  }

  // private showError(error: string) {

  //   this.error = error;
  //   this.progress = false;
  //   setTimeout(() => this.error = null, 5000);
  // }

  private reportSuccess(message: string, jumpTo?: string) {
    
    this.progress = false;
    
    console.log(message);

    if(jumpTo) {
      
      this.router.navigate(['.'], { 
        relativeTo: this.route,
        queryParams: {
          mode: jumpTo
        } 
      });
    }
  }

  public loginAction() {
    
    switch(this.page) {

      default:
      case 'signIn':
      this.signIn( this.email.value, 
                   this.password.value );
      break;

      case 'register':
      this.registerNew( this.email.value, 
                        this.password.value, 
                        this.name.value );
      break;
    }
  }

    public signInWith(provider: string) { 
    // Signing-in with a provider    
    this.auth.signInWith( provider )
      .then( user => { 
        // Tracks the activity with analytics
        // this.gtag.login(user?.providerId);
        // Creates the new user user if needed, keeps the existing one otherwise 
        this.user.register(user)
          // Closes the dialog returning the user
          .then( () => this.reportSuccess('Signed in using ' + provider) );
      })
      // Dispays the error code, eventually
      .catch( error => this.showError(error.code) );
  }

  private showError(error: string) {
    // Stops the progress, if any
    this.progress = false;
    // Sets the error code to be displayed
    this.errorCode = error;
    // Makes sure to turn off the error message after 10s
    setTimeout(() => this.errorCode = null, 10000);
  }

  // private signInWith(provider: string) { 

  //   this.progress = true;

  //   // Signing-in with a provider    
  //   this.auth.signInWith( provider )
  //     .then( () => this.reportSuccess('Signed in using ' + provider) )
  //     .catch( error => {
  //       // Keep the rror code on failure
  //       this.showError(error.code);
  //     })
  // }

  private signIn(email: string, password: string) {
    
    this.progress = true;

    // Sign-in using email/password
    this.auth.signIn(email, password)
      .then( () => this.reportSuccess('Signed in as ' + email) )
      .catch( error => {
      // Keep the rror code on failure
      this.showError(error.code);
    });
  }

  private registerNew(email: string, password: string,name: string) {

    this.progress = true;

    // Registering a new user with a email/password
    this.auth.registerNew(email, password, name )
      .then( () => this.reportSuccess('Registered as ' + email) )
      .catch( error => {
        // Keep the rror code on failure
        this.showError(error.code);
      });
  }

  public onUserCreate(user: User): Promise<boolean> {
    console.log('Extending new user: ', user.uid);
    return Promise.resolve(true);
  }


  public onUserDelete(user: User): Promise<boolean> {
    console.log('Wiping user: ', user.uid);
    return Promise.resolve(true);
  }

  private signOut() {

    this.progress = true;

    this.auth.signOut()
      .then( () => {
        this.reportSuccess('Signed out', 'signIn');
      })
      .catch( error => {
        // Keep the rror code on failure
        this.showError(error.code);
      })
  }
}  
