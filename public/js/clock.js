
const kUpdateInterval = 1000

export class TimeClock {
   constructor(btnIn, btnOut, ticker, tally) {
      this._btnIn = $(`#${btnIn}`)
      this._btnOut = $(`#${btnOut}`)
      this._ticker = $(`#${ticker}`)
      this._tally = $(`#${tally}`)
      this._state = 0
      this._timeIn = 0
      this._timeTally = 0
      this._timerId = 0
   }

   initialize(timeIn, timeTally) {
      this._timeIn = timeIn
      this._timeTally = timeTally
      if (timeIn > 0) {
         this._state = 1
         this.updateTimeClock()
      }
      this.updateTimeClockControls()
   }

   clockIn() {
      $.post("/api/v1/clock-in", json => this.handleWorkSegment(json))
   }
   
   clockOut() {
      $.post("/api/v1/clock-out", json => this.handleWorkSegment(json))
   }

   handleWorkSegment(json)
   {
      if (!json.ok) {
         console.log(`error: ${json.msg}`)
         return
      }
      const ws = json.ws

      this._state = ws == undefined ? 0 : 1
      this.updateTimeClockControls()

      if (ws != null) {
         this._timeIn = new Date(ws.Start)
         this.updateTimeClock()
      }
      else {
         clearTimeout(this._timerId)
         this._timerId = 0
         window.location.reload()
      }
   }

   updateTimeClockControls() {
      $(".clockControl").hide()
      $(this._state == 0 ? this._btnIn : this._btnOut).show()
      if (this._timeTally > 0) {
         this._tally.html(this.formatTimespan(this._timeTally, "h ", "m ", "s "))
      }
   }

   updateTimeClock() {
      const sec = ((new Date()).getTime() - this._timeIn.getTime()) / 1000
      
      this._ticker.html(this.formatTimespan(sec))
      this._tally.html(this.formatTimespan(this._timeTally + sec, "h ", "m ", "s "))
      this._timerId = setTimeout(() => { this.updateTimeClock() }, kUpdateInterval);
   }

   formatTimespan(sec, hs = ':', ms = ':', ss = '') {
      const min = Math.floor(sec / 60)
      return `${this.formatTime(min / 60)}${hs}${this.formatTime(min % 60)}${ms}${this.formatTime(sec % 60)}${ss}`
   }

   formatTime(n) {
      return Number(Math.floor(n)).toLocaleString('en-US', { minimumIntegerDigits: 2 })
   }
}