// 格式化时间
export function formatDate (date) {
  if (!date) return ''
  date = new Date(date)
  const Y = date.getFullYear()
  const M = date.getMonth() + 1
  const D = date.getDate()
  const H = date.getHours()
  const m = date.getMinutes()
  const S = date.getSeconds()
  return `${Y}-${padLeftZero(M)}-${padLeftZero(D)} ${padLeftZero(H)}:${padLeftZero(m)}:${padLeftZero(S)}`
}

// 不够两位前面补0 // str.padStart(length, fillStr)
function padLeftZero (str) {
  str += ''
  return ('00' + str).substr(str.length)
}
