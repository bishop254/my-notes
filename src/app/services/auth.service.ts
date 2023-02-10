import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    firebase.initializeApp(environment.firebase);
  }

  getNotes() {
    return this.http.get('http://localhost:6060/allNotes').pipe(
      map((resp) => {
        console.log(resp);
        console.log('resp');
        return resp;
      })
    );
  }

  addNote(modal: any) {
    return this.http.post('http://localhost:6060/addNote', modal).pipe(
      map((resp) => {
        console.log(resp);
        console.log('resp');
        return resp;
      })
    );
  }

  deleteNote(modal: any) {
    return this.http
      .delete(`http://localhost:6060/deleteNote/${modal.noteId}`)
      .pipe(
        map((resp) => {
          console.log(resp);
          console.log('resp');
          return resp;
        })
      );
  }

  async SignIn(email: string, password: string) {
    try {
      let loginAction = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      this.router.navigate(['/notes']);

      this.snackBar.open('Login Success', 'Success', {
        duration: 2 * 1000,
      });

      localStorage.setItem('userId', loginAction.user?.uid!);
      localStorage.setItem('token', loginAction.user?.refreshToken!);
      localStorage.setItem(
        'userData',
        JSON.stringify(loginAction.user?.providerData[0])
      );

      // this.userData = loginAction.user;
    } catch (error) {
      this.snackBar.open('Login Failure/Invalid credentials', 'Failure', {
        duration: 2 * 1000,
      });
    }
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('userData')!);
    return user !== null ? true : false;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/home']);
  }
}
