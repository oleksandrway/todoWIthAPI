import EventBus from 'js-event-bus'
import { createELement, getRandomId } from '@/js/helpers/helper'

export default class Tasks {
  constructor(form, todoContainer, completedContainer, { onAddClick, onRemoveClick, onCheckboxClick, onEditClick }) {
    this.todoContainer = todoContainer
    this.completedContainer = completedContainer
    this.onAddClick = onAddClick
    this.onRemoveClick = onRemoveClick
    this.onCheckboxClick = onCheckboxClick
    this.onEditClick = onEditClick
    this.hooks = new EventBus()

    this.hooks.on('task-added', this.addTask.bind(this))
    this.hooks.on('task-removed', this.removeTask.bind(this))
    this.hooks.on('task-updated', this.editTask.bind(this))
    this.hooks.on('task-state-changed', this.handleTaskState.bind(this))

    this.formInit(form)
  }

  formInit(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      const taskName = form.querySelector('[name="task"]').value
      this.onAddClick({
        name: taskName,
        id: getRandomId(),
      })

      form.reset()
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
        this.onEditClick(taskInfo.id, newTaskName)
      },
    })

    const taskItemDeleteButton = createELement('button', {
      className: 'btn btn--type-delete',
      innerHTML: '<img src="/icons/icons8-delete.svg" alt="">',
      onclick: () => {
        this.onRemoveClick(taskInfo.id)
      },
    })

    const taskItemCheckbox = createELement('input', {
      className: 'task-item__checkbox',
      type: 'checkbox',
      onclick: () => {
        this.onCheckboxClick(taskInfo.id)
      },
    })

    const taskItemText = createELement('div', {
      className: 'task-item__name',
      textContent: taskInfo.name,
    })

    const editingField = createELement('input', {
      className: 'task-item__editing-field',
      type: 'text',
    })

    taskItemControlsWrapper.appendChild(taskItemEditButton)
    taskItemControlsWrapper.appendChild(taskItemDeleteButton)
    taskItem.appendChild(taskItemCheckbox)
    taskItem.appendChild(taskItemText)
    taskItem.appendChild(editingField)
    taskItem.appendChild(taskItemControlsWrapper)

    return taskItem
  }

  addTask(taskInfo) {
    this.todoContainer.appendChild(this.createTaskItem(taskInfo))
  }

  removeTask(id) {
    const task = document.querySelector(`[data-id="${id}"]`)
    task.remove()
  }

  handleTaskState({ id, completed }) {
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

    if (taskEl.classList.contains('task-item--editing'))
      editingField.value = taskItemText.textContent

    else
      taskItemText.textContent = newValue
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
