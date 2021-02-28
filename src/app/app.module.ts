import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopBarModule } from './shared/components/top-bar/top-bar.module';
import { NavBarModule } from './shared/components/nav-bar/nav-bar.module';
import { MatIconModule } from '@angular/material/icon';
import { CategoryFormComponent } from './shared/components/category-form/category-form.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TopBarModule,
    NavBarModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
