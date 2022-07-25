import '../styles/main.scss'
import { TasksController } from '@/js/tasks/tasksController'
import { TasksView } from '@/js/tasks/tasksView'
import { TasksModel } from '@/js/tasks/tasksModel'
import { TasksAPIModel } from '@/js/tasks/tasksAPIModel'

window.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.loader')
  loader.remove()
})

const view = new TasksView({
  mainContainerSelector: '.todo-container',
  formSelector: '.add-task-form',
  todoContainerSelector: '#tasks-todo',
  completedContainerSelector: '#tasks-completed',
  tasksContainerSelector: '.tasks-wrapper',
},

)
const model = new TasksModel('dodo')

const tasksController = new TasksController({ tasksView: view, tasksModel: model })

const view2 = new TasksView({
  mainContainerSelector: '.todo-container-copy',
  formSelector: '.add-task-form',
  todoContainerSelector: '#tasks-todo',
  completedContainerSelector: '#tasks-completed',
  tasksContainerSelector: '.tasks-wrapper',
})
const model2 = new TasksAPIModel({ URL: ' http://localhost:8080' })
const tasksController2 = new TasksController({ tasksView: view2, tasksModel: model2 })
