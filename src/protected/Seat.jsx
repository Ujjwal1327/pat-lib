import { faChair } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Seat = () => {
    return (
        <div id='mainContainer' className='flex flex-col items-start justify-start gap-2 p-10 sm:p-20'>

            <div id='wrapper' className='flex flex-col items-end justify-center gap-12 border-[3px] border-blue-600 p-3 flex-nowrap'>
                <p class="font-semibold p-3 text-2xl bg-blue-500 text-white">Washroom area</p>
                <hr className='w-full h-2 bg-black' />
                {/* 7 row */}
                <div id='row' className='flex justify-center items-center gap-3 flex-nowrap'>
                    <div>
                        <p className='font-bold text-xl text-gray-700'>7th</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div id="top" className='flex items-center justify-center gap-2'>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>


                        </div>
                        <div id="bottom" className='flex items-center justify-center gap-2'>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                        </div>
                    </div>
                    <div className='w-16 h-16'>

                    </div>
                </div>
                {/* 6 row */}
                <div id='row' className='flex justify-center items-center gap-3 flex-nowrap'>
                    <div>
                        <p className='font-bold text-xl text-gray-700'>6th</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div id="top" className='flex items-center justify-center gap-2'>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>


                        </div>
                        <div id="bottom" className='flex items-center justify-center gap-2'>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                        </div>
                    </div>
                    <div className='w-16 h-16'>

                    </div>
                </div>
                {/* 5 row */}
                <div id='row' className='flex justify-center items-center gap-3 flex-nowrap'>
                    <div>
                        <p className='font-bold text-xl text-gray-700'>5th</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div id="top" className='flex items-center justify-center gap-2'>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>


                        </div>
                        <div id="bottom" className='flex items-center justify-center gap-2'>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                        </div>
                    </div>
                    <div className='w-16 h-16'>

                    </div>
                </div>
                {/* 4 row */}
                <div id='row' className='flex justify-center items-center gap-3 flex-nowrap'>
                    <div>
                        <p className='font-bold text-xl text-gray-700'>4th</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div id="top" className='flex items-center justify-center gap-2'>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>


                        </div>
                        <div id="bottom" className='flex items-center justify-center gap-2'>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                        </div>
                    </div>
                    <div className='w-16 h-16'>

                    </div>
                </div>
                {/* 3 row */}
                <div id='row' className='flex justify-center items-center gap-3 flex-nowrap'>
                    <div>
                        <p className='font-bold text-xl text-gray-700'>3rd</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div id="top" className='flex items-center justify-center gap-2'>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>


                        </div>
                        <div id="bottom" className='flex items-center justify-center gap-2'>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                        </div>
                    </div>
                    <div className='w-16 h-16'>

                    </div>
                </div>
                {/* 2 row */}
                <div id='row' className='flex justify-center items-center gap-3 flex-nowrap'>
                    <div>
                        <p className='font-bold text-xl text-gray-700'>2nd</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div id="top" className='flex items-center justify-center gap-2'>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>


                        </div>
                        <div id="bottom" className='flex items-center justify-center gap-2'>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                        </div>
                    </div>
                    <div className='w-16 h-16'>

                    </div>
                </div>
                {/* 1 row */}
                <div id='row' className='flex justify-center items-center gap-3 flex-nowrap'>
                    <div>
                        <p className='font-bold text-xl text-gray-700'>1st</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div id="top" className='flex items-center justify-center gap-2'>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <FontAwesomeIcon icon={faChair} className='text-gray-600' />
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                            </div>


                        </div>
                        <div id="bottom" className='flex items-center justify-center gap-2'>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800   flex items-center justify-center text-sm'>
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800  bg-gray-500 text-white flex items-center justify-center text-sm'>2

                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                            <div className='flex flex-col gap-1 items-center justify-center text-xl text-blue-700'>
                                <div className='w-8 h-8 border-[3px] border-gray-800 items-center justify-center flex text-sm'>1
                                </div>
                                <FontAwesomeIcon icon={faChair} className='rotate-180 text-gray-600' />
                            </div>
                        </div>
                    </div>
                    <div className='w-16 h-16'>
                    </div>
                </div>
                <p class="font-semibold p-3 text-2xl bg-blue-500 text-white">Gate</p>
            </div>



        </div>
    )
}

export default Seat