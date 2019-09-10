
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


