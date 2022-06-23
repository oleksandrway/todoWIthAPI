import { tasksState } from './state'

export default function formInit(formSelector) {
  const form = document.querySelector(formSelector)
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const taskName = form.querySelector('[name="task"]').value

    if (taskName) {
      tasksState.addTask(taskName)
      form.reset()
    }
  })
}
