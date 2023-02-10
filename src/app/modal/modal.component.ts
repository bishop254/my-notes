import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { map, Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NotesComponent } from '../notes/notes.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  note = new FormControl('', [Validators.required]);
  instance = new FormControl('', [Validators.required]);

  addNote$!: Observable<any>;

  constructor(
    private auth: AuthService,
    private ref: MatDialogRef<ModalComponent>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  addNote() {
    console.log(this.note.value);
    console.log(this.instance.value);

    let body = {
      note: this.note.value,
      instance: this.instance.value,
    };

    this.addNote$ = this.auth.addNote(body).pipe(
      map((resp) => {
        this.ref.close();
        this.snackBar.open('Note Added', 'Status', {
          duration: 2 * 1000,
        });

        return resp;
      })
    );
  }
}
