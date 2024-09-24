// Book array and Borrowing history
let books = JSON.parse(localStorage.getItem('books')) || [];
let borrowHistory = JSON.parse(localStorage.getItem('borrowHistory')) || [];

// DOM Elements
const bookForm = document.getElementById('book-form');
const bookList = document.getElementById('book-list');
const historyList = document.getElementById('history-list');
const searchInput = document.getElementById('search-input');

// Display books
function displayBooks(filteredBooks = books) {
    bookList.innerHTML = '';
    filteredBooks.forEach((book, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${book.title}</strong> by ${book.author} 
            <em>(${book.category})</em> 
            <button onclick="borrowBook(${index})">Borrow</button>
            <button onclick="removeBook(${index})">Remove</button>
        `;
        bookList.appendChild(li);
    });
}

// Display Borrow History
function displayHistory() {
    historyList.innerHTML = '';
    borrowHistory.forEach((entry) => {
        const li = document.createElement('li');
        li.innerHTML = `${entry.title} borrowed by ${entry.borrower} on ${entry.date}`;
        historyList.appendChild(li);
    });
}

// Add Book
bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const category = document.getElementById('category').value;

    const newBook = { title, author, category };
    books.push(newBook);
    localStorage.setItem('books', JSON.stringify(books));
    displayBooks();
    bookForm.reset();
});

// Borrow Book
function borrowBook(index) {
    const borrower = prompt('Enter borrower name:');
    if (borrower) {
        const book = books[index];
        const borrowEntry = {
            title: book.title,
            borrower,
            date: new Date().toLocaleDateString()
        };
        borrowHistory.push(borrowEntry);
        localStorage.setItem('borrowHistory', JSON.stringify(borrowHistory));
        displayHistory();
    }
}

// Remove Book
function removeBook(index) {
    books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(books));
    displayBooks();
}

// Search Book
document.getElementById('search-button').addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm) || 
        book.author.toLowerCase().includes(searchTerm)
    );
    displayBooks(filteredBooks);
});

// Initial display of books and history
displayBooks();
displayHistory();
