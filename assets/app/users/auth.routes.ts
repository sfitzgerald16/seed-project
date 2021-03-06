import {Routes, RouterModule} from '@angular/router';
import { LogoutComponent } from "./logout.component";
import { SignInComponent } from "./signin.component";
import { SignUpComponent } from "./signup.component";

export const AUTH_ROUTES: Routes = [
  {path: '', redirectTo: 'signup', pathMatch: 'full'},
  {path: 'signup', component: SignUpComponent},
  {path: 'signin', component: SignInComponent},
  {path: 'logout', component: LogoutComponent},
];
