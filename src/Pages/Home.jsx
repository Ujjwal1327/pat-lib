import React from 'react'
import PageTitle from '../components/PageTitle'
import { faCode, faInfinity, faLandMineOn, faMagic, faMagicWandSparkles, faManatSign, faPerson, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default function Home() {
  return (
    <div>
      <PageTitle title="Home" />
      {/*1st*/}
      <section className="bg-white">
        <div className="grid py-8 px-4 mx-auto max-w-screen-xl lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="place-self-center mr-auto lg:col-span-7">
            <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl"> Lorem ipsum dolor sit amet consectetur.</h1>
            <p className="mb-6 max-w-2xl font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur non esse sunt optio quo veritatis distinctio error eveniet dolorem quisquam?
            </p>

            <a href="#" className="inline-flex justify-center items-center py-2 px-5 text-xl font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100">
              Get Direction
            </a>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src="https://themewagon.github.io/landwind/images/hero.png" alt="mockup" />
          </div>
        </div>
      </section>

      {/*2nd*/}
      <section className="bg-white">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
          <h2 className="mb-8 text-3xl font-extrabold tracking-tight leading-tight text-center text-gray-900 lg:mb-16  md:text-4xl">What you will  get in this library.</h2>
          <div className="grid grid-cols-2 gap-8 text-gray-900 sm:gap-12 md:grid-cols-3 lg:grid-cols-6 ">
            <a href="#" className="flex justify-center items-center text-xl">
              Lorem ipsum dolor
            </a>

            <a href="#" className="flex justify-center items-center text-xl">
              Lorem ipsum dolor
            </a>

            <a href="#" className="flex justify-center items-center text-xl">
              Lorem ipsum dolor
            </a>

            <a href="#" className="flex justify-center items-center text-xl">
              Lorem ipsum dolor
            </a>

            <a href="#" className="flex justify-center items-center text-xl">
              Lorem ipsum dolor
            </a>

            <a href="#" className="flex justify-center items-center text-xl">
              Lorem ipsum dolor
            </a>

          </div>
        </div>
      </section>
      {/*3rd*/}
      <section className="bg-gray-50 dark:bg-gray-800">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="mb-8 max-w-screen-md lg:mb-16">
            <h2 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">Lorem ipsum dolor sit amet, consectetur adipisicing.</h2>
            <p className="text-gray-500 sm:text-xl dark:text-gray-400">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae sint iusto rem, facere quibusdam placeat illo! Debitis ipsum temporibus provident?</p>
          </div>
          <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300 bg-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Heading 3</h3>
              <p className="text-gray-500 dark:text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque similique sunt pariatur accusamus ullam quibusdam alias. Autem </p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300 bg-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path></svg>
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Heading 3</h3>
              <p className="text-gray-500 dark:text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque similique sunt pariatur accusamus ullam quibusdam alias. Autem </p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300 bg-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"></path><path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path></svg>
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Heading 3</h3>
              <p className="text-gray-500 dark:text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque similique sunt pariatur accusamus ullam quibusdam alias. Autem </p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300 bg-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"></path></svg>
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Heading 3</h3>
              <p className="text-gray-500 dark:text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque similique sunt pariatur accusamus ullam quibusdam alias. Autem </p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300 bg-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path></svg>
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Heading 3</h3>
              <p className="text-gray-500 dark:text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque similique sunt pariatur accusamus ullam quibusdam alias. Autem </p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300 bg-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Heading 3</h3>
              <p className="text-gray-500 dark:text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque similique sunt pariatur accusamus ullam quibusdam alias. Autem </p>
            </div>
          </div>
        </div>
      </section>
      {/*4rt*/}
      <section className="bg-white">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="font-light text-gray-500 sm:text-lg">
            <h2 className="mb-4 text-4xl font-extrabold text-gray-900">Lorem ipsum dolor sit amet.</h2>
            <p className="mb-4 font-semibold">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum illum aliquid mollitia expedita atque repellat? Fugit laudantium quis incidunt veniam nostrum quaerat velit optio maxime quas, nisi iure laborum odit assumenda modi tenetur labore omnis possimus, saepe a! Cum, aspernatur? Officia deleniti eaque ipsum </p>
            <p className='font-semibold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae repudiandae eum aspernatur quis exercitationem eius cumque dignissimos iure .</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <img className="w-full rounded-lg" src="https://media.istockphoto.com/id/1159387320/photo/these-are-all-the-books-id-like-to-get-through.jpg?s=612x612&w=0&k=20&c=b4YuTQhLEpNLi8WsTAmV-q721qpy7-u9IC-2w9_nz8A=" alt="office content 1" />
            <img className="mt-4 w-full rounded-lg lg:mt-10" src="https://media.istockphoto.com/id/1159387320/photo/these-are-all-the-books-id-like-to-get-through.jpg?s=612x612&w=0&k=20&c=b4YuTQhLEpNLi8WsTAmV-q721qpy7-u9IC-2w9_nz8A=" alt="office content 2" />
          </div>
        </div>
      </section>

      {/*5th*/}
      <section className="bg-gray-50  dark:bg-gray-800">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, accusantium?</h2>
            <p className="mb-4 font-light">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid explicabo culpa praesentium assumenda illum repellat distinctio ipsa nihil dignissimos corporis, modi dicta itaque inventore eius voluptatibus cupiditate provident cumque quaerat reprehenderit soluta. Delectus architecto maxime dolore rerum optio consequatur consectetur deserunt dolores aliquam nisi? Inventore id assumenda eveniet veniam ipsam.</p>
            <p className="mb-4 font-medium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni cumque adipisci incidunt corporis dolorum totam inventore quae recusandae dolores sit!</p>
            <a href="#" className="inline-flex items-center font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-700">
              Learn more
            </a>
          </div>
        </div>
      </section>
      {/*6th*/}
      <section className="bg-white">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h2 className="mb-4 text-4xl font-extrabold leading-tight text-gray-900">Start your free demo today</h2>
            <p className="mb-6 font-light text-gray-500 md:text-lg">Lorem ipsum dolor sit amet consectetur adipisicing. Lorem, ipsum dolor.</p>
            <p className="bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none">Free trial for 3 days</p>
          </div>
        </div>
      </section>
      {/*7th admin section*/}
      <h2 className="mb-4 text-4xl font-extrabold leading-tight text-gray-900 text-center">Admins</h2>
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-3 flex-wrap w-[95%] sm:w-[75%] mx-auto mb-10">
        <div id="outer"
          className="flex-1 row-start-1 row-end-3 group w-full rounded-3xl p-[1px] hover:bg-gradient-to-br hover:from-red-200 hover:via-slate-400 hover:to-orange-400">
          <div id="inner"
            className="h-full flex flex-col gap-8 items-start cursor-pointer w-full p-6 rounded-3xl group-hover:bg-gradient-to-br group-hover:from-red-50 group-hover:via-slate-50 hover:to-orange-50 border border-slate-200 bg-gray-200">
            <div
              className="h-12 w-12 flex items-center justify-center text-xl font-light rounded-full bg-slate-300">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <h2 className="font-bold text-2xl">Name 1</h2>
            <p className="text-xl sm:text-xl font-base text-left">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. At voluptatum quidem, cumque nobis, nisi voluptatibus officia eaque, excepturi totam aspernatur necessitatibus aut. Necessitatibus, rem. fafadsf
            </p>
            <div className="w-fit flex items-center justify-center gap-4">
              <div id="img-div" className="relative flex justify-center items-center">

                <img className="rounded-full"
                  src="https://www.todesktop.com/cdn-cgi/image/width=48,height=48,f=auto,fit=cover/_app/immutable/assets/Rick.d7xHnafE.jpg"
                  alt="" />
              </div>
              <div>
                <p className="font-bold text-base">Name 1</p>
                <p className="font-thin text-base hover:underline">designation</p>
              </div>
            </div>
          </div>
        </div>
        <div id="outer"
          className="flex-1 row-start-1 row-end-3 group w-full rounded-3xl p-[1px] hover:bg-gradient-to-br hover:from-red-200 hover:via-slate-400 hover:to-orange-400">
          <div id="inner"
            className="h-full flex flex-col gap-8 items-start cursor-pointer w-full p-6 rounded-3xl group-hover:bg-gradient-to-br group-hover:from-red-50 group-hover:via-slate-50 hover:to-orange-50 border border-slate-200 bg-slate-50">
            <div className="h-12 w-12 flex items-center justify-center text-xl font-light rounded-full bg-pink-300">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <h2 className="font-bold text-2xl">Name 2</h2>
            <p className="text-xl sm:text-xl font-base text-left">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. At voluptatum quidem, cumque nobis, nisi voluptatibus officia eaque, excepturi totam aspernatur necessitatibus aut. Necessitatibus, rem. fafadsf
            </p>
            <div className="w-fit flex items-center justify-center gap-4">
              <div id="img-div" className="relative flex justify-center items-center">

                <img className="rounded-full"
                  src="https://www.todesktop.com/cdn-cgi/image/width=48,height=48,f=auto,fit=cover/_app/immutable/assets/Rick.d7xHnafE.jpg"
                  alt="" />
              </div>
              <div>
                <p className="font-bold text-base">Name 2</p>
                <p className="font-thin text-base hover:underline">Designation</p>
              </div>
            </div>
          </div>
        </div>
        <div id="outer"
          className="flex-1 row-start-1 row-end-3 group w-full rounded-3xl p-[1px] hover:bg-gradient-to-br hover:from-red-200 hover:via-slate-400 hover:to-orange-400">
          <div id="inner"
            className="h-full flex flex-col gap-8 items-start cursor-pointer w-full p-6 rounded-3xl group-hover:bg-gradient-to-br group-hover:from-red-50 group-hover:via-slate-50 hover:to-orange-50 border border-slate-200 bg-slate-50">
            <div className="h-12 w-12 flex items-center justify-center text-xl font-light rounded-full bg-orange-300">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <h2 className="font-bold text-2xl">Name 3</h2>
            <p className="text-xl sm:text-xl font-base text-left">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis pariatur labore fuga nobis laudantium! Fugit ipsam consequatur pariatur expedita rem similique dolorem in adipisci repellat? Deleniti quis voluptate possimus dolorum.
            </p>
            <div className="w-fit flex items-center justify-center gap-4">
              <div id="img-div" className="relative flex justify-center items-center">

                <img className="rounded-full"
                  src="https://www.todesktop.com/cdn-cgi/image/width=48,height=48,f=auto,fit=cover/_app/immutable/assets/Rick.d7xHnafE.jpg"
                  alt="" />
              </div>
              <div>
                <p className="font-bold text-base">Name 3</p>
                <p className="font-thin text-base hover:underline">Designation</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
