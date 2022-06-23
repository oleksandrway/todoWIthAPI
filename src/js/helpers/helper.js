export function createELement(tag, props) {
  const element = document.createElement(tag)

  Object.keys(props).forEach((key) => {
    if (key.startsWith('data-'))
      element.setAttribute(key, props[key])

    else
      element[key] = props[key]
  })

  return element
}

export function getRandomId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}
