
class TasksController {
  constructor({ tasksModel, tasksView }) {
    this.tasksModel = tasksModel
    this.tasksView = tasksView

    this.renderStoredTasks()

    this.tasksView.hooks.on('task-add', ({ name, id }) => {
      this.createTask({ name, id })
    })
    this.tasksView.hooks.on('task-remove', (id) => {
      this.removeTask(id)
    })

    this.tasksView.hooks.on('task-state-change', ({ id, completed }) => {
      this.changeTaskState({ id, completed })
    })
    this.tasksView.hooks.on('task-update', ({ id, newValue }) => {
      this.editTask({ id, newValue })
    })
  }

  async renderStoredTasks() {
    this.tasksView.showTasksLoader()
    const tasksList = await this.tasksModel.getTasks()
    // const tasksList = await this.tasksModel.getTasks().then(() => {
    //   this.tasksView.hideTasksLoader()
    // })

    tasksList.forEach(task => this.tasksView.renderTask(task))
    this.tasksView.hideTasksLoader()
  }

  async createTask({ name }) {
    const task = await this.tasksModel.createTask({ name })
    this.tasksView.renderTask(task)
  }

  async removeTask(id) {
    await this.tasksModel.removeTask(id)
    this.tasksView.removeTask(id)
  }

  changeTaskState({ id, completed }) {
    this.tasksModel.changeTaskState({ id, completed })
    this.tasksView.changeTaskState({ id, completed })
  }

  async editTask({ id, newValue }) {
    await this.tasksModel.updateTask({ id, newValue })
    this.tasksView.editTask({ newValue, id })
  }
}

export { TasksController }
