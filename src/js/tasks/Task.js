import { stateBus } from './state'
import { createELement } from '@/js/helpers/helper'

export default class Tasks {
  constructor(state, todoContainer, completedContainer) {
    this.state = state
    this.todoContainer = todoContainer
    this.completedContainer = completedContainer

    stateBus.on('task-added', this.addTask.bind(this))
    stateBus.on('task-removed', this.removeTask.bind(this))
    stateBus.on('task-updated', this.editTask.bind(this))
    stateBus.on('task-state-changed', this.handleTaskState.bind(this))
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
      innerHTML: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <g data-name="Layer 2">
        <g data-name="options-2">
          <rect width="24" height="24" opacity="0" transform="rotate(90 12 12)" />
          <path
            d="M19 9a3 3 0 0 0-2.82 2H3a1 1 0 0 0 0 2h13.18A3 3 0 1 0 19 9zm0 4a1 1 0 1 1 1-1 1 1 0 0 1-1 1zM3 7h1.18a3 3 0 0 0 5.64 0H21a1 1 0 0 0 0-2H9.82a3 3 0 0 0-5.64 0H3a1 1 0 0 0 0 2zm4-2a1 1 0 1 1-1 1 1 1 0 0 1 1-1zM21 17h-7.18a3 3 0 0 0-5.64 0H3a1 1 0 0 0 0 2h5.18a3 3 0 0 0 5.64 0H21a1 1 0 0 0 0-2zm-10 2a1 1 0 1 1 1-1 1 1 0 0 1-1 1z" />
        </g>
      </g>
    </svg>`,
      onclick: ({ target }) => {
        const task = target.closest('.task-item')
        this.toggleEditButton(taskItemEditButton)
        this.state.updateTask({
          newValue: this.getEditingFieldValue(task),
          id: task.dataset.id,
        })
      },
    })

    const taskItemDeleteButton = createELement('button', {
      className: 'btn btn--type-delete',
      innerHTML: `<svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
      <path d="M 10 2 L 9 3 L 3 3 L 3 5 L 4.109375 5 L 5.8925781 20.255859 L 5.8925781 20.263672 C 6.023602 21.250335 6.8803207 22 7.875 22 L 16.123047 22 C 17.117726 22 17.974445 21.250322 18.105469 20.263672 L 18.107422 20.255859 L 19.890625 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 6.125 5 L 17.875 5 L 16.123047 20 L 7.875 20 L 6.125 5 z" />
    </svg>`,
      onclick: () => this.state.removeTask(taskInfo.id),
    })

    const taskItemCheckbox = createELement('input', {
      className: 'task-item__checkbox',
      type: 'checkbox',
      onclick: () => {
        this.state.changeTaskState(taskInfo.id)
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

  handleTaskState(task) {
    const taskItem = document.querySelector(`[data-id="${task.id}"]`)
    const editButton = taskItem.querySelector('.btn--type-edit')
    if (task.completed) {
      this.completedContainer.appendChild(taskItem)
      editButton.style.display = 'none'
    }
    else {
      this.todoContainer.appendChild(taskItem)
      editButton.style.display = 'block'
    }
  }

  editTask({ newValue, id }) {
    const task = document.querySelector(`[data-id="${id}"]`)
    const taskItemText = task.querySelector('.task-item__name')
    const editingField = task.querySelector('.task-item__editing-field')

    task.classList.toggle('task-item--editing')
    taskItemText.classList.toggle('task-item__name--hidden')
    editingField.classList.toggle('task-item__editing-field--active')

    if (task.classList.contains('task-item--editing'))
      editingField.value = taskItemText.textContent

    else
      taskItemText.textContent = newValue
  }

  toggleEditButton(btn) {
    btn.classList.toggle('btn--type-edit-active')
    if (btn.classList.contains('btn--type-edit-active')) {
      btn.innerHTML = '<?xml version="1.0" ?><svg id="Layer_1" style="enable-background:new 0 0 30 30;" version="1.1" viewBox="0 0 30 30" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M22,4h-2v6c0,0.552-0.448,1-1,1h-9c-0.552,0-1-0.448-1-1V4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18  c1.105,0,2-0.895,2-2V8L22,4z M22,24H8v-6c0-1.105,0.895-2,2-2h10c1.105,0,2,0.895,2,2V24z"/><rect height="5" width="2" x="16" y="4"/></svg>'
    }
    else {
      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
     <g data-name="Layer 2">
       <g data-name="options-2">
         <rect width="24" height="24" opacity="0" transform="rotate(90 12 12)" />
         <path
           d="M19 9a3 3 0 0 0-2.82 2H3a1 1 0 0 0 0 2h13.18A3 3 0 1 0 19 9zm0 4a1 1 0 1 1 1-1 1 1 0 0 1-1 1zM3 7h1.18a3 3 0 0 0 5.64 0H21a1 1 0 0 0 0-2H9.82a3 3 0 0 0-5.64 0H3a1 1 0 0 0 0 2zm4-2a1 1 0 1 1-1 1 1 1 0 0 1 1-1zM21 17h-7.18a3 3 0 0 0-5.64 0H3a1 1 0 0 0 0 2h5.18a3 3 0 0 0 5.64 0H21a1 1 0 0 0 0-2zm-10 2a1 1 0 1 1 1-1 1 1 0 0 1-1 1z" />
       </g>
     </g>
   </svg>`
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
