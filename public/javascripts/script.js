
// ------------------
// DATEPICKER
// ------------------
$('.datepicker').pickadate({})
// fix for auto close bug in chrome
$('.datepicker').on('mousedown', function (event) { event.preventDefault() })

// ------------------
// MODAL
// ------------------
$(document).ready(function () {
  $('.modal').modal()
})


// magnific popup
$('.test-popup-link').magnificPopup({
  type: 'image',
  gallery: { enabled: true },
  type: 'image',
  image: {
    titleSrc: 'title'
    // this tells the script which attribute has your caption
  }
});

// This will create a single gallery from all elements that have class "gallery-item"
$('.gallery-item').magnificPopup({
  type: 'image',
  gallery: {
    enabled: true,
  },
});


