
class TasksAPIModel {
  constructor({ URL }) {
    this.URL = URL
  }

  async getTasks() {
    const response = await fetch(`${this.URL}/list`)
      .then(res => res.json())

    if (!response.ok)
      console.log('status', response.status)

    return response.data
  }

  async removeTask(id) {
    await fetch(`${this.URL}/delete`, {
      method: 'POST',
      body: JSON.stringify({ id }),
      headers: {
        'Content-type': 'application/json',
      },
    })
  }

  async createTask({ name }) {
    const response = await fetch(`${this.URL}/create`, {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then(res => res.json())

    return response.data
  }

  async changeTaskState({ id, completed }) {
    await fetch(`${this.URL}/update`, {
      method: 'POST',
      body: JSON.stringify({
        id,
        completed,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    })
  }

  async getTask({ id }) {
    const tasksList = await this.getTasks()
    return tasksList.find(item => +item.id === +id)
  }

  async updateTask({ id, newValue }) {
    await fetch(`${this.URL}/update`, {
      method: 'POST',
      body: JSON.stringify({
        id,
        name: newValue,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    })
  }
}

export { TasksAPIModel }
