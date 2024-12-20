import { render, screen } from '@testing-library/angular';
import { BookListComponent } from './book-list.component';
import { BooksService } from '../../services/books.service';
import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('BookListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        BookListComponent,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
  });

  it('should render a list of books', async () => {
    const mockBooksService = {
      getBooks: jest
        .fn()
        .mockReturnValue(
          of([
            { title: '1984', author: 'George Orwell', published_year: 1949 },
          ]),
        ),
    };

    await render(BookListComponent, {
      componentProviders: [
        { provide: BooksService, useValue: mockBooksService },
      ],
    });

    expect(screen.getByText('1984')).toBeTruthy();
    expect(screen.getByText('George Orwell')).toBeTruthy();
  });
});
