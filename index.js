let insert = (table, values) => {
  return new Promise((resolve, reject) => {
    let _id = uuid()
    let ids = window.localStorage.getItem(table) || ''
    if (ids.length) {
      let _ids = ids.split(',')
      _ids.push(_id)
      ids = _ids.join(',')
    } else {
      ids = _id
    }
    values['_id'] = _id
    window.localStorage.setItem(table, ids)
    window.localStorage.setItem(_id, JSON.stringify(values))
    resolve(_id)
  })
}

let search = (table, query) => {
  return new Promise((resolve, reject) => {
    let ids = window.localStorage.getItem(table) || ''
    let list = []
    let _ids = ids.split(',')
    if (ids.length) {
      for (var i = 0; i < _ids.length; i++) {
        list.push(JSON.parse(window.localStorage.getItem(_ids[i])))
      }
      list = list.filter(data => {
        let condition = true
        for (let key in query) {
          condition = !!(data[key] === query[key])
          if (!condition) {
            break
          }
        }
        return condition
      })
      resolve(list)
    } else {
      resolve([])
    }
  })
}

let update = (id, modify) => {
  return new Promise((resolve, reject) => {
    let data = JSON.parse(window.localStorage.getItem(id))
    for (let key in modify) {
      data[key] = modify[key]
    }
    window.localStorage.setItem(id, JSON.stringify(data))
    resolve(data)
  })
}

let remove = (table, id) => {
  return new Promise((resolve, reject) => {
    window.localStorage.removeItem(id)
    let ids = window.localStorage.getItem(table) || ''
    let _ids = ids.split(',')
    _ids = _ids.filter(x => x !== id)
    ids = _ids.join(',')
    window.localStorage.setItem(table, ids)
    resolve()
  })
}

class Database {
  constructor(table) {
    this.table = table
  }
  insert(values) {
    return new Promise((resolve, reject) => {
      insert(this.table, values).then(resolve)
    })
  }
  remove(id) {
    return new Promise((resolve, reject) => {
      remove(this.table, id).then(resolve)
    })
  }
  update(id, modify) {
    return new Promise((resolve, reject) => {
      update(id, modify).then(resolve)
    })
  }
  search(query) {
    return new Promise((resolve, reject) => {
      search(this.table, query).then(resolve)
    })
  }
}

export default Database
