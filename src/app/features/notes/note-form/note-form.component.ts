import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NoteService } from '../../../core/services/note.service';
import {Note} from '../../../core/models/note';
import {FormsModule} from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./note-form.component.scss']
})
export class NoteFormComponent implements OnChanges {
  @Input() note: Note | null = null;
  @Output() saved = new EventEmitter<void>();

  title = '';
  content = '';

  constructor(private noteService: NoteService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.note) {
      this.title = this.note.title;
      this.content = this.note.content;
    } else {
      this.title = '';
      this.content = '';
    }
  }

  saveNote() {
    if (!this.title.trim() || !this.content.trim()) {
      alert('Title and content are required!');
      return;
    }

    const newNote: Note = {
      id: this.note?.id || uuidv4(),
      title: this.title.trim(),
      content: this.content.trim(),
      createdAt: this.note?.createdAt || new Date(),
    };

    if (this.note) {
      this.noteService.updateNote(newNote);
    } else {
      this.noteService.addNote(newNote);
    }

    this.title = '';
    this.content = '';
    this.saved.emit();
  }
}
