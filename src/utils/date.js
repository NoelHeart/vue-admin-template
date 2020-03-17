const moment = {
  getMomentDate() {
    const date = new Date()
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
  },
  getMomentTime() {
    const date = new Date()
    return `${this.padDate(date.getHours())}:${this.padDate(date.getMinutes())}:${this.padDate(date.getSeconds())}`
  },
  padDate(value) {
    return value < 10 ? '0' + value : value
  }
}
export default moment
