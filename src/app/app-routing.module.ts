import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FireguardGuard } from './guards/fireguard.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotesComponent } from './notes/notes.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'notes', component: NotesComponent, canActivate: [FireguardGuard] },
  { path: '**', pathMatch: 'full', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
