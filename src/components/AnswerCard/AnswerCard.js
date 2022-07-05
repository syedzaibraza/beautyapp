import React from 'react'
import './AnswerCard.css'

export default function AnswerCard({
  answer,
  onClick,
  chipState,

  trackKey,
  currentIndex
}) {
  return (
    <>
      {currentIndex !== 3 ? (
        <div
          onClick={() => {
            onClick(answer)
          }}
          className={`answer-card ${chipState ? 'selected_chip' : ''} `}
        >
          {answer}
        </div>
      ) : trackKey < 3 ? (
        <>
          {trackKey === 0 ? (
            <>
              <h6>EyeBags</h6>
            </>
          ) : null}
          <img
            style={{ borderColor: chipState ? '#d14086fc' : '#fff' }}
            onClick={() => {
              onClick(answer?.val)
            }}
            className='image-card'
            src={answer?.src}
            alt=''
          />
        </>
      ) : trackKey >= 3 && trackKey < 6 ? (
        <>
          {trackKey === 3 ? (
            <>
              <h6>Dark Spots</h6>
            </>
          ) : null}
          <img
            style={{ borderColor: chipState ? '#d14086fc' : '#fff' }}
            className='image-card'
            src={answer?.src}
            onClick={() => {
              onClick(answer?.val)
            }}
            alt=''
          />
        </>
      ) : (
        <>
          {trackKey === 6 ? (
            <>
              <h6>Wrinkles</h6>
            </>
          ) : null}
          <img
            style={{ borderColor: chipState ? '#d14086fc' : '#fff' }}
            className='image-card'
            onClick={() => {
              onClick(answer?.val)
            }}
            src={answer?.src}
            alt=''
          />
        </>
      )}
    </>
  )
}
