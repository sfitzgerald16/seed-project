import {Component} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
    selector: 'app-signin',
    templateUrl: './signin-component.html',
})
export class SignInComponent {
  myForm: FormGroup;
  onSubmit() {
    console.log(this.myForm);
    this.myForm.reset()
  }
  ngOnInit() {
    this.myForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$")
      ]),
      password: new FormControl(null, Validators.required),
    });
  }

}
