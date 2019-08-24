import React from 'react'
import SVG from 'react-inlinesvg'

// import FrownImg from 'assets/images/frown.svg'
// import MehImg from 'assets/images/meh.svg'
// import SmileImg from 'assets/images/smile.svg'

export const creditScore = (score) => {
  let scoreJsx

  switch (true) {
    case (score < 300):
      scoreJsx = <div className='text-red-500'>
        <SVG
          src='/static/frown.svg'
          className=' inline-block'
        /> <span className='text-gray-700'>{score}</span>
      </div>
    case (score >= 300 && score < 400):
      scoreJsx = <div className='text-orange-500'>
        <SVG
          src='/static/meh.svg'
          className=' inline-block'
        /> <span className='text-gray-700'>{score}</span>
      </div>
    case (score >= 400 && score < 600):
      scoreJsx = <div className='text-gray-700'>
        <SVG
          src='/static/smile.svg'
          className=' inline-block'
        /> <span className='text-gray-700'>{score}</span>
      </div>
    case (score >= 600):
      scoreJsx = <div className='text-green-500'>
        <SVG
          src='/static/smile.svg'
          className=' inline-block'
        /> <span className='text-gray-700'>{score}</span>
      </div>
  }

  return scoreJsx
}
