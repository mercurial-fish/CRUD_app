/*REVIEW - Create a full CRUD application of your choice using either an API or local Array.
Use an existing API with AJAX to interact with it. 
If you do not use an API, store the entities you will create, read, update, and delete in an array.
Use a form to post new entities.
Build a way for users to update or delete entities
Use Bootstrap and CSS to style your project.*/

const BOOKS_URL = "https://6441e96533997d3ef904aac0.mockapi.io/CRUD_App_API/books";

$.get(BOOKS_URL).then(data =>
    data.map(book => {
        $("tbody").append(
            $(`
            <tr>
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.genre}</td>
                <td>${book.dateAdded}</td>
                <td><button id="deleteBook" onclick="deleteBook(${book.id})">Delete</button></td>
            </tr>
            `)
        )
    }))

    $("#addBook").on("click", () => {
        $.post(BOOKS_URL, {
            title: $("#addTitle").val(),
            author: $("#addAuthor").val(),
            genre: $("#addGenre").val(),
            dateAdded: $("#addDate").val()
        })
    });

    //FIXME - deletes the book, but it doesn't update until you refresh the page
    function deleteBook(id) {
        $.ajax(`${BOOKS_URL}/${id}` , {
            method: "DELETE",
        });
    };