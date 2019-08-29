document.addEventListener('DOMContentLoaded', () => {


  let inputs = document.querySelectorAll('#edit-form input')
//    grab all three inputs inside form

 for(let i=0; i < inputs.length; i++){


   inputs[i].onsubmit = function(){
       
       let id = document.getElementById('hidden-id').value;
       // grab id from hidden input

       let name = document.getElementById('edit-name').value;
       let dob = document.getElementById('edit-dob').value;
       let image = document.getElementById('edit-image').value;
       // grab the values from the inputs


// make axios request and send the correct stuff in req.body
     axios.post('/api/feed/edit/'+id, {
         theName: name,
         theDob: dob,
         theImage: image
     })
     .then((res)=>{

       console.log(res)

       // make another axios request to get new updated info 
       axios.get('/api/feed/details/'+id)
       .then((theResponse)=>{


           // take the new updated info and put it on the page
          let updatedChild = theResponse.data;
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