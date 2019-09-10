document.addEventListener('DOMContentLoaded', () => {


  document.getElementById('create-child').onsubmit = function(event){

    event.preventDefault();

    let name = document.getElementById('postTitle').value;
    let dob = document.getElementById('postDate').value;
    let creator = document.getElementById('childId').value;

    let image = document.getElementById('upload-file').files[0];

// child model:

// const childSchema = new Schema({
//   name: String,
//   dob: Date,
//   image: String,
//   creator: {type: Schema.Types.ObjectId, ref: 'User'}, 
//   postings: [{type: Schema.Types.ObjectId, ref: 'Posting'}]





const formData = new FormData();

formData.append('postTitle', title);
formData.append('postDate', date);
formData.append('postDescription', description);
formData.append('postChildId', childId);
formData.append('postImage', image);


// make axios request and send the correct stuff in req.body
     axios.post('/api/feed/new-post', formData)
     .then((result)=>{

        console.log(result.data.newPost._id)
    
      
        axios.get('/api/feed/created-post/'+result.data.newPost._id)
          .then((response)=>{
           // take the new updated info and put it on the page
           
           console.log(response)
           
           let createdPost = response.data

            console.log(createdPost)

           let theTitle = createdPost.title
           let theDate = createdPost.creation
           let theDescription = createdPost.description
           let theImage = createdPost.image
   
           console.log(theTitle, theDate, theDescription, theImage)
   

          $(".post-images").prepend(`<div class="col s12 m3 push-s5">
          <img src="${theImage}" alt="" class="responsive-img materialboxed  art-img append-test">
          </div>`)

      
       })
       .catch((err)=>{
           console.log(err);
        })
      })
       .catch((err)=>{
        console.log(err);
      })

    
    
    }  // end of on-click function

  }, false);