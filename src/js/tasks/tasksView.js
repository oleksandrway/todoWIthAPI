import EventBus from 'js-event-bus'
import { createELement, getRandomId } from '@/js/helpers/helper'

class TasksView {
  constructor(form, todoContainer, completedContainer) {
    this.todoContainer = todoContainer
    this.completedContainer = completedContainer
    this.hooks = new EventBus()

    this.formInit(form)
  }

  formInit(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      const taskName = form.querySelector('[name="task"]').value
      if (taskName) {
        this.hooks.emit('task-add', null, {
          name: taskName,
          id: getRandomId(),
        })
        form.reset()
      }
    })
  }

  createTaskItem(taskInfo) {
    const taskItem = createELement('li', {
      'className': 'task-item tasks-list__item',
      'data-id': taskInfo.id,
    })

    const taskItemControlsWrapper = createELement('div', {
      className: 'task-item-controls',
    })

    const taskItemEditButton = createELement('button', {
      className: 'btn btn--type-edit',
      innerHTML: '<img src="/icons/options.svg" alt="">',
      onclick: () => {
        const newTaskName = this.getEditingFieldValue(taskItem)
        this.toggleEditMode(taskItem)
        this.hooks.emit('task-update', null, taskInfo.id, newTaskName)
      },
    })

    if (taskInfo.completed)
      taskItemEditButton.style.display = 'none'

    const taskItemDeleteButton = createELement('button', {
      className: 'btn btn--type-delete',
      innerHTML: '<img src="/icons/icons8-delete.svg" alt="">',
      onclick: () => {
        this.hooks.emit('task-remove', null, taskInfo.id)
      },
    })

    const taskItemCheckbox = createELement('input', {
      className: 'task-item__checkbox',
      type: 'checkbox',
      onclick: () => {
        this.hooks.emit('task-state-change', null, taskInfo.id)
      },
    })

    if (taskInfo.completed)
      taskItemCheckbox.checked = true

    const taskItemText = createELement('div', {
      className: 'task-item__name',
      textContent: taskInfo.name,
    })

    const editingForm = createELement('form', {
      className: 'task-item__editing-form',
      type: 'text',
      onsubmit: () => {
        const newTaskName = this.getEditingFieldValue(taskItem)
        this.toggleEditMode(taskItem)
        this.hooks.emit('task-update', null, taskInfo.id, newTaskName)
      },
    })
    const editingField = createELement('input', {
      className: 'task-item__editing-field',
      type: 'text',

    })

    // editingField.onSubmit   toggleEditMode

    taskItemControlsWrapper.appendChild(taskItemEditButton)
    taskItemControlsWrapper.appendChild(taskItemDeleteButton)
    taskItem.appendChild(taskItemCheckbox)
    taskItem.appendChild(taskItemText)
    editingForm.appendChild(editingField)
    taskItem.appendChild(editingForm)
    taskItem.appendChild(taskItemControlsWrapper)

    return taskItem
  }

  renderTask(taskInfo) {
    if (taskInfo.completed)
      this.completedContainer.appendChild(this.createTaskItem(taskInfo))
    else
      this.todoContainer.appendChild(this.createTaskItem(taskInfo))
  }

  removeTask(id) {
    const task = document.querySelector(`[data-id="${id}"]`)
    task.remove()
  }

  changeTaskState({ id, completed }) {
    const taskItem = document.querySelector(`[data-id="${id}"]`)
    const editButton = taskItem.querySelector('.btn--type-edit')
    if (completed) {
      this.completedContainer.appendChild(taskItem)
      editButton.style.display = 'none'
    }
    else {
      this.todoContainer.appendChild(taskItem)
      editButton.style.display = 'block'
    }
  }

  editTask(newValue, task) {
    const taskEl = document.querySelector(`[data-id="${task.id}"]`)
    const taskItemText = taskEl.querySelector('.task-item__name')
    const editingField = taskEl.querySelector('.task-item__editing-field')

    taskEl.classList.toggle('task-item--editing')
    taskItemText.classList.toggle('task-item__name--hidden')
    editingField.classList.toggle('task-item__editing-field--active')

    if (taskEl.classList.contains('task-item--editing')) {
      editingField.value = taskItemText.textContent
      editingField.focus()
    }
    else { taskItemText.textContent = newValue }
  }

  toggleEditMode(taskItem) {
    const editBtn = taskItem.querySelector('.btn--type-edit')
    const checkbox = taskItem.querySelector('.task-item__checkbox')
    editBtn.classList.toggle('btn--type-edit-active')
    if (editBtn.classList.contains('btn--type-edit-active')) {
      editBtn.innerHTML = '<img src="/icons/save.svg" alt="">'
      checkbox.setAttribute('disabled', 'disabled')
    }

    else {
      editBtn.innerHTML = '<img src="/icons/options.svg" alt="">'
      checkbox.removeAttribute('disabled')
    }
  }

  getEditingFieldValue(element) {
    const editingField = element.querySelector('.task-item__editing-field')
    let taskName = null
    if (editingField)
      taskName = editingField.value

    return taskName
  }
}

export default TasksView
