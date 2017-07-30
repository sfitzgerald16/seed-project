import {Component} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {User} from "./user.model";

@Component({
    selector: 'app-signin',
    templateUrl: './signin-component.html',
})
export class SignInComponent {
  myForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const user = new User(this.myForm.value.email, this.myForm.value.password);
    this.authService.signin(user)
      .subscribe(
        data => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.userId);
          this.router.navigateByUrl('/');
        },
        error => console.error(error)
      );
    this.myForm.reset()
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$")
      ]),
      password: new FormControl(null, Validators.required),
    });
  }
}
