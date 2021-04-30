

function makeDateOnly(dt, day = 0) {
   return `${dt.getFullYear()}/${dt.getMonth() + 1}/${dt.getDate() + day}`
}

module.exports = { makeDateOnly }
