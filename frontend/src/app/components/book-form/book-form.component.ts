import { Component, inject } from '@angular/core';
import { BooksService } from '../../services/books.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-book-form',
  imports: [FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss',
})
export class BookFormComponent {
  bookForm: FormGroup;
  submitted = false;
  successMessage = '';

  private bookService = inject(BooksService);
  private form = inject(FormBuilder);
  private router = inject(Router);

  constructor() {
    // Campos del formulario
    this.bookForm = this.form.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      published_year: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{4}$')],
      ],
    });
  }

  get f() {
    return this.bookForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    console.log(this.bookForm.value);

    if (this.bookForm.invalid) {
      return;
    }

    this.bookService.addBook(this.bookForm.value).subscribe({
      next: () => {
        this.successMessage = 'Libro añadido correctamente';
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log('Error al añadir el libro', err);
      },
    });
  }
}
