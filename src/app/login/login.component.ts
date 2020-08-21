import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { $loginAnimations } from "./login-animations";
import { $authProviders } from "./providers";
import { AuthService } from "@wizdm/connect/auth";

type pageTypes =
  | "register"
  | "signIn"
  | "forgotPassword"
  | "resetPassword"
  | "changePassword"
  | "changeEmail"
  | "delete";

// let $msgs = {
//   register: {
//     // Register new user page
//     title: "Register",
//     caption: "Register with my email"
//   },
//   signIn: {
//     // Regular sign-in page
//     title: "Sign-in",
//     caption: "Sign-in with my email"
//   }
// };

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

  // readonly msgs = $msgs;
  public page: pageTypes;
  private code: string;

  private providers = $authProviders;
  private hide = true;
  public error = null;
  public progress = false;

  constructor(private route: ActivatedRoute, private auth: AuthService,private router: Router) {
    this.name = new FormControl(null, Validators.required);
    this.email = new FormControl(null, [Validators.required, Validators.email]);
    this.password = new FormControl(null, Validators.required);

    this.form = new FormGroup({});

    this.switchPage("signIn");
  }

  private switchPage(page: pageTypes) {
    // Removes all the controls from the form group
    Object.keys(this.form.controls).forEach(control => {
      this.form.removeControl(control);
    });

    // Add the relevant controls to the form according to selected page
    switch ((this.page = page)) {
      case "register":
        this.form.addControl("name", this.name);
        this.form.addControl("email", this.email);
        this.form.addControl("password", this.password);
        break;

      default:
      case "signIn":
        this.form.addControl("email", this.email);
        this.form.addControl("password", this.password);
        break;
    }
  }

  private signInWith(provider: string) {
    this.progress = true;

    // Signing-in with a provider
    this.auth
      .signInWith(provider)
      .then(() => this.reportSuccess("Signed in using " + provider))
      .catch(error => {
        // Keep the rror code on failure
        this.showError(error.code);
      });
  }

  private signIn(email: string, password: string) {
    this.progress = true;

    // Sign-in using email/password
    this.auth
      .signIn(email, password)
      .then(() => this.reportSuccess("Signed in as " + email))
      .catch(error => {
        // Keep the rror code on failure
        this.showError(error.code);
      });
  }

  private showError(error: string) {
    this.error = error;
    this.progress = false;
    setTimeout(() => (this.error = null), 5000);
  }

  private reportSuccess(message: string, jumpTo?: string) {
    this.progress = false;

    console.log(message);

    if (jumpTo) {
      this.router.navigate(["."], {
        relativeTo: this.route,
        queryParams: {
          mode: jumpTo
        }
      });
    }
  }

  ngOnInit() {
     this.route.queryParamMap.subscribe( (params: ParamMap) => {

      let mode  = params.get('mode') || 'signIn';
      this.code = params.get('oobCode');

      console.log('login mode: ', mode);

      switch(mode) {

        case 'signOut':
        this.signOut();
        break;

        default:
        this.switchPage(mode as pageTypes);
      }
    });
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
}
