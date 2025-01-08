import { Link } from 'react-router-dom'
import React from 'react'
import { faMap, faMapLocation, faMapMarked, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ScrollToTop from '../components/ScrollToTop'
const About = () => {
  return (
    <div>
    <ScrollToTop/>
      <section class="bg-white">
        <div class="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
          <div class="mr-auto place-self-center lg:col-span-7">
            <h1 class="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl">
              Lorem, ipsum.asff <br />asdfads  &amp;
            </h1>
            <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti natus consequuntur
              <Link to="" class="hover:underline">Tailwind CSS</Link> and based on the components from the
              <Link to="" class="hover:underline">Flowbite Library</Link> and the
              <Link to="" class="hover:underline">Blocks System</Link>.
            </p>
            <div class="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
              <Link to="" class="inline-flex items-center justify-center w-full px-5 py-3 text-lg font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100">
                <FontAwesomeIcon icon={faMapLocation} className='mr-4' />
                View on G-Map
              </Link>
              <Link to="" class="inline-flex items-center justify-center w-full px-5 py-3 mb-2 mr-2 text-lg font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:w-auto focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200">
                Whatsapp
              </Link>
            </div>
          </div>
          <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src="https://dummyimage.com/600x400/545454/ffffff.png&text=Add+images+of+your+choice" alt="hero image" />
          </div>
        </div>
      </section>

      {/*2nd*/}
      <section class="bg-gray-50 dark:bg-gray-800">
        <div class="max-w-screen-xl px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:py-24 lg:px-6">

          <div class="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
            <div class="text-gray-500 sm:text-lg dark:text-gray-400">
              <h2 class="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Lorem ipsum dolor sit amet.</h2>
              <p class="mb-8 font-light lg:text-xl">Lorem  Repudiandae nam earum tempora quidem unde assumenda natus! Atque assumenda in, velit perferendis perspiciatis ut libero consequuntur, .</p>

              <ul role="list" class="pt-8 space-y-5 border-t border-gray-200 my-7 dark:border-gray-700">
                <li class="flex space-x-3">

                  <svg class="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                  <span class="text-base font-medium leading-tight text-gray-900 dark:text-white">Lorem ipsum dolor sit amet.</span>
                </li>
                <li class="flex space-x-3">

                  <svg class="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                  <span class="text-base font-medium leading-tight text-gray-900 dark:text-white">Lorem ipsum dolor sit.</span>
                </li>
                <li class="flex space-x-3">

                  <svg class="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                  <span class="text-base font-medium leading-tight text-gray-900 dark:text-white">Lorem ipsum dolor sit amet consectetur.</span>
                </li>
              </ul>
              <p class="mb-8 font-light lg:text-xl">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum, commodi..</p>
            </div>
            <img class="hidden w-full mb-4 rounded-lg lg:mb-0 lg:flex" src="https://dummyimage.com/600x400/545454/ffffff.png&text=Add+images+of+your+choice" alt="dashboard feature image" />
          </div>

          <div class="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
            <img class="hidden w-full mb-4 rounded-lg lg:mb-0 lg:flex" src="https://dummyimage.com/600x400/545454/ffffff.png&text=Add+images+of+your+choice" alt="feature image 2" />
            <div class="text-gray-500 sm:text-lg dark:text-gray-400">
              <h2 class="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Lorem ipsum dolor sit amet consectetur.</h2>
              <p class="mb-8 font-light lg:text-xl">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro eaque placeat cupiditate doloremque, eveniet ipsa?</p>

              <ul role="list" class="pt-8 space-y-5 border-t border-gray-200 my-7 dark:border-gray-700">
                <li class="flex space-x-3">

                  <svg class="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                  <span class="text-base font-medium leading-tight text-gray-900 dark:text-white">Lorem ipsum dolor sit.</span>
                </li>
                <li class="flex space-x-3">

                  <svg class="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                  <span class="text-base font-medium leading-tight text-gray-900 dark:text-white">Lorem ipsum dolor sit amet consectetur.</span>
                </li>
                <li class="flex space-x-3">

                  <svg class="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                  <span class="text-base font-medium leading-tight text-gray-900 dark:text-white">Lorem, ipsum dolor.</span>
                </li>
                <li class="flex space-x-3">

                  <svg class="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                  <span class="text-base font-medium leading-tight text-gray-900 dark:text-white">Lorem ipsum dolor sit amet.</span>
                </li>

              </ul>
              <p class="font-light lg:text-xl">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis, ullam!</p>
            </div>
          </div>
        </div>
      </section>
      {/*3rd*/}
      <section class="bg-white">
        <div class="items-center max-w-screen-xl px-4 py-8 mx-auto lg:grid lg:grid-cols-4 lg:gap-16 xl:gap-24 lg:py-24 lg:px-6">
          <div class="col-span-2 mb-8">
            <p class="text-lg font-medium text-purple-600">Lorem Ipsum</p>
            <h2 class="mt-3 mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-3xl">
              Lorem ipsum dolor sit amet consectetur.
            </h2>
            <p class="font-light text-gray-500 sm:text-xl ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div class="pt-6 mt-6 space-y-4 border-t border-gray-200">
              <div>

              </div>
              <div>

              </div>
            </div>
          </div>
          <div class="col-span-2 space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0">
            <div>
              <svg class="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 1a1 1 0 11-2 0 1 1 0 012 0zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zm14 1a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd"></path>
              </svg>
              <h3 class="mb-2 text-2xl font-bold">99.99% Lorem</h3>
              <p class="font-light text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div>
              <svg class="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
              </svg>
              <h3 class="mb-2 text-2xl font-bold">600M+ Lorem</h3>
              <p class="font-light text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div>
              <svg class="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd"></path>
              </svg>
              <h3 class="mb-2 text-2xl font-bold">100+ Lorem</h3>
              <p class="font-light text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div>
              <svg class="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
              </svg>
              <h3 class="mb-2 text-2xl font-bold">5+  Lorem</h3>
              <p class="font-light text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        </div>
      </section>

      {/*4*/}
      <section class="bg-gray-50 dark:bg-gray-800 border-b-2">
        <div class="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-24 lg:px-6">
          <figure class="max-w-screen-md mx-auto">
            <svg class="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor"></path>
            </svg>
            <blockquote>
              <p class="text-xl font-medium text-gray-900 md:text-2xl dark:text-white">"Landwind is just awesome. It contains tons of predesigned components and pages starting from login screen to complex dashboard. Perfect choice for your next SaaS application."</p>
            </blockquote>
          </figure>
        </div>
      </section>

      {/*6*/}
    </div>

  )
}

export default About





