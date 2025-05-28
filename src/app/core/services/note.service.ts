import { Injectable } from '@angular/core';
import {Note} from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private storageKey = 'notes';

  getNotes(): Note[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  saveNotes(notes: Note[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(notes));
  }

  addNote(note: Note) {
    const notes = this.getNotes();
    notes.push(note);
    this.saveNotes(notes);
  }

  updateNote(note: Note) {
    let notes = this.getNotes();
    notes = notes.map((n) => (n.id === note.id ? note : n));
    this.saveNotes(notes);
  }

  deleteNote(id: string) {
    let notes = this.getNotes();
    notes = notes.filter((n) => n.id !== id);
    this.saveNotes(notes);
  }
}
