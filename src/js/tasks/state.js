import EventBus from 'js-event-bus'
import { getRandomId } from '../helpers/helper'
import Tasks from './Task'

export const stateBus = new EventBus()
export const tasksState = {
  state: [],
  removeTask(id) {
    this.state.splice(this.getTask(id), 1)
    stateBus.emit('task-removed', null, id)
  },
  addTask(value) {
    const taskInfo = {
      id: getRandomId(),
      name: value,
      completed: false,
    }
    this.state.push(taskInfo)
    stateBus.emit('task-added', null, taskInfo)
  },
  changeTaskState(id) {
    const task = this.getTask(id)
    task.completed = !task.completed
    stateBus.emit('task-state-changed', null, task)
  },

  getTask(id) {
    return this.state.find(item => item.id === id)
  },

  updateTask({ newValue, id }) {
    const task = this.getTask(id)
    task.name = newValue
    stateBus.emit('task-updated', null, { newValue, id })
  },
}
const todoContainer = document.querySelector('#tasks-todo')
const completedContainer = document.querySelector('#tasks-completed')
const tasks = new Tasks(tasksState, todoContainer, completedContainer)
