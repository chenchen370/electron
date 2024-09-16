export function findDict(orgList, code) {
  console.log('orgList ==>', orgList)
  let arr = []
  function recurve(list, code) {
    for (const dict of list) {
      if (dict.dictValue == code) {
        console.log('dict ===> ', dict)
        arr = dict.children
        break
      } else {
        if (dict.children && dict.children.length > 0) {
          recurve(dict.children, code)
        }
      }
    }
  }
  recurve(orgList, code)
  return arr
}
