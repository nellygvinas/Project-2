document.addEventListener('DOMContentLoaded', () => {


  document.getElementById('create-post').onsubmit = function(event){

    event.preventDefault();

    let title = document.getElementById('postTitle').value;
    let date = document.getElementById('postDate').value;
    let description = document.getElementById('postDescription').value;
    let childId = document.getElementById('childId').value;

    let image = document.getElementById('upload-file').files[0];


const formData = new FormData();

formData.append('postTitle', title);
formData.append('postDate', date);
formData.append('postDescription', description);
formData.append('postChildId', childId);
formData.append('postImage', image);


// make axios request and send the correct stuff in req.body
     axios.post('/api/feed/new-post', formData)
     .then((result)=>{

        console.log(`result data: ----------------------------${result.data[0]}`)


      //  Possibly make another axios request to get new updated info ??
      //   axios.get('/api/feed/created-post')
      //     .then((response)=>{
      //      // take the new updated info and put it on the page
      //      let createdPost = response.data

      //       console.log(createdPost)

      //      let theTitle = createdPost.title
      //      let theDate = createdPost.date
      //      let theDescription = createdPost.description
      //      let theId  = createdPost.childId
      //      let theImage = createdPost.image
   
      //      console.log(theTitle, theDate, theDescription, theId)
   

      //     $("div.child-feed container > row").prepend(`<div class="col s12 m3">
      //     <img src="${theImage}" alt="" class="responsive-img materialboxed  art-img">
      //     </div>`)

      
      //  })
      //  .catch((err)=>{
      //      console.log(err);
      //   })
      })
       .catch((err)=>{
        console.log(err);
      })

    
    
    }  // end of on-click function

  }, false); // end of document event listener