window.onload = function() {
    checkLoginStatus();
};

let isLoggedIn = false;
let borrowedBooks = [];

// Check login status and display appropriate section
function checkLoginStatus() {
    console.log("Checking login status:", isLoggedIn);
    if (isLoggedIn) {
        document.getElementById("login-page").style.display = "none";
        document.getElementById("book-display").style.display = "block";
    } else {
        document.getElementById("login-page").style.display = "block";
        document.getElementById("book-display").style.display = "none";
    }
}

// Handle login
function login(event) {
    event.preventDefault();
    isLoggedIn = true;
    console.log("User logged in.");
    checkLoginStatus();
}

// Handle logout
function logout() {
    isLoggedIn = false;
    console.log("User logged out.");
    checkLoginStatus();
}

// Function to display borrowed books section
function displayBorrowedBooks() {
    console.log("Displaying borrowed books.");
    document.getElementById("book-display").style.display = "none";
    document.getElementById("borrowed-books").style.display = "block";

    const borrowedBooksContainer = document.getElementById('borrowed-books-list');
    borrowedBooksContainer.innerHTML = '';

    borrowedBooks.forEach(book => {
        const bookElement = document.createElement('p');
        bookElement.textContent = book.title;
        
        const returnButton = document.createElement('button');
        returnButton.textContent = "Return Book";
        returnButton.className = "responsive-button";
        returnButton.onclick = function() {
            returnBook(book);
        };

        borrowedBooksContainer.appendChild(bookElement);
        borrowedBooksContainer.appendChild(returnButton);
    });
}

// Function to display book search section
function displayBookSection() {
    console.log("Displaying book section.");
    document.getElementById("book-display").style.display = "block";
    document.getElementById("borrowed-books").style.display = "none";
}

// Mock function to search books (replace this with your API integration or real logic)
function searchBooks() {
    const booksContainer = document.getElementById("books-container");
    booksContainer.innerHTML = ''; // Clear previous results

    // Example books array (replace this with your dynamic data or API results)
    const books = [
        { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
        { title: '1984', author: 'George Orwell' },
        { title: 'To Kill a Mockingbird', author: 'Harper Lee' }
    ];

    books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book';

        const titleElement = document.createElement('h3');
        titleElement.textContent = book.title;
        bookDiv.appendChild(titleElement);

        const authorElement = document.createElement('p');
        authorElement.textContent = `Author: ${book.author}`;
        bookDiv.appendChild(authorElement);

        const borrowButton = document.createElement('button');
        borrowButton.textContent = "Borrow Book";
        borrowButton.className = "responsive-button";
        borrowButton.onclick = function() {
            borrowBook(book);
        };
        bookDiv.appendChild(borrowButton);

        booksContainer.appendChild(bookDiv);
    });
}

// Function to handle borrowing books
function borrowBook(book) {
    borrowedBooks.push(book);
    console.log(`Borrowed: ${book.title}`);
    alert(`${book.title} has been borrowed.`);
    displayBorrowedBooks(); // Update the borrowed books section
}

// Function to handle returning books
function returnBook(book) {
    borrowedBooks = borrowedBooks.filter(b => b.title !== book.title);
    console.log(`Returned: ${book.title}`);
    alert(`${book.title} has been returned.`);
    displayBorrowedBooks(); // Update the borrowed books section
}
