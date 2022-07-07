function createELement(tag, props) {
  const element = document.createElement(tag)

  if (props) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith('data-'))
        element.setAttribute(key, props[key])

      else
        element[key] = props[key]
    })
  }

  return element
}

export { createELement }
