/*REVIEW - Create a full CRUD application of your choice using either an API or local Array.
Use an existing API with AJAX to interact with it. 
If you do not use an API, store the entities you will create, read, update, and delete in an array.
Use a form to post new entities.
Build a way for users to update or delete entities
Use Bootstrap and CSS to style your project.*/

const BOOKS_URL = "https://6441e96533997d3ef904aac0.mockapi.io/CRUD_App_API/books";

/*NOTE - retrieves the data from the API, then goes through each object and adds it to the table body and adds a delete button
that, when clicked will delete the piece of data from the API itself. The function it calls is further below */

    $.get(BOOKS_URL).then(data =>
    data.map(book => {
        $("tbody").append(
            $(`
            <tr>
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.genre}</td>
                <td><button class="btn btn-danger" onclick="deleteBook(${book.id})">Delete</button></td>
            </tr>
            `)
        )
    }))


/*NOTE - calls on the id for the Submit button in the HTML. Then it sets up a function to be activated when the button is clicked/
When the button is clicked, it will add the value of the input that has been put in fields called below */

    $("#addBook").on("click", () => {
        $.post(BOOKS_URL, {
            title: $("#addTitle").val(),
            author: $("#addAuthor").val(),
            genre: $("#addGenre").val(),
        })
    });

    /*NOTE - this function takes an id as its argument and uses that id to target the specific data it wants deleted from the API */

    function deleteBook(id) {
        $.ajax(`${BOOKS_URL}/${id}` , {
            method: "DELETE",
        });
    };

    /*NOTE - this function fetches the specific information based on the id number given and then allows us to enter in
    new data for the id and update the API. Prevent default is used to stop the page refreshing before the information is submitted */
    function updateList(e) {
        e.preventDefault();
        let id = $("#updateID").val();
      
        fetch(`${BOOKS_URL}/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify ({
            title: $("#updateTitle").val(),
            author: $("#updateAuthor").val(),
            genre: $("#updateGenre").val(),
          })
        })
      };

      
      
      $("#updateBook").on("click", (e) => updateList(e))