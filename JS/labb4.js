let oneKey = 0; // Keeping one key per person in check
let getKey = document.getElementsByClassName('getKey');
let addBook = document.getElementsByClassName('addBook');
let viewContent = document.getElementById('viewContent');
let viewBooks = document.getElementsByClassName('viewBooks');
let changeData = document.getElementsByClassName('changeData');
let urlThis ='https://www.forverkliga.se/JavaScript/api/crud.php?'




let myHeaders = new Headers();

let mainAPI = {
    method: 'post',
    mode:'cors',
    cache: 'default'


};

function retrieveKey(){
    if(oneKey <1){
    
  let y =fetch('https://www.forverkliga.se/JavaScript/api/crud.php?requestKey').then(function(response){
      
    return response.json();
  }).then(function (json){
      let x = json.key;
      oneKey++;
    console.log(x)
      return x;

  });
    
}
    
}


function addBookHere(){
    fetch('https://www.forverkliga.se/JavaScript/api/crud.php?op=insert&key=TpvUU&title=tokyodrift&author=jason', mainAPI).then(function(response){
        return response.json();
    }).then(function(json){
        console.log(json);
    }).then(function(json){
        console.log(json);
    })
}

function viewData(){
    fetch('https://www.forverkliga.se/JavaScript/api/crud.php?op=select&key=TpvUU').then(function(response){
        return response.json()
    }).then(function(json){
        for(i=0; i<json.data.length; i++){
            viewContent.innerHTML = "ID : " + json.data[i].id + "</br>" +
                "Title : " + json.data[i].title + "</br>" + 
                    "Author : " + json.data[i].author
            console.log(json.data);
           
        }
    })
}

function deleteData(){
    fetch('https://www.forverkliga.se/JavaScript/api/crud.php?op=delete&key=TpvUU&id=14903').then(function(response){
        return response.json()
    }).then(function(json){
        console.log(json);
    })
}

function updateData () {
    fetch('https://www.forverkliga.se/JavaScript/api/crud.php?op=update&key=TpvUU&id=14900&title=NewTitle&author=newAuthor').then(function(response){
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






