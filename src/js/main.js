import '../styles/main.scss'
// import tasksInit from '@/js/tasks/index'
import { TasksController } from '@/js/tasks/tasksController'
import { TasksView } from '@/js/tasks/tasksView'
import { TasksModel } from '@/js/tasks/tasksModel'

// tasksInit()

const view = new TasksView(
  document.querySelector('.add-task-form'),
  document.querySelector('#tasks-todo'),
  document.querySelector('#tasks-completed'),
)
const model = new TasksModel('dodo')

const tasksController = new TasksController({ tasksView: view, tasksModel: model })

const viewCopy = new TasksView(
  document.querySelector('.add-task-form-copy'),
  document.querySelector('#tasks-todo-copy'),
  document.querySelector('#tasks-completed-copy'),
)
const modelCopy = new TasksModel('dodo-copy')
const tasksControllerCopy = new TasksController({ tasksView: viewCopy, tasksModel: modelCopy })
