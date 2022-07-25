
class TasksAPIModel {
  constructor({ URL }) {
    this.URL = URL
  }

  async getTasks() {
    const response = await fetch(`${this.URL}/list`)
    if (!response.ok)
      throw new Error(response.status)

    const result = await response.json()
    return result.data
  }

  async removeTask(id) {
    const response = await fetch(`${this.URL}/delete`, {
      method: 'POST',
      body: JSON.stringify({ id }),
      headers: {
        'Content-type': 'application/json',
      },
    })
    if (!response.ok)
      throw new Error(`Error status: ${response.status}`)
  }

  async createTask({ name }) {
    const response = await fetch(`${this.URL}/create`, {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: {
        'Content-type': 'application/json',
      },
    })
    if (!response.ok)
      throw new Error(`Error status: ${response.status}`)

    const result = await response.json()

    return result.data
  }

  async changeTaskState({ id, completed }) {
    const response = await fetch(`${this.URL}/update`, {
      method: 'POST',
      body: JSON.stringify({
        id,
        completed,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    })
    if (!response.ok)
      throw new Error(`Error status: ${response.status}`)
  }

  async editTask({ id, newValue }) {
    const response = await fetch(`${this.URL}/update`, {
      method: 'POST',
      body: JSON.stringify({
        id,
        name: newValue,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    })
    if (!response.ok)
      throw new Error(`Error status: ${response.status}`)
  }
}

export { TasksAPIModel }
