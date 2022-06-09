// Keeps track of the ID of the data being edited

let editId = null;


async function fetchData() {
  
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
    cell3.innerHTML = "<button id=" + data[i]._id + "Edit onclick=openEditModal(this)>Edit</button>";
    cell4.innerHTML = "<button id=" + data[i]._id + "Delete onclick=deleteClick(this)>Delete</button>";
  }   
}

async function openEditModal(e){  
  // Manipulates the string of the button ID to get the id string we want
  let str = e.id;  
  editId = str.slice(0, str.length - 4)
  console.log(editId );
  
  const postData = {
    id: editId ,
  };

  // Get the modal
  const modal = document.getElementById("myModal");
  // When the user clicks on the button, open the modal
  modal.style.display = "block";  

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("close")[0]; 

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
   modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  try {
    const res = await fetch('/crud/editData', {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    }).then(function(response) {
      // Needed to give res a value
      return response.json()
    });     
    setEditData(res);   
  } catch (err) {
    console.log('Error: ' + err);
  }
}

// Function to fill in the values on the html form
function setEditData(data){  
  document.getElementById("name").value = data.name;
  document.getElementById("request").value = data.request;  
}

// function to save the edited data
async function editClick(e){
  e.preventDefault();
  
  let name = document.getElementById("name").value 
  let request = document.getElementById("request").value 

  try {
    const postData = {
      id: editId,
      name: name,
      request: request

    }
    await fetch('/crud/edit', {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    }).then(function(response) {
      // Needed to give res a value
      // Closes Modal
      document.getElementById("myModal").style.display = "none";
      deleteTable();
      fetchData();
      return response.json()
    });    
    
  
  } catch (err) {
    console.log('Error: ' + err);
  }
}

// Removes an entry on the table
async function deleteClick(e){
  let str = e.id;  
  let idStr = str.slice(0, str.length - 6)
  console.log(idStr);
  
  const postData = {
    id: idStr,
  };
  console.log(postData);
  try {

    await fetch('/crud/delete', {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });
    deleteTable();
    fetchData();
    console.log("End of function");
  } catch (err) {
    console.log('Error: ' + err);
  }
}

// function to delete the values of the table 
// Prevents double entries after editing and deleting items
function deleteTable(){
  var tableHeaderRowCount = 1;
  var table = document.getElementById("myTable");
  var rowCount = table.rows.length;
  for (var i = tableHeaderRowCount; i < rowCount; i++) {
    table.deleteRow(tableHeaderRowCount);
}

}







