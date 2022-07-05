import '../styles/main.scss'
import { TasksController } from '@/js/tasks/tasksController'
import { TasksView } from '@/js/tasks/tasksView'
import { TasksModel } from '@/js/tasks/tasksModel'


const view = new TasksView({ mainContainerSelector: '.todo-container', formSelector: '.add-task-form', todoContainerSelector: '#tasks-todo', completedContainerSelector: '#tasks-completed' },

)
const model = new TasksModel('dodo')

const tasksController = new TasksController({ tasksView: view, tasksModel: model })

const viewCopy = new TasksView({ mainContainerSelector: '.todo-container-copy', formSelector: '.add-task-form', todoContainerSelector: '#tasks-todo', completedContainerSelector: '#tasks-completed' })
const modelCopy = new TasksModel('dodo-copy')
const tasksControllerCopy = new TasksController({ tasksView: viewCopy, tasksModel: modelCopy })
