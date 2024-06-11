import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { FormsModule} from '@angular/forms';

import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { EditBookComponent } from './admin/edit-book/edit-book.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MessageDialogComponent } from './common/message-dialog/message-dialog.component';
import { ConditionalDatePipe } from './conditional-date.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    WelcomeComponent,
    EditBookComponent,
    ConfirmationComponent,
    MessageDialogComponent,
    ConditionalDatePipe
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
