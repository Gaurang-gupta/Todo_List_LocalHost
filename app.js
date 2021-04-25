const add = document.querySelector("#add");
const search = document.querySelector("#searching");
const searchValue  =document.querySelector("#searchValue");
let itemJsonArray = [];
function getAndUpdate(){
    let tit = document.querySelector("#title").value;
    let desc = document.querySelector("#description").value;
    if(localStorage.getItem('itemsJson') == null){   
        itemJsonArray.push([tit,desc]);
        localStorage.setItem('itemsJson',JSON.stringify(itemJsonArray))
    }
    else{
        itemJsonArrayStr = localStorage.getItem('itemsJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        itemJsonArray.push([tit,desc]);
        localStorage.setItem('itemsJson',JSON.stringify(itemJsonArray));
    }

    //populate table
    let tablebody = document.querySelector("#tablebody");
    let str = '';
    itemJsonArray.forEach((element,index) =>{
        str += `
        <tr>
            <th scope="row">${index+1}</th>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td><button class="btn btn-warning btn-sm" onclick = "deleted(${index})">Delete</button></td>
        </tr>`;
    })
    tablebody.innerHTML = str;
    document.querySelector("#title").value = "";
    document.querySelector("#description").value = "";
}

function update(){
    if(localStorage.getItem('itemsJson') == null){
        itemJsonArray=[];
        localStorage.setItem('itemsJson',JSON.stringify(itemJsonArray))
    }
    else{
        itemJsonArrayStr = localStorage.getItem('itemsJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
    }
    //populate table
    let tablebody = document.querySelector("#tablebody");
    let str = '';
    itemJsonArray.forEach((element,index) =>{
        str += `
        <tr>
            <th scope="row">${index+1}</th>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td><button class="btn btn-warning btn-sm" onclick = "deleted(${index})">Delete</button></td>
        </tr>`;
    })
    tablebody.innerHTML = str;
}

function clearStorage(){
    if(itemJsonArray.length === 0){
        alert("List is already empty");
    }
    else if(confirm("Do you want to clear all the contents?")){
        console.log("clearing");  
        localStorage.clear();
        update();
    }
    
}

//deletion
function deleted(itemIndex){
    console.log("delete",itemIndex);
    itemJsonArrayStr = localStorage.getItem('itemsJson');
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    
    itemJsonArray.splice(itemIndex,1);
    localStorage.setItem("itemsJson",JSON.stringify(itemJsonArray));
    update();
    
}

function searchingFunction(){
    if(itemJsonArray.length === 0){
        alert("Searching is not possible in empty list");
    }
    else{
        let searchingArr = [];
        let value = searchValue.value;
        let tablebody = document.querySelector("#tablebody");
        // for(let items of itemJsonArray){
        //     if(items[0].toLowerCase().includes(value)){
        //         searchingArr.push(items);
        //     }
        // }

        itemJsonArray.forEach((element,index)=>{
            if(element[0].toLowerCase().includes(value)){
                searchingArr.push([element[0],element[1],index]);
            }
        })
        //populate table
        let str = '';
        searchingArr.forEach((element) =>{
            str += `
            <tr>
                <th scope="row">${element[2]+1}</th>
                <td>${element[0]}</td>
                <td>${element[1]}</td>
                <td><button class="btn btn-warning btn-sm" onclick = "deleted(${element[2]+1})">Delete</button></td>
            </tr>`;
        })
        tablebody.innerHTML = str;
    }
}

search.addEventListener("click",searchingFunction);

add.addEventListener("click",getAndUpdate);
update();