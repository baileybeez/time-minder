import {TimeClock} from './clock.js'

const _days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export class WorkSummary {
   constructor(root, title) {
      this._root = $(root)
      this._title = $(title)
      this._week = {}
      
      const dt = new Date()
      dt.setDate(dt.getDate() - dt.getDay() + 1)
      this._workStart = dt
   }

   getCurrentWeek() {
      return this._workStart
   }

   previousWeek() {
      this._workStart.setDate(this._workStart.getDate() - 7)
      this.getWeekSummary()
   }

   nextWeek() {
      let dt = new Date(this._workStart)
      dt.setDate(dt.getDate() + 7)
      if (dt <= (new Date())) {
         this._workStart = dt
         this.getWeekSummary()
      }
   }
  
   getWeekSummary(date = null) {
      if (date != null) {
         this._workStart = date
      }

      $.get(`/api/v1/work-week/?week_start=${this.formatDate(this._workStart)}`, week => {
         console.log(week)
         this._week = week
         this.updateDisplay()
      })
   }

   updateDisplay() {
      const clk = new TimeClock()
      
      this._root.children().remove()
      this._title.html(`Week Of: ${this._week.weekStart}`)
      
      let tally = 0
      const set = Object.keys(this._week.summary).sort(this.dateAscending)
      set.forEach(key => {
         const dt = new Date(key)

         this.createSummaryRow(_days[dt.getDay()], this.formatDate(dt), clk.formatTimespan(this._week.summary[key], 'h ', 'm ', 's'))     
         tally += this._week.summary[key]
      });

      const trow = this.createSummaryRow("Total", "", clk.formatTimespan(tally, 'h ', 'm ', 's'))
      trow.addClass('tally-row')
      this._root.append(trow)
   }

   createSummaryRow(day, date, time) {
      const row = $("<div class='summary-row' />")
      row.append(`<div class='row-day'>${day}</div>`)
      row.append(`<div class='row-date'>${date}</div>`)
      row.append(`<div class='row-worktime'>${time}</div>`)

      this._root.append(row)
      return row
   }

   formatDate(dt) {
      return `${dt.getMonth() + 1}/${dt.getDate()}/${dt.getFullYear()}`
   }

   dateAscending(a, b) {
      if (a < b)
         return -1
      else if (a > b)
         return 1

      return 0
   }
}
