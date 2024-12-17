import { HttpClient } from '@angular/common/http';
import { Component, inject, WritableSignal, signal } from '@angular/core';
import { Book } from '../../models/book';
import { BooksService } from '../../services/books.service';

@Component({
  standalone: true,
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent {
  private http = inject(HttpClient);
  books: WritableSignal<Book[]> = signal([]);
  bookService = inject(BooksService);

  constructor() {
    this.fetchBooks();
  }

  fetchBooks() {
    this.bookService.getBooks().subscribe((data) => {
      this.books.set(data);
    });
  }
}
