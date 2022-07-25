import EventBus from 'js-event-bus'
import { createELement } from '@/js/helpers/createElement'

class TasksView {
  constructor({ mainContainerSelector, formSelector, todoContainerSelector, completedContainerSelector, tasksContainerSelector }) {
    this.mainContainer = document.querySelector(` ${mainContainerSelector}`)
    this.todoContainer = document.querySelector(` ${mainContainerSelector}  ${todoContainerSelector}`)
    this.completedContainer = document.querySelector(` ${mainContainerSelector} ${completedContainerSelector}`)
    this.tasksContainer = document.querySelector(` ${mainContainerSelector} ${tasksContainerSelector}`)
    this.form = document.querySelector(`${mainContainerSelector} ${formSelector}`)
    this.hooks = new EventBus()

    this.formInit(this.form)
    this.mainContainer.addEventListener('click', e => this.tasksEventsListener(e))
  }

  showInnerTaskLoader(id) {
    const taskEl = document.querySelector(`[data-id= "${id}"]`)
    const taskItemText = taskEl.querySelector('.task-item__name')

    const loader = createELement('img', {
      src: '/icons/spinnerWhite.svg',
      classList: 'task-loader',
    })

    taskItemText.insertAdjacentElement('afterend', loader)
    taskItemText.hidden = 'hidden'
  }

  hideInnerTaskLoader(id) {
    const taskEl = document.querySelector(`[data-id= "${id}"]`)
    const loader = taskEl.querySelector('.task-loader')
    const taskItemText = taskEl.querySelector('.task-item__name')

    loader.remove()
    taskItemText.hidden = ''
  }

  showTaskLoader() {
    const loader = createELement('img', {
      src: '/icons/spinnerWhite.svg',
      classList: 'task-loader',
    })

    this.todoContainer.appendChild(loader)
  }

  hideTaskLoader() {
    const loader = this.todoContainer.querySelector('.task-loader')
    loader.remove()
  }

  showTasksLoader() {
    const loader = createELement('img', {
      src: '/icons/spinnerWhite.svg',
      classList: 'tasks-loader',
    })

    this.tasksContainer.hidden = 'hidden'
    this.mainContainer.appendChild(loader)
  }

  hideTasksLoader() {
    const loader = this.mainContainer.querySelector('.tasks-loader')
    loader.remove()
    this.tasksContainer.hidden = ''
  }

  showErrorMessage(message) {
    console.error('error')
  }

  formInit(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      const taskName = form.querySelector('[name="task"]').value
      if (taskName) {
        this.hooks.emit('task-add', null, {
          name: taskName,

        })
        form.reset()
      }
    })
  }

  tasksEventsListener(e) {
    // e.preventDefault()
    if (e.target.classList.contains('task-item__checkbox')) {
      const checkbox = e.target
      const id = checkbox.closest('.task-item').dataset.id
      this.hooks.emit('task-state-change', null, { id, completed: checkbox.checked })
      checkbox.checked = !checkbox.checked
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
    const taskEl = document.querySelector(`[data-id= "${id}"]`)
    const taskItemText = taskEl.querySelector('.task-item__name')
    taskItemText.textContent = newValue
  }

  toggleEditMode({ id }) {
    const taskEl = document.querySelector(`[data-id= "${id}"]`)

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
    const task = document.querySelector(`[data-id= "${id}"]`)
    if (task)
      task.remove()
  }

  changeTaskState({ id, completed }) {
    const taskItem = document.querySelector(`[data-id= "${id}"]`)
    const editButton = taskItem.querySelector('.btn--type-edit')
    const checkbox = taskItem.querySelector('.task-item__checkbox')
    // checkbox.checked = !checkbox.checked
    // console.log(checkbox.checked)
    if (completed) {
      this.completedContainer.appendChild(taskItem)
      editButton.style.display = 'none'
    }
    else {
      this.todoContainer.appendChild(taskItem)
      editButton.style.display = 'block'
    }
    checkbox.checked = !checkbox.checked
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
