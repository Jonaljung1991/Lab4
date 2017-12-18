let loaded = function () {

    let htmlElements = {
        getKey: document.getElementsByClassName('getKey')[0],
        addBook: document.getElementsByClassName('addBook')[0],
        viewBooks: document.getElementsByClassName("viewBooks")[0],
        changeData: document.getElementsByClassName("changeData")[0],
        viewContent: document.getElementById("viewContent"),
        bookShelf: document.getElementById("bookShelf"),
        regFields: document.getElementsByClassName("regFields"),
        statusContainer: document.getElementById("statusContainer"),
        logBtn: document.getElementsByClassName("logBtn")
    };



    let counter = 0;
    let oneKey = 0; // Making sure there's only one generated key
    let url = "https://www.forverkliga.se/JavaScript/api/crud.php";




    function retrieveKey() {
        if (oneKey < 1) {
            return fetch(`${url}?requestKey`, Error).then(function (response) {
                return response.json()
            }).then(function (json) {
                let theKey = json.key;
                console.log(theKey);
                oneKey++;
                htmlElements.viewContent.innerHTML = theKey;
            }).catch(function (Error) {
                htmlElements.statusContainer.innerHTML = `There was an Error with the request, please try again.`;
                console.log(`The error is : ${Error}`);
                counter++;
            })
        }
    }




    function addBookHere(uniqueKey) {
        let mainAPI = {
            method: 'post',
            mode: 'cors',
            cache: 'default'
        };
        uniqueKey = htmlElements.viewContent.innerHTML;
        fetch(`${url}?op=insert&key=${uniqueKey}&title=TokyoDrift&author=Jake`, mainAPI, Error).then(function (response) {
            return response.json();
        }).then(function (json) {
            console.log(json);
            if (json.status === "Success")
                htmlElements.statusContainer.innerHTML = `Status : ${json.status} </br> Message : ${json.message} </br> Id : ${json.id}`;
            else {
                htmlElements.statusContainer.innerHTML = `Status : ${json.status}</br> Message : ${json.message}`;
            }

        }).catch(function (Error) {
            console.log(`The error is : ${Error}`);
            counter++;
        })
    }

    function viewData(uniqueKey) {
        uniqueKey = htmlElements.viewContent.innerHTML;
        fetch(`${url}?op=select&key=${uniqueKey}`).then(function (response) {
            return response.json();
        }).then(function (json) {
            for (i = 0; i < json.data.length; i++) {
                htmlElements.bookShelf.innerHTML += "ID : " + json.data[i].id + "</br>" +
                    "Title : " + json.data[i].title + "</br>" + "Author : " +
                    json.data[i].author;
                console.log(json.data[i]);
            }
        }).catch(function (Error) {
            console.log(`The error is : ${Error}`);
            counter++;
            console.log(counter);
        })
    }

    function deleteData() {
        fetch(`${url}?op=delete&key=3LWs6&id=14705`).then(function (response) {
            return response.json();
        }).then(function (json) {}).catch(function (Error) {
            counter++;
            console.log(`The error is : ${Error}`);
        })
    }

    /*function updateData() {
        fetch(`${url}?op=update&key=3LWs6&id=14705&title=newtitle&author&newAuthor`).then(function (response) {
            return response.json()
        }).then(function (json) {
            for (i = 0; i < json.data.length; i++) {
                changeData.innerHTML = 'Current ID : ' + json.data[i].id + '</br>' +
                    " New Title : " + json.data[i].title + '</br>' +
                    'Author: ' + json.data[i].author
                console.log(json.data);
            }
        })
    };
*/
    let personObject = {

        CreateUser: function () {
            localStorage.setItem("Testanvändare", "kbH750");

            let approved = true;
            let user = {
                username: htmlElements.regFields[0].value,
                password: htmlElements.regFields[1].value,
                key: htmlElements.viewContent.innerHTML
            }
            if (htmlElements.viewContent.innerHTML.length < 5 || htmlElements.regFields[0].value.length < 3 || htmlElements.regFields[1].value.length < 5) {
                window.alert(" 1 : You need a specified key to register. 2 : You need at least a 3 character name. 3 : You need at least a 5 character password.");
                approved = false;
            }
            if (user.key.length < 5) {
                console.log("No key yet");
                approved = false;
            }

            for (var i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i) === user.username) {
                    htmlElements.statusContainer.innerHTML = "Name already exist, choose a new one.";
                    approved = false;
                }
                if (approved) {
                    localStorage.setItem(user.username, user.key);
                }
            }

        },

        registerName: function (username) {
            console.log(username.target.value)
            return username.target.value;
        },
        registerPassword: function (password) {
            console.log(password.target.value)
            return password.target.value;
        },
        forEachKey: function () {
            let username = htmlElements.regFields[0].value;

            // console.log(this.registerName());
            for (var i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i).length < 3) {
                    htmlElements.viewContent.innerHTML = " ";
                }
                if (localStorage.key(i) === username) {
                    htmlElements.viewContent.innerHTML = localStorage.getItem(localStorage.key(i));
                }
            }
        }
    };



    htmlElements.regFields[0].addEventListener("change", personObject.registerName);
    htmlElements.regFields[1].addEventListener("change", personObject.registerPassword);
    htmlElements.regFields[2].addEventListener("click", personObject.CreateUser);
    htmlElements.logBtn[0].addEventListener("click", personObject.forEachKey);
    htmlElements.viewBooks.addEventListener("click", viewData);
    htmlElements.getKey.addEventListener('click', retrieveKey);
    htmlElements.addBook.addEventListener('click', addBookHere);
    // verifyKey.addEventListener("change", saveKey);
    // htmlElements.changeData.addEventListener('click', updateData);
};
window.addEventListener("load", loaded);