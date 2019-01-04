# storageDb

超 mini 浏览器 KV 数据库

查询只能用固定条件，还不能进行复杂条件搜索

```javascript
import Database from 'storageDb'

const fooDb = new Database('foo')
let dataId = ''

fooDb.insert({ title: 'db', i: 0, b: false }).then(id => {
  dataId = id
})

fooDb.update(dataId, { i: 10 }).then(data => {
  console.log(data) // {title: 'db', i: 10, b: false}
})

fooDb.search({ i: 10 }).then(datas => {
  console.log(datas) // [{title: 'db', i: 10, b: false}]
})

fooDb.remove(dataId)
```
