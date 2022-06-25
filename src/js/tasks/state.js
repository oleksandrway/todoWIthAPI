const tasksState = {
  state: [],
  removeTask(id) {
    this.state.splice(this.getTask(id), 1)
  },
  addTask({ name, id }) {
    const taskInfo = {
      id,
      name,
      completed: false,
    }
    this.state.push(taskInfo)
  },
  changeTaskState(id) {
    const task = this.getTask(id)
    task.completed = !task.completed
  },

  getTask(id) {
    return this.state.find(item => item.id === id)
  },

  updateTask(id, newValue) {
    const task = this.getTask(id)
    task.name = newValue
  },
}

export default tasksState
