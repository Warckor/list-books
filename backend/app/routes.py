from app.models import Book, db
from flask import Blueprint, jsonify, request

bp = Blueprint("routes", __name__)


@bp.route("/api/books", methods=["GET"])
def get_books():
    books = Book.query.all()
    return jsonify(
        [
            {
                "id": book.id,
                "title": book.title,
                "author": book.author,
                "published_year": book.published_year,
            }
            for book in books
        ]
    )


@bp.route("/api/books", methods=["POST"])
def add_book():
    data = request.get_json()
    book = Book(
        title=data["title"],
        author=data["author"],
        published_year=data["published_year"],
    )
    db.session.add(book)
    db.session.commit()
    return jsonify(book.to_dict()), 201


@bp.route("/api/books/<int:book_id>", methods=["PUT"])
def update_book(book_id):
    book = Book.query.get_or_404(book_id)
    data = request.get_json()
    book.title = data.get("title", book.title)
    book.author = data.get("author", book.author)
    book.published_year = data.get("published_year", book.published_year)
    db.session.commit()
    return jsonify({"message": "Book updated!"})


@bp.route("/api/books/<int:book_id>", methods=["DELETE"])
def delete_book(book_id):
    book = Book.query.get_or_404(book_id)
    db.session.delete(book)
    db.session.commit()
    return jsonify({"message": "Book deleted!"}), 204
