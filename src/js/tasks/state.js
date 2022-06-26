const tasksState = {
  store: localStorage,
  removeTask(key) {
    this.store.removeItem(key)
  },
  addTask({ name, id }) {
    const taskInfo = JSON.stringify({
      id,
      name,
      completed: false,
    })
    this.store.setItem(id, taskInfo)
  },
  changeTaskState(key) {
    const task = this.getTask(key)
    task.completed = !task.completed
    this.store.setItem(key, JSON.stringify(task))
  },

  getTask(key) {
    const task = this.store.getItem(key)
    return JSON.parse(task)
  },

  updateTask(key, newValue) {
    const task = this.getTask(key)
    task.name = newValue
    this.store.setItem(key, JSON.stringify(task))
  },

  getTasks() {
    const tasks = []
    for (let i = 0; i < this.store.length; i++) {
      const task = this.getTask(this.store.key(i))
      tasks.push(task)
    }
    return tasks
  },
}

export default tasksState
