import EventBus from 'js-event-bus'
import { getRandomId } from '@/js/helpers/getRandomId'
import { createELement } from '@/js/helpers/createELement'

class TasksView {
  constructor({ mainContainerSelector, formSelector, todoContainerSelector, completedContainerSelector }) {
    this.mainContainer = document.querySelector(` ${mainContainerSelector}`)
    this.todoContainer = document.querySelector(` ${mainContainerSelector}  ${todoContainerSelector}`)
    this.completedContainer = document.querySelector(` ${mainContainerSelector} ${completedContainerSelector}`)
    this.form = document.querySelector(`${mainContainerSelector} ${formSelector}`)

    this.hooks = new EventBus()
    this.formInit(this.form)

    this.mainContainer.addEventListener('click', e => this.tasksEventsListener(e))
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

  tasksEventsListener(e) {
    if (e.target.closest('.task-item__checkbox')) {
      const taskId = e.target.closest('.task-item').dataset.id
      this.hooks.emit('task-state-change', null, taskId)
    }
    else if (e.target.closest('.btn--type-edit') || e.target.classList.contains('task-item__editing-form')) {
      this.editListener(e)
    }
    else if (e.target.closest('.btn--type-delete')) {
      const taskItem = e.target.closest('.task-item')
      const id = taskItem.dataset.id
      this.hooks.emit('task-remove', null, id)
    }
  }

  editListener(e) {
    e.preventDefault()
    const taskItem = e.target.closest('.task-item')
    const newTaskName = this.getEditingFieldValue(taskItem)
    const id = taskItem.dataset.id
    this.toggleEditMode({ id })
    if (newTaskName)
      this.hooks.emit('task-update', null, { id, newValue: newTaskName })
  }

  editTask({ newValue, id }) {
    const taskEl = document.querySelector(`[data-id="${id}"]`)
    const taskItemText = taskEl.querySelector('.task-item__name')
    taskItemText.textContent = newValue
  }

  toggleEditMode({ id }) {
    const taskEl = document.querySelector(`[data-id="${id}"]`)

    const taskItemText = taskEl.querySelector('.task-item__name')
    const editBtn = taskEl.querySelector('.btn--type-edit')
    const checkbox = taskEl.querySelector('.task-item__checkbox')
    editBtn.classList.toggle('btn--type-edit-active')
    taskEl.classList.toggle('task-item--editing')

    if (editBtn.classList.contains('btn--type-edit-active')) {
      editBtn.innerHTML = '<img src="/icons/save.svg" alt="">'
      checkbox.setAttribute('disabled', 'disabled')
      const editingForm = this.createEditForm()
      checkbox.insertAdjacentElement('afterEnd', editingForm)
      const editingField = taskEl.querySelector('.task-item__editing-field')
      editingField.value = taskItemText.textContent
      editingField.focus()
    }

    else {
      editBtn.innerHTML = '<img src="/icons/options.svg" alt="">'
      checkbox.removeAttribute('disabled')
      const editingForm = taskEl.querySelector('.task-item__editing-form')
      editingForm.remove()
    }

    taskItemText.classList.toggle('task-item__name--hidden')
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
    })

    if (taskInfo.completed)
      taskItemEditButton.style.display = 'none'

    const taskItemDeleteButton = createELement('button', {
      className: 'btn btn--type-delete',
      innerHTML: '<img src="/icons/icons8-delete.svg" alt="">',
    })

    const taskItemCheckbox = createELement('input', {
      className: 'task-item__checkbox',
      type: 'checkbox',
    })

    if (taskInfo.completed)
      taskItemCheckbox.checked = true

    const taskItemText = createELement('div', {
      className: 'task-item__name',
      textContent: taskInfo.name,
    })

    taskItemControlsWrapper.appendChild(taskItemEditButton)
    taskItemControlsWrapper.appendChild(taskItemDeleteButton)
    taskItem.appendChild(taskItemCheckbox)
    taskItem.appendChild(taskItemText)

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

  createEditForm() {
    const editingForm = createELement('form', {
      className: 'task-item__editing-form',
      type: 'text',
      onsubmit: (e) => {
        this.tasksEventsListener(e)
      },
    })
    const editingField = createELement('input', {
      className: 'task-item__editing-field',
      type: 'text',

    })
    editingForm.appendChild(editingField)
    return editingForm
  }

  getEditingFieldValue(element) {
    const editingField = element.querySelector('.task-item__editing-field')
    let taskName = null
    if (editingField)
      taskName = editingField.value

    return taskName
  }
}

export { TasksView }
