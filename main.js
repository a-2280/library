// Our array to store all our book objects
const myLibrary = [];

// Book Constructor Function
// This is a template for creating book objects. When we use 'new Book()',
// the constructor function creates a new object with these properties and methods
function Book(title, author, pages, read) {
  // 'this' refers to the new object being created
  // Each new book will get its own copy of these properties
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = read;

  // Methods added to the object
  // Each book object gets its own copy of these methods
  this.toggleRead = function () {
    this.isRead = !this.isRead;
  };

  // This method returns a string describing the book
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages`;
  };
}

// Function to create a new book object and add it to our library
function addBookToLibrary(title, author, pages, read) {
  // Here we use the 'new' keyword with our Book constructor
  // This creates a new object using the Book template
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayLibrary();
}

// Function to show all books in the library
function displayLibrary() {
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const bookItem = document.createElement("li");
    // Using the book's info method to get its description
    bookItem.innerHTML = `
            <div class="content-container">
                ${book.info()}
                <div class="content-book-container">
                    <button class="remove-btn" onclick="removeBook(${index})">X</button>
                    <button class="read-button" data-index="${index}">
                        ${book.isRead ? "Read" : "Not Read"}
                    </button>
                </div>
            </div>
        `;
    bookList.appendChild(bookItem);
  });

  // Add click handlers for all read buttons
  const readButtons = document.querySelectorAll(".read-button");
  readButtons.forEach((button) => {
    button.addEventListener("click", handleReadToggle);
  });
}

// Function to handle toggling the read status
function handleReadToggle(event) {
  const button = event.currentTarget;
  const index = parseInt(button.dataset.index);
  const book = myLibrary[index];

  // Using the book's toggleRead method
  book.toggleRead();
  displayLibrary();
}

// Function to remove a book from the library
function removeBook(index) {
  myLibrary.splice(index, 1);
  displayLibrary();
}

// Function to add some initial books
function initializeLibrary() {
  // Creating several books using our constructor
  addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
  addBookToLibrary("1984", "George Orwell", 328, false);
}

// Set up event listeners once the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  const bookDialog = document.getElementById("bookDialog");
  const form = bookDialog.querySelector("form");

  // Show dialog when Add Book button is clicked
  const addBookBtn = document.querySelector(".add-book");
  addBookBtn.addEventListener("click", () => {
    bookDialog.showModal();
    form.reset();
  });

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get values from the form
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = parseInt(document.getElementById("pages").value);
    const isRead = document.getElementById("read-yes").checked;

    // Use our constructor to create a new book
    addBookToLibrary(title, author, pages, isRead);

    form.reset();
    bookDialog.close();
  });

  initializeLibrary();
});
