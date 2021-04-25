
import {TimeClock} from './clock.js'

$(document).ready(() => {
   $(".nav-item").click(ev => { 
      window.location = $(ev.target).attr("action") || "/"
   })

   $(".btn").click(ev => {
      let tar = $(ev.target)
      if (tar.hasClass("btn-label"))
         tar = tar.parent()

      switch (tar.attr("action")) {
         default: break
         case 'clock-in': 
            _clock.clockIn()
            break
         case 'clock-out':
            _clock.clockOut()
            break
         case 'apply-desc':
            const str = encodeURIComponent($("#segDesc").val())
            $.post("/api/v1/apply-desc", `segmentId=-1&description=${str}`, ret => {
               // TODO : indicate to user that update succeeded
               alert("ok")
            })
            break
      }
   })

   const _clock = $("#clockIn").length > 0 ? new TimeClock("clockIn", "clockOut", "workTime", "workTally") : null
   if (_clock != null) {
      _clock.initialize(timeIn.length > 0 ? new Date(timeIn) : 0, timeTally)
   }
})