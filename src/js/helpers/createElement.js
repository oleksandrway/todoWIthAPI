function createELement(tag, props) {
  const element = document.createElement(tag)

  Object.keys(props).forEach((key) => {
    if (key.startsWith('data-'))
      element.setAttribute(key, props[key])

    else
      element[key] = props[key]
  })

  return element
}

export { createELement }
