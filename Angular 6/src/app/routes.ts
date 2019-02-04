import { RouterModule,Routes } from '@angular/router';
import { NgModule }              from '@angular/core';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CreateComponent } from './customer/create/create.component';
import { AgentComponent } from './components/agent/agent.component';
import { EditComponent } from './customer/edit/edit.component';
import { CustomerlistComponent } from './customer/customerlist/customerlist.component';
import { CustomerComponent } from './customer/customer/customer.component';
import { AuthGuard } from './auth/auth.guard';

export const appRoutes: Routes = [
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: 'userprofile', component: UserProfileComponent,canActivate:[AuthGuard]
    },
    {
        path: 'customer', component: CustomerComponent,canActivate:[AuthGuard]
    },
    { path: 'create', component: CreateComponent,canActivate:[AuthGuard]
    },
    { path: 'agent', component: AgentComponent,canActivate:[AuthGuard]
    },
    {
        path: 'edit/:id', component: EditComponent,canActivate:[AuthGuard]
    },
    {
        path: 'customerList', component: CustomerlistComponent,canActivate:[AuthGuard]
    },
    {
        path: '', redirectTo: '/customer', pathMatch: 'full'
    }
];

@NgModule({
    imports: [
      RouterModule.forRoot(
        appRoutes,
        { enableTracing: true } // <-- debugging purposes only
      )
    ],
    exports: [
      RouterModule
    ]
  })
  export class AppRoutingModule {}