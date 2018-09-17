import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
    { path: ''                 , redirectTo:   'home'           ,  pathMatch: 'full' },
    { path: 'home'             , canActivate: [AuthGuardService],  loadChildren: './app-view/home/home.module#HomePageModule' },
    { path: 'settings'         , canActivate: [AuthGuardService],  loadChildren: './app-view/settings/settings.module#SettingsPageModule' },
    { path: 'settings/:name'   , canActivate: [AuthGuardService],  loadChildren: './app-view/settings/single-set/single-set.module#SingleSetPageModule' },
    { path: 'authentification' ,                                   loadChildren: './auth/auth.module#AuthPageModule' },
    { path: 'logOut'           , canActivate: [AuthGuardService],  loadChildren: './log-out/log-out.module#LogOutPageModule' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
