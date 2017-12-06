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




    let myHeaders = new Headers();
    let oneKey = 0; // Making sure there's only one generated key
    let url = "https://www.forverkliga.se/JavaScript/api/crud.php";



    let mainAPI = {
        method: 'post',
        mode: 'cors',
        cache: 'default'
    };

    function retrieveKey() {
        if (oneKey < 1) {
            return fetch(`${url}?requestKey`, Error).then(function (response) {
                return response.json()
            }).then(function (json) {
                let theKey = json.key;
                console.log(theKey);
                oneKey++;
                htmlElements.viewContent.innerHTML = theKey;
            }).catch(function(Error){
                htmlElements.statusContainer.innerHTML = `An error occurred here, please try again`;
                console.log(`Cause of Error: $(Error)`);
            
        })
    }
    }




    function addBookHere(uniqueKey) {
        uniqueKey = htmlElements.viewContent.innerHTML; //funkar men gör koden lättare.
        fetch(`${url}?op=insert&key=${uniqueKey}&title=TokyoDrift&author=Jake`, mainAPI).then(function (response) {
            return response.json();
        }).then(function (json) {
            console.log(json);
            if(json.status === "success")
                htmlElements.statusContainer.innerHTML = `Status: $(json.status) </br> `
        })
    }

    function viewData(uniqueKey) {
        uniqueKey = verifyKey.value 
        fetch(`${url}?op=select&key=${uniqueKey}`).then(function (response) {
            return response.json();
        }).then(function (json) {
            for (i = 0; i < json.data.length; i++) {
                viewContent.innerHTML = "ID : " + json.data[i].id + "</br>" +
                    "Title : " + json.data[i].title + "</br>" + "Author : " +
                    json.data[i].author;
                console.log(json.data[i]);
            }
        });
    }

    function deleteData() {
        fetch(`${url}?op=delete&key=3LWs6&id=14705`).then(function (response) {
            return response.json();
        }).then(function (json) {})
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

   /* function registerName(username) {
        console.log(username.target.value);
    }; */



    let personObject = {
      
        listOfUsers: [],

        CreateUser: function () {
           if(htmlElements.viewContent.innerHTML.length < 5 || htmlElements.regFields[0].value.length < 3 || htmlElements.regFields[1].value.length < 5){
               
           window.alert('1:Please request a key. 2: Username needs to have a minimum of 3 characters. 3: Password needs to have a minimum of 5 characters ');
           }else{
               let user = {
                   username: htmlElements.regFields[0].value,
                   password: htmlElements.regFields[1].value,
                   key: htmlElements.viewContent.innerHTML
               }
               personObject.listOfUsers.push(user);
              
               console.log(personObject.listOfUsers);
           }
            
            
               
            
            
        },

        registerName: function (username) {
            return username.target.value;
        },
        registerPassword: function (password) {
            return password.target.value;
        },

        UserKey: function (Event) {
            return htmlElements.viewContent.innerHTML;
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