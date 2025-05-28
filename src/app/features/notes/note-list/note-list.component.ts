import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../../core/services/note.service';
import {NoteFormComponent} from '../note-form/note-form.component';
import {NgForOf} from '@angular/common';
import {Note} from '../../../core/models/note';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  standalone: true,
  imports: [
    NoteFormComponent,
    NgForOf
  ],
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {
  notes: any[] = [];
  selectedNote: any | null = null;

  constructor(private noteService: NoteService) {}

  ngOnInit() {
    this.notes = this.noteService.getNotes();
  }

  selectNote(note: Note) {
    this.selectedNote = note;
  }

  deleteNote(id: string) {
    this.noteService.deleteNote(id);
    this.notes = this.noteService.getNotes();
    if (this.selectedNote?.id === id) {
      this.selectedNote = null;
    }
  }

  refreshNotes() {
    this.notes = this.noteService.getNotes();
    this.selectedNote = null;
  }
}
