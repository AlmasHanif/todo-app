
 var list =document.getElementById("list")
 var input = document.getElementById("todo-item")
// console.log(firebase)


firebase.database().ref("todo").on('child_added',function(data){

    
//     // create li tag with text node
    var li = document.createElement("li")
    var litxt = document.createTextNode(data.val().value)

    
//     // craete delete button
    var delbtn = document.createElement("i")
     delbtn.style.alignItems = "right"
    delbtn.setAttribute("class","fas fa-trash")
    delbtn.setAttribute("onclick","delete_li(this)")
    delbtn.setAttribute("id",data.val().key)

    
//     // create edit button
    var editbtn = document.createElement("i")
    editbtn.setAttribute("class","fa fa-edit")
    editbtn.style.alignItems = "right"
    editbtn.setAttribute("id",data.val().key)
    editbtn.setAttribute("onclick","edit_txt(this)")

    // if (input.value == "") {
    //     alert("Please first enter your task")
    // }
    //     else{
            
    li.appendChild(litxt)
    list.appendChild(li)
    li.appendChild(delbtn)
    li.appendChild(editbtn)
    console.log(data.val())
        // }
})



function addtodo(){
    var database =  firebase.database().ref("todo");
    var key = database.push().key;
    var todo_obj = {
        value: input.value,
        key: key
    }
    database.child(key).set(todo_obj)

    // console.log(key)


    input.value = " "
        }
   

 


function delete_li(del){

    firebase.database().ref("todo").child(del.id).remove();
    del.parentNode.remove()

}

function edit_txt(edit){
    
    var value = edit.parentNode.firstChild.nodeValue
    var editVal = prompt("enter edited value", value);

    var editTodo = {
        value : editVal,
        key : edit.id
    }
    firebase.database().ref("todo").child(edit.id).set(editTodo)
    edit.parentNode.firstChild.nodeValue = editVal

}

function deleteall(){

    firebase.database().ref("todo").remove();
    list.innerHTML = " "
}