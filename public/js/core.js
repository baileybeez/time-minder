
$(document).ready(() => {
   $(".nav-item").click(ev => { 
      window.location = $(ev.target).attr("action") || "/"
   })
})