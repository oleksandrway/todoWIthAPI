import Tasks from './Task'
import { tasksState } from './state'

export default function formInit(formSelector) {
  const form = document.querySelector(formSelector)
  const todoContainer = document.querySelector('#tasks-todo')
  const completedContainer = document.querySelector('#tasks-completed')
  const tasks = new Tasks(tasksState, todoContainer, completedContainer)

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const taskName = form.querySelector('[name="task"]').value

    if (taskName) {
      tasksState.addTask(taskName)
      form.reset()
    }
  })
}
