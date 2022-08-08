import { SeriesComponent } from './series/series.component';
import { MoviedetailsComponent } from './moviedetails/moviedetails.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './auth.guard';
import { ContactsComponent } from './contacts/contacts.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  // { path: '', component: HomeComponent }, el performance mosh a7san haga
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',canActivate :[AuthGuard] , component: HomeComponent },
  { path: 'about', canActivate :[AuthGuard] , component: AboutComponent },
  { path: 'contact', canActivate :[AuthGuard] , component: ContactsComponent },
  { path: 'moviedetails/:id', canActivate :[AuthGuard] , component: MoviedetailsComponent },
  { path: 'tvDetails/:id', canActivate :[AuthGuard] , component: SeriesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
