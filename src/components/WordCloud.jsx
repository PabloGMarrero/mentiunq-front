import React from "react"
import { TagCloud } from "react-tagcloud"
import { useState, useEffect } from "react"

const WordCloud = ({ currentQuestion }) => {
  const [options] = useState([])

  useEffect(() => {
    if (currentQuestion) {
      if (currentQuestion.mentiOptions != undefined) {
        processOptions(currentQuestion.mentiOptions)
      }
    }
  }, [currentQuestion])

  const processOptions = (mentiOptions) => {
    console.log(mentiOptions)
    mentiOptions.forEach((mentiOption) => {
      let foundElement = options.find(
        (element) =>
          element.value.toLowerCase() === mentiOption.name.toLowerCase(),
      )

      if (foundElement === undefined) {
        options.push({ value: mentiOption.name, count: 1 })
      } else {
        foundElement.count = foundElement.count + 1
      }
    })
  }

  return <TagCloud minSize={12} maxSize={70} tags={options} />
}

export default WordCloud
