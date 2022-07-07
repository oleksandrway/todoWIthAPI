import '../styles/main.scss'
import { TasksController } from '@/js/tasks/tasksController'
import { TasksView } from '@/js/tasks/tasksView'
import { TasksModel } from '@/js/tasks/tasksModel'
import { TasksAPIModel } from '@/js/tasks/tasksAPIModel'

// window.addEventListener('load', () => {
//   const loader = document.querySelector('.loader')
//   loader.remove()
// })
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

const logAPI = async (url) => {
  const response = await fetch(url, {
    // method: 'GET',
    // headers: {
    //   'Content-Type': 'application/json;charset=utf-8',
    // },
    // mode: 'no-cors',

  })
    .then(res => res.json())
    .then(res => console.log(res.data))
  // if (!response.ok)
  //   console.log('status', response.status)

  // console.log('hi', await response.json())
}

logAPI('http://localhost:8080/list')

// fetch('http://localhost:8080/create', {
//   // mode: 'no-cors',
//   method: 'POST',
//   body: JSON.stringify({ name: 'test no cors' }),
//   headers: {
//     'Content-type': 'application/json',
//   },

// })
// fetch('http://localhost:8080/update', {
//   // mode: 'no-cors',
//   method: 'POST',
//   body: JSON.stringify({
//     name: 'updated again  ',
//     id: 18,
//     completed: true,
//   }),
//   headers: {
//     'Content-type': 'application/json',
//   },

// })

// logAPI('http://localhost:8080/list')
