import React from 'react';
import NavbarUser from '../navbarUser';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer';

const DashboardUser = () => {
  return (
    <>

    <NavbarUser />

    <div className="container md:mt-10 mt-8 mx-auto md:px-6">
      <section className="mb-24">
        <h2 className="mb-6 pb-4 text-center text-3xl font-semibold">
          Artikel utama
        </h2>
        <div className="grid gap-6 lg:grid-cols-3 lg:mx-0 mx-4">
          <div className="md:hover:scale-[1.01] transition duration-300 ease-in-out relative overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20" data-te-ripple-init data-te-ripple-color="light">
            <img src="https://mdbcdn.b-cdn.net/img/new/standard/nature/051.jpg" className="w-full align-middle" />
            
              <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsla(0,0%,0%,0.4)] bg-fixed">
                <div className="flex h-full items-end justify-start">
                  <div className="m-6 text-white">
                    <h5 className="mb-3 text-lg font-bold">I miss the sun</h5>
                    <p>
                      <small>Published <u>13.01.2022</u> by Anna Maria Doe</small>
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed transition duration-300 ease-in-out hover:bg-[hsla(0,0%,99%,0.15)]" />
            
          </div>
          <div className="md:hover:scale-[1.01] transition ease-in-out duration-300 relative overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20" data-te-ripple-init data-te-ripple-color="light">
            <img src="https://mdbcdn.b-cdn.net/img/new/standard/nature/049.jpg" className="w-full align-middle" />
            
              <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsla(0,0%,0%,0.4)] bg-fixed">
                <div className="flex h-full items-end justify-start">
                  <div class="m-6 text-white">
                    <h5 class="mb-3 text-lg font-bold">
                      Adventure in the desert
                    </h5>
                    <p>
                      <small>Published <u>12.01.2022</u> by Mark Equel</small>
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed transition duration-300 ease-in-out hover:bg-[hsla(0,0%,99%,0.15)]" />
            
          </div>
          <div className="md:hover:scale-[1.01] transition duration-300 ease-in-out relative overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20" data-te-ripple-init data-te-ripple-color="light">
            <img src="https://mdbcdn.b-cdn.net/img/new/standard/nature/022.jpg" className="w-full align-middle" />
            
              <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsla(0,0%,0%,0.4)] bg-fixed">
                <div className="flex h-full items-end justify-start">
                  <div class="m-6 text-white">
                    <h5 class="mb-3 text-lg font-bold">Lonely mountain</h5>
                    <p>
                      <small
                        >Published <u>10.01.2022</u> by Bilbo baggins</small
                      >
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed transition duration-300 ease-in-out hover:bg-[hsla(0,0%,99%,0.15)]" />
            
          </div>
        </div>
      </section>
    </div>


    <div className="container my-10 mx-auto md:px-6">
      <section className="mb-24 text-center">
        <h2 className="mb-6 pb-4 text-center text-3xl font-semibold">
          Rekomendasi untuk anda
        </h2>
        <div className="grid gap-6 lg:grid-cols-3 xl:gap-x-12 lg:mx-0 mx-4">
          <div className="mb-6 lg:mb-0 md:hover:scale-[1.01] transition duration-300 ease-in-out">
            <div className="relative block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
              <div className="flex">
                <div className="relative mx-4 mt-4 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20" data-te-ripple-init data-te-ripple-color="light">
                  <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/026.webp" alt="" className="w-full" />
                  <div>
                    <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]">
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm font-semibold text-gray-700 dark:text-primary-400">Kuliner</p>
                <h5 className="mb-3 text-lg font-bold">My paradise</h5>
                <p className="mb-4 text-indigo-500 dark:text-white-300">
                  <small>Published <u>13.01.2022</u> by
                    <div>Anna Maria Doe</div></small>
                </p>
                <p className="mb-4 pb-2">
                  Ut pretium ultricies dignissim. Sed sit amet mi eget urna
                  placerat vulputate. Ut vulputate est non quam dignissim
                  elementum. Donec a ullamcorper diam.
                </p>
                <div className="hover:scale-105 duration-300 cursor-pointer inline-block rounded-full bg-sky-700 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">Read
                  more</div>
              </div>
            </div>
          </div>
          
          <div className="mb-6 lg:mb-0 md:hover:scale-[1.01] transition duration-300 ease-in-out">
            <div className="relative block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
              <div className="flex">
                <div className="relative mx-4 mt-4 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20" data-te-ripple-init data-te-ripple-color="light">
                  <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/027.webp" alt="" className="w-full" />
                  <div>
                    <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]">
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm font-semibold text-gray-700 dark:text-primary-400">Kuliner</p>
                <h5 className="mb-3 text-lg font-bold">My paradise</h5>
                <p className="mb-4 text-indigo-500 dark:text-white-300">
                  <small>Published <u>13.01.2022</u> by
                    <div>Anna Maria Doe</div></small>
                </p>
                <p className="mb-4 pb-2">
                  Ut pretium ultricies dignissim. Sed sit amet mi eget urna
                  placerat vulputate. Ut vulputate est non quam dignissim
                  elementum. Donec a ullamcorper diam.
                </p>
                <div className="hover:scale-105 duration-300 cursor-pointer inline-block rounded-full bg-sky-700 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">Read
                  more</div>
              </div>
            </div>
          </div>
          <div className="mb-6 lg:mb-0 md:hover:scale-[1.01] transition duration-300 ease-in-out">
            <div className="relative block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
              <div className="flex">
                <div className="relative mx-4 mt-4 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20" data-te-ripple-init data-te-ripple-color="light">
                  <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/029.webp" alt="" className="w-full" />
                  <div>
                    <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]">
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm font-semibold text-gray-700 dark:text-primary-400">Kuliner</p>
                <h5 className="mb-3 text-lg font-bold">My paradise</h5>
                <p className="mb-4 text-indigo-500 dark:text-white-300">
                  <small>Published <u>13.01.2022</u> by
                    <div>Anna Maria Doe</div></small>
                </p>
                <p className="mb-4 pb-2">
                  Ut pretium ultricies dignissim. Sed sit amet mi eget urna
                  placerat vulputate. Ut vulputate est non quam dignissim
                  elementum. Donec a ullamcorper diam.
                </p>
                <div className="hover:scale-105 duration-300 cursor-pointer inline-block rounded-full bg-sky-700 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">Read
                  more</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mb-24 text-center">
        <h2 className="mb-6 pb-4 text-center text-3xl font-semibold">
          Artikel terbaru
        </h2>
        <div className="grid gap-6 lg:grid-cols-3 xl:gap-x-12 lg:mx-0 mx-4">

          <div className="mb-6 lg:mb-0 md:hover:scale-[1.01] transition duration-300 ease-in-out">
            <div className="relative block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
              <div className="flex">
                <div className="relative mx-4 mt-4 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20" data-te-ripple-init data-te-ripple-color="light">
                  <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/026.webp" alt="" className="w-full" />
                  <div>
                    <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]">
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm font-semibold text-gray-700 dark:text-primary-400">Kuliner</p>
                <h5 className="mb-3 text-lg font-bold">My paradise</h5>
                <p className="mb-4 text-indigo-500 dark:text-white-300">
                  <small>Published <u>13.01.2022</u> by
                    <div>Anna Maria Doe</div></small>
                </p>
                <p className="mb-4 pb-2">
                  Ut pretium ultricies dignissim. Sed sit amet mi eget urna
                  placerat vulputate. Ut vulputate est non quam dignissim
                  elementum. Donec a ullamcorper diam.
                </p>
                <div className="hover:scale-105 duration-300 cursor-pointer inline-block rounded-full bg-sky-700 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">Read
                  more</div>
              </div>
            </div>
          </div>
          <div className="mb-6 lg:mb-0 md:hover:scale-[1.01] transition duration-300 ease-in-out">
            <div className="relative block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
              <div className="flex">
                <div className="relative mx-4 mt-4 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20" data-te-ripple-init data-te-ripple-color="light">
                  <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/026.webp" alt="" className="w-full" />
                  <div>
                    <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]">
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm font-semibold text-gray-700 dark:text-primary-400">Kuliner</p>
                <h5 className="mb-3 text-lg font-bold">My paradise</h5>
                <p className="mb-4 text-indigo-500 dark:text-white-300">
                  <small>Published <u>13.01.2022</u> by
                    <div>Anna Maria Doe</div></small>
                </p>
                <p className="mb-4 pb-2">
                  Ut pretium ultricies dignissim. Sed sit amet mi eget urna
                  placerat vulputate. Ut vulputate est non quam dignissim
                  elementum. Donec a ullamcorper diam.
                </p>
                <div className="hover:scale-105 duration-300 cursor-pointer inline-block rounded-full bg-sky-700 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">Read
                  more</div>
              </div>
            </div>
          </div>
          <div className="mb-6 lg:mb-0 md:hover:scale-[1.01] transition duration-300 ease-in-out">
            <div className="relative block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
              <div className="flex">
                <div className="relative mx-4 mt-4 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20" data-te-ripple-init data-te-ripple-color="light">
                  <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/026.webp" alt="" className="w-full" />
                  <div>
                    <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]">
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm font-semibold text-gray-700 dark:text-primary-400">Kuliner</p>
                <h5 className="mb-3 text-lg font-bold">My paradise</h5>
                <p className="mb-4 text-indigo-500 dark:text-white-300">
                  <small>Published <u>13.01.2022</u> by
                    <div>Anna Maria Doe</div></small>
                </p>
                <p className="mb-4 pb-2">
                  Ut pretium ultricies dignissim. Sed sit amet mi eget urna
                  placerat vulputate. Ut vulputate est non quam dignissim
                  elementum. Donec a ullamcorper diam.
                </p>
                <div className="hover:scale-105 duration-300 cursor-pointer inline-block rounded-full bg-sky-700 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">Read
                  more</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <Footer />

    </>
  );
}

export default DashboardUser;
