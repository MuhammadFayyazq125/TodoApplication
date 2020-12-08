var list = document.getElementById('todoList')

firebase.database().ref('Todos').on('child_added',function(data){
   var li = document.createElement("li");
   li.setAttribute("class","liCenter")
   var liDiv = document.createElement("div")
   liDiv.setAttribute("class","Li-div")
   var p = document.createElement("p")
   list.appendChild(li)
   var liText = document.createTextNode(data.val().value);


  
   //Edit option list
  var editItem = document.createElement("button")
  var editIcon = document.createElement("i")
  editIcon.setAttribute("class","fas fa-edit")
  editItem.appendChild(editIcon);
  editItem.setAttribute("class","btnRight")
  editItem.setAttribute('id',data.val().key)
editItem.setAttribute("onclick","editList(this)")
  //deleting a list 
  var deleteITem = document.createElement("button")
 var delBTn = document.createElement("i");
 deleteITem.setAttribute("class","btnRight")
 delBTn.setAttribute("class", "fas fa-trash");
 delBTn.setAttribute('id',data.val().key)
 console.log(delBTn)
delBTn.setAttribute("onclick", "deleteList(this)")
deleteITem.appendChild(delBTn)

if(data.value == ""){
   alert("enter your value")
}
   
  list.appendChild(li)
  li.appendChild(liDiv)
  liDiv.appendChild(p)
  p.appendChild(liText)
   li.appendChild(editItem)
   li.appendChild(deleteITem)
})

function addTodo(){
   var input = document.getElementById('todoInput');
   console.log(input.value);
   var database =firebase.database().ref('Todos') 
   var key = database.push().key;
   var todo = {
      value : input.value,
      key : key
   }

   database.child(key).set(todo);
   
   input.value="";

}

function deleteList(e){
   firebase.database().ref('Todos').child(e.id).remove();
   e.parentNode.parentNode.remove()
}
function empty(){
   firebase.database().ref('Todos').remove();
list.innerHTML=""

}

function editList(e){
   var liNode = e.parentNode.childNodes;
   var oldValue = liNode[0].childNodes[0].innerHTML;
   var editValue = prompt("Edit the Value",oldValue);
   var editTodo = {
      value : editValue,
      key : e.id
   }
    firebase.database().ref('Todos').child(e.id).set(editTodo)
   liNode[0].childNodes[0].innerHTML = editValue;

}