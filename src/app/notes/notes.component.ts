import { Component } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent {
  /** Based on the screen size, switch from standard to one column per row */
  notesData$!: Observable<any>;
  delNotes$!: Observable<any>;
  isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay()
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private auth: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadNotes();

    this.dialog.afterAllClosed.subscribe((resp) => {
      this.loadNotes();
    });
  }

  loadNotes() {
    this.notesData$ = this.auth.getNotes();
  }

  openDialog(): void {
    this.dialog.open(ModalComponent, {
      width: '350px',
    });
  }

  deleteNote(id: string | number) {
    let body = {
      noteId: id,
    };

    console.log(body);

    this.delNotes$ = this.auth.deleteNote(body).pipe(
      map((resp) => {
        this.loadNotes();
        return resp;
      })
    );
  }
}
