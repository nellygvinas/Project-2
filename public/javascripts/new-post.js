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

        console.log(`result data: ----------------------------${result.data}`)

        let createdPost = result.data

        
        let theTitle = createdPost.postTitle
        let theDate = createdPost.postDate
        let theDescription = createdPost.postDescription
        let theId  = createdPost.postChildId
        let theImage = createdPost.postImage

        console.log(theTitle, theDate, theDescription, theId)


      //  Possibly make another axios request to get new updated info ??
        axios.get('/feed')
          .then((response)=>{
           // take the new updated info and put it on the page
          let newPost = response.data;


          $(".post-container").prepend(`<div class="post-card">
    
          <h2 id="post-title">
          ${newPost.title}
          </h2>
    
    
          <h4 id="post-date">
          ${newPost.creation}
          </h4>
    
    
          <p id="post-description">
          ${newPost.description}
          </p>
    
          <img id="post-image" src="{{this.image}}">
    
          <p id="post-child">
          ${newPost.child}
          // </p>`)


          //  document.getElementById('post-title').innerText = newPost.title
          //  document.getElementById('post-date').innerText = newPost.creation
          //  document.getElementById('post-description').innerText = newPost.description
          //  document.getElementById('post-image').innerHTML = newPost.image
          //  document.getElementById('post-child').innerText = newPost.child
       })
       .catch((err)=>{
           console.log(err);
        })
      })
       .catch((err)=>{
        console.log(err);
      })

    
    
    }  // end of on-click function

  }, false); // end of document event listener