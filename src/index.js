let xhr = new XMLHttpRequest();
xhr.open("GET","api/user");
xhr.onload = function(res){
    console.log(res);
}

xhr.send();