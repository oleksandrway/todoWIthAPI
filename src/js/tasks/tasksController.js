
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

  handleError(error) {
    console.log(error)
    alert(error.message)
  }

  async renderStoredTasks() {
    this.tasksView.showTasksLoader()

    try {
      const tasksList = await this.tasksModel.getTasks()
      if (tasksList)
        tasksList.forEach(task => this.tasksView.renderTask(task))
    }
    catch (error) {
      this.handleError(error)
    }
    finally {
      this.tasksView.hideTasksLoader()
    }
  }

  async createTask({ name }) {
    this.tasksView.showTaskLoader()

    try {
      const task = await this.tasksModel.createTask({ name })
      this.tasksView.renderTask(task)
    }
    catch (error) {
      this.handleError(error)
    }
    finally {
      this.tasksView.hideTaskLoader()
    }
  }

  async removeTask(id) {
    this.tasksView.showInnerTaskLoader(id)

    try {
      await this.tasksModel.removeTask(id)
      this.tasksView.removeTask(id)
    }
    catch (error) {
      this.handleError(error)
      this.tasksView.hideInnerTaskLoader(id)
    }
  }

  async changeTaskState({ id, completed }) {
    this.tasksView.showInnerTaskLoader(id)
    try {
      await this.tasksModel.changeTaskState({ id, completed })
      this.tasksView.changeTaskState({ id, completed })
    }
    catch (error) {
      this.handleError(error)
    }
    finally {
      this.tasksView.hideInnerTaskLoader(id)
    }
  }

  async editTask({ id, newValue }) {
    this.tasksView.showInnerTaskLoader(id)

    try {
      await this.tasksModel.editTask({ id, newValue })
      this.tasksView.editTask({ newValue, id })
    }
    catch (error) {
      this.handleError(error)
    }
    finally {
      this.tasksView.hideInnerTaskLoader(id)
    }
  }
}

export { TasksController }
