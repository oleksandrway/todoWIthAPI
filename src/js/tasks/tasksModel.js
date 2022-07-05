
class TasksModel {
  constructor(keyInStorage) {
    this.store = localStorage
    this.keyInStorage = keyInStorage
  }

  getTasks() {
    const list = JSON.parse(this.store.getItem(this.keyInStorage))
    if (list)
      return list
    else return []
  }

  removeTask(id) {
    const oldList = this.getTasks()
    const newList = oldList.filter(item => item.id !== id)
    this.store.setItem(this.keyInStorage, JSON.stringify(newList))
  }

  addTask({ name, id }) {
    const oldList = this.getTasks()
    const newLIst = [...oldList, { id, name, completed: false }]
    this.store.setItem(this.keyInStorage, JSON.stringify(newLIst))
  }

  changeTaskState(id) {
    const oldList = this.getTasks()
    const newList = oldList.map((item) => {
      if (item.id === id)
        item.completed = !item.completed
      return item
    })
    this.store.setItem(this.keyInStorage, JSON.stringify(newList))
  }

  getTask(id) {
    const tasksList = this.getTasks()
    return tasksList.find(item => item.id === id)
  }

  updateTask({ id, newValue }) {
    const oldList = this.getTasks()
    const newList = oldList.map((item) => {
      if (item.id === id)
        item.name = newValue
      return item
    })
    this.store.setItem(this.keyInStorage, JSON.stringify(newList))
  }
}

export { TasksModel }
