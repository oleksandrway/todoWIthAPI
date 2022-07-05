
class TasksController {
  constructor({ tasksModel, tasksView }) {
    this.tasksModel = tasksModel
    this.tasksView = tasksView

    this.storedTasks = this.tasksModel.getTasks()

    this.storedTasks.forEach(task => this.tasksView.renderTask(task))

    this.tasksView.hooks.on('task-add', ({ name, id }) => {
      this.addTask({ name, id })
    })
    this.tasksView.hooks.on('task-remove', (id) => {
      this.removeTask(id)
    })

    this.tasksView.hooks.on('task-state-change', (id) => {
      this.changeTaskState(id)
    })
    this.tasksView.hooks.on('task-update', ({ id, newValue }) => {
      this.editTask({ id, newValue })
    })
  }

  addTask({ name, id }) {
    this.tasksModel.addTask({ name, id })
    this.tasksView.renderTask(this.tasksModel.getTask(id))
  }

  removeTask(id) {
    this.tasksModel.removeTask(id)
    this.tasksView.removeTask(id)
  }

  changeTaskState(id) {
    this.tasksModel.changeTaskState(id)
    this.tasksView.changeTaskState(this.tasksModel.getTask(id))
  }

  editTask({ id, newValue }) {
    this.tasksModel.updateTask({ id, newValue })
    this.tasksView.editTask({ newValue, id })
  }
}

export { TasksController }
