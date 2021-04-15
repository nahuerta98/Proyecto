import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { LoginComponent } from './pages/login/login.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';
import { RegisterComponent } from './pages/register/register.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { GuardService } from './services/guard/guard.service';

const routes: Routes = [
  
  { path: '', component: LoginComponent},

  { path: 'login', component: LoginComponent},

  { path: 'register', component: RegisterComponent},

  { path: 'recoverPassword', component: RecoverPasswordComponent},

  { path: 'newPassword', component: NewPasswordComponent},

  { path: 'usersList', component: UsersListComponent},

  { path: 'addUser/:id', component: AddUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
