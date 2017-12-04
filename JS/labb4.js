
let loaded = function () {
let getKey = document.getElementsByClassName('getKey');
let addBook = document.getElementsByClassName('addBook');
let viewContent = document.getElementById('viewContent');
let viewBooks = document.getElementsByClassName('viewBooks');
let oneKey = 0; // Making sure there's only one generated key
let changeData = document.getElementsByClassName('changeData');
let url ='https://www.forverkliga.se/JavaScript/api/crud.php?'




let myHeaders = new Headers();

let mainAPI = {
    method: 'post',
    mode:'cors',
    cache: 'default'


};

function retrieveKey() {
        if (oneKey < 1) {
            return fetch(`${url}?requestKey`).then(function (response) {
                return response.json()
            }).then(function (json) {
                let theKey = json.key;
                console.log(theKey);
                oneKey++;
                viewContent.innerHTML = theKey;
            });
        }
    }
    
    function saveKey(Event){
       return Event.target.value;
    }
  
    function addBookHere(uniqueKey) {
        uniqueKey = verifyKey.value;
        fetch(`${url}?op=insert&key=${uniqueKey}&title=TokyoDrift&author=Jake`, mainAPI).then(function (response) {
            return response.json();
        }).then(function (json) {
            console.log(json);
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
  
function updateData () {
    fetch(`${url}?op=update&key=3LWs6&id=14705&title=newtitle&author&newAuthor`).then(function(response){
        return response.json()
    }).then(function(json){
        for(i = 0; i<json.data.length; i++){
            changeData.innerHTML = 'Current ID : ' + json.data[i].id + '</br>' + 
                " New Title : " + json.data[i].title + '</br>' + 
                'Author: ' + json.data[i].author
            console.log(json.data);
        }
    })
}




deleteData();
viewContent.innerHTML = viewData();
viewBooks[0].addEventListener('click',viewData);
getKey[0].addEventListener('click', retrieveKey);
addBook[0].addEventListener('click', addBookHere)
changeData[0].addEventListener('click', updateData);







};
window.addEventListener("load", loaded);

