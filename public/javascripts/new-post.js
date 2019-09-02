document.addEventListener('DOMContentLoaded', () => {


  let inputs = document.querySelectorAll('#create-post input')

 for(let i=0; i < inputs.length; i++){


   inputs[i].onsubmit = function(){
       
       let childName = document.getElementById('postChild').value;
       
       let child = childName.options[childName.selectedIndex].value;
       let title = document.getElementById('postTitle').value;
       let date = document.getElementById('postDate').value;
       let description = document.getElementById('postDescription').value;
       let file = document.getElementById('postImage').value;

// make axios request and send the correct stuff in req.body
     axios.post('/api/celebs/edit/'+id, {
         postChild: child,
         theOccupation: occupation,
         theCatchphrase: catchphrase
     })
     .then((res)=>{

       console.log(res)

       // make another axios request to get new updated info of the celebrity
       axios.get('/api/celebs/details/'+id)
       .then((theResponse)=>{


           // take the new updated info and put it on the page
          let updatedCeleb = theResponse.data;
           document.getElementById('actual-name').innerText = updatedCeleb.name
           document.getElementById('actual-occupation').innerText = updatedCeleb.occupation
           document.getElementById('actual-catchphrase').innerText = updatedCeleb.catchphrase;




       })
       .catch((err)=>{
           console.log(err);
       })




     })


   }

 }






 
 }, false);