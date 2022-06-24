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
  changeTaskState(task) {
    task.completed = !task.completed
  },

  getTask(id) {
    return this.state.find(item => item.id === id)
  },

  updateTask(task, newValue) {
    task.name = newValue
  },
}

export default tasksState
