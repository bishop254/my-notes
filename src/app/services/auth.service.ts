import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getNotes() {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Token 02500722992078a1a2824fb25cc622994c1eb448',
    });
    return this.http
      .get('https://api.ona.io/api/v1/notes', {
        headers,
      })
      .pipe(
        map((resp) => {
          console.log(resp);
          console.log('resp');
          return resp;
        })
      );
  }
}
