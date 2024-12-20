def test_get_books(client):
    response = client.get("/api/books")
    assert response.status_code == 200
    assert isinstance(response.json, list)


def test_post_books(client):
    new_book = {"title": "1984", "author": "George Orwell", "published_year": 1949}

    response = client.post("/api/books", json=new_book)
    assert response.status_code == 201
    data = response.get_json()
    assert data["title"] == new_book["title"]
    assert data["author"] == new_book["author"]
    assert data["published_year"] == new_book["published_year"]
