
//document.getElementById("myTable").addEventListener("load", onLoadTest);

async function fetchData() {

  /* This is how to do it with promises
  console.log("page loaded");
  fetch("/crud/read").then(function(response){
    console.log('success!', response);
    return response.json();
  }).then(function (data){
    console.log(data);
    console.log(data.data.length);
  }).catch(function (err){
    console.log("Something went wrong", err)

  });
  */

  // This is how to do it with async await
  const resp = await fetch("/crud/read");
  const {data} = await resp.json();

  let table = document.getElementById("myTable");
  
  // For loop to dynamically fill in the table with the data from the database
  for (let i = 0; i < data.length; i++){
    let row = table.insertRow(i+1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    cell1.innerHTML = data[i].name;
    cell2.innerHTML = data[i].request;
    cell3.innerHTML = "<button id=" + data[i]._id + "Edit onclick=editClick(this)>Edit</button>";
    cell4.innerHTML = "<button id=" + data[i]._id + "Delete onclick=deleteClick(this)>Delete</button>";
  }   
}


async function editClick(e){
  
  let str = e.id;  
  let partStr = str.slice(0, str.length - 4)
  console.log(partStr);

  console.log("Edit click");
  const response = await fetch('/crud/edit', {
    method: "post",
    body: partStr
  });
}

async function deleteClick(e){
  let str = e.id;  
  let idStr = str.slice(0, str.length - 6)
  console.log(idStr);

  const response = await fetch('/crud/delete', {
    method: "post",
    body: idStr
  });

  console.log("Delete click");
}


