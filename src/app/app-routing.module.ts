import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FeedsComponent } from './feeds/feeds.component';

// import { DatabaseComponent } from './database/database.component';
// import { NotFoundComponent } from './not-found/not-found.component';

// Define navigation routes
const routes: Routes = [
  { path: 'feeds', component: FeedsComponent }, 

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent }, 
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}