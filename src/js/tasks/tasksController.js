import TasksView from '@/js/tasks/tasksView'
// import TasksView from '@/js/tasks/TasksView'
import tasksModel from '@/js/tasks/tasksModel'

export class TasksController {
  constructor(formSelector, todoContainerSelector, completedContainerSelector) {
    // sayHI()

    this.formSelector = formSelector
    this.todoContainerSelector = todoContainerSelector
    this.completedContainerSelector = completedContainerSelector
    this.storedTasks = tasksModel.getTasks()

    this.tasksView = new TasksView(
      document.querySelector(this.formSelector),
      document.querySelector(this.todoContainerSelector),
      document.querySelector(this.completedContainerSelector),
    )

    this.storedTasks.forEach(task => this.tasksView.renderTask(task))

    this.tasksView.hooks.on('task-add', ({ name, id }) => {
      this.addTask({ name, id })
    })
    this.tasksView.hooks.on('task-remove', this.removeTask.bind(this))
    // this.tasks.hooks.on('task-remove', (id) => {
    // this.removeTask(id)
    // })
    this.tasksView.hooks.on('task-state-change', (id) => {
      this.changeTaskState(id)
    })
    this.tasksView.hooks.on('task-update', (id, newValue) => {
      this.editTask(id, newValue)
    })
  }

  addTask({ name, id }) {
    tasksModel.addTask({ name, id })
    this.tasksView.renderTask(tasksModel.getTask(id))
  }

  removeTask(id) {
    tasksModel.removeTask(id)
    this.tasksView.removeTask(id)
  }

  changeTaskState(id) {
    tasksModel.changeTaskState(id)
    this.tasksView.changeTaskState(tasksModel.getTask(id))
  }

  editTask(id, newValue) {
    tasksModel.updateTask(id, newValue)
    this.tasksView.editTask(newValue, tasksModel.getTask(id))
  }
}

// export default function tasksInit() {
//   const form = document.querySelector('.add-task-form')
//   const todoContainer = document.querySelector('#tasks-todo')
//   const completedContainer = document.querySelector('#tasks-completed')
//   const storagedTasks = tasksState.getTasks()
//   const tasks = new Tasks(form, todoContainer, completedContainer)

//   storagedTasks.forEach(task => tasks.renderTask(task))

//   tasks.hooks.on('task-add', ({ name, id }) => {
//     tasksState.addTask({ name, id })
//     tasks.renderTask(tasksState.getTask(id))
//   })

//   tasks.hooks.on('task-remove', (id) => {
//     tasksState.removeTask(id)
//     tasks.removeTask(id)
//   })

//   tasks.hooks.on('task-state-change', (id) => {
//     tasksState.changeTaskState(id)
//     tasks.changeTaskState(tasksState.getTask(id))
//   })

//   tasks.hooks.on('task-update', (id, newValue) => {
//     tasksState.updateTask(id, newValue)
//     tasks.editTask(newValue, tasksState.getTask(id))
//   })
// }
