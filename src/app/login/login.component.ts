import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";


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
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  private form: FormGroup;
  private name: FormControl;
  private email: FormControl;
  private password: FormControl;
  constructor() {}

  ngOnInit() {}
}
