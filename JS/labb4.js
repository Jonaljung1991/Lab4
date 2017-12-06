let loaded = function () {

    let htmlElements = {
        getKey: document.getElementsByClassName('getKey')[0],
        addBook: document.getElementsByClassName('addBook')[0],
        viewBooks: document.getElementsByClassName("viewBooks")[0],
        changeData: document.getElementsByClassName("changeData")[0],
        viewContent: document.getElementById("viewContent"),
        regFields: document.getElementsByClassName("regFields"),
        statusContainer: document.getElementById("statusContainer")
    };




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
                htmlElements.statusContainer.innerHTML = `Status : ${json.status}</br> Message : ${json.message} </br> Solution : Please try again`;
            }

        }).catch(function (Error) {
            console.log(`The error is : ${Error}`);
        })
    }

    function viewData(uniqueKey) {
        uniqueKey = htmlElements.viewContent.innerHTML;
        fetch(`${url}?op=select&key=${uniqueKey}`).then(function (response) {
            return response.json();
        }).then(function (json) {
            for (i = 0; i < json.data.length; i++) {
                viewContent.innerHTML = "ID : " + json.data[i].id + "</br>" +
                    "Title : " + json.data[i].title + "</br>" + "Author : " +
                    json.data[i].author;
                console.log(json.data[i]);
            }
        }).catch(function (Error) {
            console.log(`The error is : ${Error}`);
        })
    }

    function deleteData() {
        fetch(`${url}?op=delete&key=3LWs6&id=14705`).then(function (response) {
            return response.json();
        }).then(function (json) {}).catch(function (Error) {
            console.log(`The error is : ${Error}`);
        })
    }

    function updateData() {
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

    let personObject = {
        listOfUsers: [],

        CreateUser: function () {
            if (htmlElements.viewContent.innerHTML.length < 5 || htmlElements.regFields[0].value.length < 3 || htmlElements.regFields[1].value.length < 5) {
                window.alert(" 1 : You need a specified key to register. 2 : You need at least a 3 character name. 3 : You need at least a 5 character password.");
            } else {
                let user = {
                    username: htmlElements.regFields[0].value,
                    password: htmlElements.regFields[1].value,
                    key: htmlElements.viewContent.innerHTML
                }
                personObject.listOfUsers.push(user);
                console.log(personObject.listOfUsers)
            }
        },

        registerName: function (username) {
            console.log(username.target.value)
            return username.target.value;
        },
        registerPassword: function (password) {
            console.log(password.target.value)
            return password.target.value;
        }
    };

    htmlElements.regFields[0].addEventListener("change", personObject.registerName);
    htmlElements.regFields[1].addEventListener("change", personObject.registerPassword);
    htmlElements.regFields[2].addEventListener("click", personObject.CreateUser);
    htmlElements.viewBooks.addEventListener("click", viewData);
    htmlElements.getKey.addEventListener('click', retrieveKey);
    htmlElements.addBook.addEventListener('click', addBookHere);
    //verifyKey.addEventListener("change", saveKey);
    htmlElements.changeData.addEventListener('click', updateData);
};
window.addEventListener("load", loaded);