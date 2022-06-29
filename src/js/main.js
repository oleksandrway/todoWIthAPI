import '../styles/main.scss'
// import tasksInit from '@/js/tasks/index'
import { TasksController } from '@/js/tasks/tasksController'

// tasksInit()

const tasksController = new TasksController('.add-task-form', '#tasks-todo', '#tasks-completed')
