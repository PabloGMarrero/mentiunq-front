const popular = [
  {
    label: 'Multiple choice',
    value: '1'
  },
  {
    label: 'Word Cloud',
    value: '2'
  },
  {
    label: 'Open ended',
    value: '3'
  },
  {
    label: 'Scales',
    value: '4'
  },
  {
    label: 'Ranking',
    value: '5'
  },
  {
    label: 'Q&A',
    value: '6'
  }

]

const quiz = [
  {
    label: 'Select Answer',
    value: '7'
  },
  {
    label: 'Type Answer',
    value: '8'
  }
]

const content = [
  {
    label: 'Heading',
    value: '9'
  },
  {
    label: 'Paragraph',
    value: '10'
  },
  {
    label: 'Bullets',
    value: '11'
  },
  {
    label: 'Image',
    value: '12'
  },
  {
    label: 'Video',
    value: '13'
  }

]

const mock = [
  { label: 'Popular Questions', options: popular },
  { label: 'Quiz Competition', options: quiz },
  { label: 'Content slides', options: content }
]

const findAll = () => new Promise(resolve => resolve(mock))

export { findAll }
