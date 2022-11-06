function goalEditHandler() {
  x = $("#goal-textarea").val()
  x = String(x)
  $("#card-text").html(x)
}


function setup() {
  $("#goal-submit").click(goalEditHandler)
}


$(document).ready(setup)