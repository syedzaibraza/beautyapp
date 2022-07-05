import React, { useState } from 'react'
import AnswerCard from '../AnswerCard/AnswerCard'
import './QuestionCard.css'
import IconButton from '../IconButton/IconButton'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { BASE_URL } from '../../Constants/AppConstants'
import ProductCard from '../ProductCard/ProductCard'
import { errorToaster, successToaster } from '../Toasters/Toasters'
import { useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'

export default function QuestionCard({
  question,
  setIndex,
  currentIndex,
  isNextDisabled,
  isPreviousDisabled,
  isLastStep
}) {
  const queryclient = useQueryClient()
  const navigator = useNavigate()
  const [singleChipValue, setSingleChipValue] = useState('')
  const [productsFetched, setProductsFetched] = useState(false)
  const [products, setProducts] = useState([])

  const [answers, setAnswers] = useState({
    answer1: '',
    answer2: [],
    answer3: '',
    answer4: [],
    answer5: ''
  })
  const fetchFilteredProducts = async (finalAnswers) => {
    let headersList = {
      Accept: '*/*',
      'User-Agent': 'Thunder Client (https://www.thunderclient.com)'
    }
    // setLoading(true)
    let bodyContent = JSON.stringify({
      product_usefor: finalAnswers
    })
    const res = await fetch(`${BASE_URL}product/select_product.php `, {
      method: 'POST',
      headers: headersList,
      body: bodyContent
    })
    const data = await res.json()
    setProductsFetched(true)
    if (data?.fetchproduct) {
      setProducts(data.fetchproduct)
      // setProducts(data?.fetchproduct)
    }
    // setLoading(false)
  }
  const handleClick = (answer) => {
    let ans = { ...answers }
    if (currentIndex === 0) {
      if (ans.answer1 === answer) {
        ans.answer1 = ''
      } else {
        ans.answer1 = answer
      }
    }
    if (currentIndex === 1) {
      if (ans.answer2.includes(answer)) {
        let updatedAnswer = ans?.answer2?.filter((a) => a !== answer)
        ans.answer2 = updatedAnswer
      } else {
        ans.answer2 = [...ans.answer2, answer]
      }
    }
    if (currentIndex === 2) {
      if (ans.answer3 === answer) {
        ans.answer3 = ''
      } else {
        ans.answer3 = answer
      }
    }
    if (currentIndex === 3) {
      console.log(answer)
      if (ans.answer4.includes(answer)) {
        let updatedAnswer = ans?.answer4?.filter((a) => a !== answer)
        ans.answer4 = updatedAnswer
      } else {
        if (
          answer === 'low-eye-bags' ||
          answer === 'medium-eye-bags' ||
          answer === 'high-eye-bags'
        ) {
          let updatedAnswer = ans?.answer4?.filter(
            (a) =>
              a !== 'low-eye-bags' &&
              a !== 'medium-eye-bags' &&
              a !== 'high-eye-bags'
          )
          ans.answer4 = updatedAnswer

          ans.answer4 = [...ans.answer4, answer]
        } else if (
          answer === 'low-darks-spots' ||
          answer === 'medium-darks-spots' ||
          answer === 'high-darks-spots'
        ) {
          let updatedAnswer = ans?.answer4?.filter(
            (a) =>
              a !== 'low-darks-spots' &&
              a !== 'medium-darks-spots' &&
              a !== 'high-darks-spots'
          )
          ans.answer4 = updatedAnswer

          ans.answer4 = [...ans.answer4, answer]
        } else {
          let updatedAnswer = ans?.answer4?.filter(
            (a) =>
              a !== 'no-wrinkles' &&
              a !== 'low-wrinkles' &&
              a !== 'medium-wrinkles' &&
              a !== 'high-wrinkles'
          )
          ans.answer4 = updatedAnswer

          ans.answer4 = [...ans.answer4, answer]
        }
      }
    }
    if (currentIndex === 4) {
      if (ans.answer5 === answer) {
        ans.answer5 = ''
      } else {
        ans.answer5 = answer
      }
    }

    setAnswers(ans)
  }

  const getNextDisabled = () => {
    if (currentIndex === 0) {
      if (answers?.answer1 === '') {
        return true
      }
    }
    if (currentIndex === 2) {
      if (answers?.answer3 === '') {
        return true
      }
    }
    if (currentIndex === 3) {
      if (
        (!answers?.answer4.includes('low-darks-spots') &&
          !answers?.answer4.includes('medium-darks-spots') &&
          !answers?.answer4.includes('high-darks-spots')) ||
        (!answers?.answer4.includes('low-eye-bags') &&
          !answers?.answer4.includes('medium-eye-bags') &&
          !answers?.answer4.includes('high-eye-bags')) ||
        (!answers?.answer4.includes('low-wrinkles') &&
          !answers?.answer4.includes('medium-wrinkles') &&
          !answers?.answer4.includes('high-wrinkles') &&
          !answers?.answer4.includes('no-wrinkles'))
      ) {
        return true
      }
    }
  }
  const getChipState = (answer) => {
    if (currentIndex === 0) {
      return answers.answer1 === answer
    }
    if (currentIndex === 1) {
      return answers.answer2.includes(answer)
    }
    if (currentIndex === 2) {
      return answers.answer3 === answer
    }
    if (currentIndex === 3) {
      return answers.answer4.includes(answer?.val)
    }
    if (currentIndex === 4) {
      return answers.answer5 === answer
    }
  }

  return (
    <>
      {productsFetched ? (
        products?.length === 0 ? (
          <div>No Matched Products Found</div>
        ) : (
          <div
            className='product-list'
            style={{ maxHeight: '80vh', overflow: 'scroll' }}
          >
            {products.map((product, index) => {
              return (
                <div>
                  <ProductCard
                    img={product.product_image}
                    key={index}
                    AddToCart={() => {
                      const userLogin = JSON.parse(
                        localStorage.getItem('user_info')
                      )
                      if (userLogin) {
                        let headersList = {
                          Accept: '*/*',
                          'Content-Type': 'application/json'
                        }
                        let bodyContent = JSON.stringify({
                          product_id: product.product_id,
                          user_id: userLogin[0].user_id,
                          quantity: 1
                        })
                        fetch(`${BASE_URL}product_Cart/generate_cart.php`, {
                          method: 'POST',
                          body: bodyContent,
                          headers: headersList
                        })
                          .then(function (response) {
                            return response.json()
                          })
                          .then(function (data) {
                            console.log(data)
                            // alert(data);
                            queryclient.invalidateQueries('cart')

                            if (data.success === true) {
                              successToaster(`Product ${data.msg} to Cart`)
                            } else {
                              errorToaster('someThing went wrong')
                            }
                          })
                      } else {
                        navigator('/sign-in')
                      }
                    }}
                    onClick={() => {
                      navigator(`/product/${product.product_id}`)
                    }}
                  />
                </div>
              )
            })}
          </div>
        )
      ) : (
        <div className='question-card'>
          <p className='question-text'>{question?.questionText}</p>
          <div
            className='question-body'
            style={{ display: currentIndex === 3 ? 'block' : 'flex' }}
          >
            {question?.answers.map((answer, index) => (
              <AnswerCard
                key={index}
                trackKey={index}
                answer={answer}
                currentIndex={currentIndex}
                onClick={handleClick}
                chipState={getChipState(answer)}
                chip={singleChipValue}
              />
            ))}
          </div>

          <div className='question-footer'>
            <IconButton
              onClick={() => {
                setIndex(currentIndex - 1)
              }}
              icon={<ChevronLeft />}
              disabled={isPreviousDisabled}
            />

            <IconButton
              onClick={() => {
                if (isLastStep) {
                  let finalAnswers = [
                    answers?.answer1,
                    ...answers?.answer2,
                    answers?.answer3,
                    ...answers?.answer4,
                    answers?.answer5
                  ]
                  fetchFilteredProducts(finalAnswers)
                } else {
                  setIndex(currentIndex + 1)
                }
              }}
              icon={<ChevronRight />}
              disabled={getNextDisabled()}
            />
          </div>
        </div>
      )}
    </>
  )
}
