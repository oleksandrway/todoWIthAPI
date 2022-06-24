import Tasks from '@/js/tasks/Tasks'
import tasksState from '@/js/tasks/state'

export default function tasksInit() {
  const form = document.querySelector('.add-task-form')
  const todoContainer = document.querySelector('#tasks-todo')
  const completedContainer = document.querySelector('#tasks-completed')
  const tasks = new Tasks(form, todoContainer, completedContainer, {
    onAddClick: ({ name, id }) => {
      tasksState.addTask({ name, id })
      const task = tasksState.getTask(id)
      tasks.hooks.emit('task-added', null, task)
    },
    onRemoveClick: (id) => {
      tasksState.removeTask(id)
      tasks.hooks.emit('task-removed', null, id)
    },
    onCheckboxClick: (id) => {
      const task = tasksState.getTask(id)
      tasksState.changeTaskState(task)
      tasks.hooks.emit('task-state-changed', null, task)
    },
    onEditClick: (id, newValue) => {
      const task = tasksState.getTask(id)
      tasksState.updateTask(task, newValue)
      tasks.hooks.emit('task-updated', null, newValue, task)
    },
  })
}
