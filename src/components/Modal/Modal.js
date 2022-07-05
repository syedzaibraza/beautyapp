import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { questions } from '../../Constants/AppConstants'
import QuestionCard from '../QuestionCard/QuestionCard'
import './Modal.css'
import { X } from 'react-feather'

const MyModal = ({ open, closeModal }) => {
  const [questionIndex, setQuestionIndex] = useState(0)
  const isNextDisabled = questions.length - 1 <= questionIndex
  const isPreviousDisabled = questionIndex <= 0
  return (
    <Modal
      show={open}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      backdrop={true}
      dialogClassName='my-modal'
    >
      <Modal.Body className='modal-body'>
        <div className='modal-head' onClick={closeModal}>
          <X size={70} />
        </div>
        {questions && (
          <QuestionCard
            question={questions[questionIndex]}
            currentIndex={questionIndex}
            setIndex={setQuestionIndex}
            isNextDisabled={isNextDisabled}
            isLastStep={isNextDisabled}
            isPreviousDisabled={isPreviousDisabled}
          />
        )}
      </Modal.Body>
    </Modal>
  )
}
export default MyModal
