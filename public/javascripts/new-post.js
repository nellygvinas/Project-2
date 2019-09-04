document.addEventListener('DOMContentLoaded', () => {


  let inputs = document.querySelectorAll('#create-post input')

 for(let i=0; i < inputs.length; i++){


   inputs[i].onsubmit = function(){
       
      // Get value of child name list  
      let childNameList = document.getElementById('postChildId').value;
      // Grabs id value of actual selected child from the child list
       let childIdValue = childNameList.options[childNameList.selectedIndex].value;
       
       let title = document.getElementById('postTitle').value;
       let date = document.getElementById('postDate').value;
       let description = document.getElementById('postDescription').value;
       let image = document.getElementById('postImage').value;

// make axios request and send the correct stuff in req.body
     axios.post('/api/feed/new-post', {
         postTitle: title,
         postDate: date,
         postDescription: description,
         postImage: image,
         postChildId: childIdValue
     })
     .then((response)=>{

      //  console.log(res)

      //  Possibly make another axios request to get new updated info ??
      //  axios.get('/api/feed/posts')
      //  .then((theResponse)=>{
           // take the new updated info and put it on the page
          let newPost = response.data;

           document.getElementById('post-title').innerText = newPost.title
           document.getElementById('post-date').innerText = newPost.creation
           document.getElementById('post-description').innerText = newPost.description
           document.getElementById('post-image').innerHTML = newPost.image
           document.getElementById('post-child').innerText = newPost.child


       })
       .catch((err)=>{
           console.log(err);
       })




     })


   }

 }






 
 }, false);