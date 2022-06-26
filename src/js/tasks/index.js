import Tasks from '@/js/tasks/Tasks'
import tasksState from '@/js/tasks/state'

export default function tasksInit() {
  const form = document.querySelector('.add-task-form')
  const todoContainer = document.querySelector('#tasks-todo')
  const completedContainer = document.querySelector('#tasks-completed')
  const storagedTasks = tasksState.getTasks()
  const tasks = new Tasks(form, todoContainer, completedContainer)

  storagedTasks.forEach(task => tasks.renderTask(task))

  tasks.hooks.on('task-add', ({ name, id }) => {
    tasksState.addTask({ name, id })
    tasks.renderTask(tasksState.getTask(id))
  })

  tasks.hooks.on('task-remove', (id) => {
    tasksState.removeTask(id)
    tasks.removeTask(id)
  })

  tasks.hooks.on('task-state-change', (id) => {
    tasksState.changeTaskState(id)
    tasks.changeTaskState(tasksState.getTask(id))
  })

  tasks.hooks.on('task-update', (id, newValue) => {
    tasksState.updateTask(id, newValue)
    tasks.editTask(newValue, tasksState.getTask(id))
  })
}
