import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { JobOfferCardItemComponent } from './job-offer-card-item/job-offer-card-item.component';
import { JobOfferCardListComponent } from './job-offer-card-list/job-offer-card-list.component';
import { JobOfferCardViewComponent } from './job-offer-card-view/job-offer-card-view.component';
import { JobReactiveFormComponent } from './forms/job-reactive-form/job-reactive-form.component';
import { Route, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { NonAuthGuard } from './guards/non-auth.guard';

const routers: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NonAuthGuard]
  
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NonAuthGuard]
  },
  {
    path: 'jobs',
    component: JobOfferCardListComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'jobs/create',
    component: JobReactiveFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'jobs/edit/:id',
    component: JobReactiveFormComponent,
    canActivate: [AuthGuard]
  }
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    JobOfferCardItemComponent,
    JobOfferCardListComponent,
    JobOfferCardViewComponent,
    JobReactiveFormComponent,
    LoginComponent,
    RegisterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routers)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
