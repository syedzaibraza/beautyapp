import babyImage from '../assests/baby-image.jpg'
import beautyProduct from '../assests/beauty-product.jpg'
import shoppingImage from '../assests/shopping-image.jpg'
// export const BASE_URL = "http://localhost/nahdionline-clone-1/API/";
// export const BASE_URL = "https://beautypredictor.000webhostapp.com/API/";
export const BASE_URL = 'https://quiet-caverns-02461.herokuapp.com/'

export const CROUSEL_DATA = [
  {
    img: babyImage,
    label: 'Shop Beauty Products',
    description: 'Pay Online'
  },
  {
    img: beautyProduct,
    label: 'Pay Online',
    description: 'Order Online'
  },
  {
    img: shoppingImage,
    label: 'Get Suggested Products',
    description: 'Answers Questions And Get Appropriate Products for your skin'
  }
]

export const questions = [
  {
    questionText: 'What is your skin type?',
    answers: ['Normal', 'Oily', 'Dry', 'Sensitive', 'Combination']
  },
  {
    questionText:
      'Do you have any personal skin concerns? Select all that apply.',
    answers: [
      'Redness',
      'EyeBags',
      'Dull Skin',
      'Acne',
      'Visible Pores',
      'Eczema',
      'Dark Circles',
      'Aging'
    ]
  },
  {
    questionText: 'I am a',
    answers: ['Man', 'Women']
  },
  {
    questionText: 'Pick matching conditions',
    answers: [
      {
        src: 'https://d38knilzwtuys1.cloudfront.net/revieve-plugin-v4/0.58.4/static/media/option_01.a502c6ec.jpg',
        val: 'low-eye-bags'
      },
      {
        src: 'https://d38knilzwtuys1.cloudfront.net/revieve-plugin-v4/0.58.4/static/media/option_02.c5fa6fb7.jpg',
        val: 'medium-eye-bags'
      },
      {
        src: 'https://d38knilzwtuys1.cloudfront.net/revieve-plugin-v4/0.58.4/static/media/option_03.d530227e.jpg',
        val: 'high-eye-bags'
      },
      {
        src: 'https://d38knilzwtuys1.cloudfront.net/revieve-plugin-v4/0.58.4/static/media/option_01.34399ac4.jpg',
        val: 'low-darks-spots'
      },
      {
        src: 'https://d38knilzwtuys1.cloudfront.net/revieve-plugin-v4/0.58.4/static/media/option_02.f0d068cd.jpg',
        val: 'medium-darks-spots'
      },
      {
        src: 'https://d38knilzwtuys1.cloudfront.net/revieve-plugin-v4/0.58.4/static/media/option_03.e280a245.jpg',
        val: 'high-darks-spots'
      },
      {
        src: 'https://d38knilzwtuys1.cloudfront.net/revieve-plugin-v4/0.58.4/static/media/option_01.ec4569e6.jpg',
        val: 'no-wrinkles'
      },
      {
        src: 'https://d38knilzwtuys1.cloudfront.net/revieve-plugin-v4/0.58.4/static/media/option_02.5fd8fab5.jpg',
        val: 'low-wrinkles'
      },
      {
        src: 'https://d38knilzwtuys1.cloudfront.net/revieve-plugin-v4/0.58.4/static/media/option_03.1eb19b9f.jpg',
        val: 'medium-wrinkles'
      },
      {
        src: 'https://d38knilzwtuys1.cloudfront.net/revieve-plugin-v4/0.58.4/static/media/option_04.f81fac46.jpg',
        val: 'high-wrinkles'
      }
    ]
  },
  {
    questionText: 'Select Your Age?',
    answers: ['18-24', '25-34', '35-44', '45-54', '55+']
  }
]
