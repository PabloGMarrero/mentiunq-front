const open = [
  {
    label: "Word Cloud",
    value: "2",
  },
  {
    label: "Open ended",
    value: "3",
  },
]

const close = [
  {
    label: "Multiple choice",
    value: "1",
  },

  {
    label: "Ranking",
    value: "5",
  },
]

const content = [
  {
    label: "Heading",
    value: "9",
  },
  {
    label: "Paragraph",
    value: "10",
  },
]

const mock = [
  { label: "Preguntas abiertas", options: open },
  { label: "Preguntas cerradas", options: close },
  { label: "Slides contenido", options: content },
]

const findAll = () => new Promise((resolve) => resolve(mock))

export { findAll }
