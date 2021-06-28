import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  { path: 'tab1', canActivate: [AuthGuard], loadChildren: './tab1/tab1.module#Tab1PageModule' },
  { path: 'tab2', loadChildren: './tab2/tab2.module#Tab2PageModule' },
  { path: 'tab3', loadChildren: './tab3/tab3.module#Tab3PageModule' },
  { path: 'tab4', loadChildren: './tab4/tab4.module#Tab4PageModule' },
  { path: 'tab5', loadChildren: './tab5/tab5.module#Tab5PageModule' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'tab6', loadChildren: './tab6/tab6.module#Tab6PageModule' },
  { path: 'tab7', loadChildren: './tab7/tab7.module#Tab7PageModule' },
  { path: 'tab8', loadChildren: './tab8/tab8.module#Tab8PageModule' },
  { path: 'tab9', loadChildren: './tab9/tab9.module#Tab9PageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'account', loadChildren: './account/account.module#AccountPageModule' },
  { path: 'welcome', loadChildren: './welcome/welcome.module#WelcomePageModule' },
  { path: 'keypad', loadChildren: './keypad/keypad.module#KeypadPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'update', loadChildren: './update/update.module#UpdatePageModule' },
  { path: 'details', loadChildren: './details/details.module#DetailsPageModule' },
  { path: 'reset', loadChildren: './reset/reset.module#ResetPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
