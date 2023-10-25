import React from 'react';
import NavbarUser from '../navbarUser';
import Footer from '../../components/footer';
import Mission from '../../assets/mission.png';

const AboutUser = () => {

  return (
    <>

    <NavbarUser />
    
    <section>
        <div className="container flex flex-wrap md:px-9 px-20 py-24 mx-auto text-center items-center">
          <div className="md:w-1/2 sm:w-1/2 md:pr-12 md:py-8 sm:pr-8 sm:border-r sm:border-b-0 mb-5 md:mb-0 pb-10 border-black">
            <h1 className="text-4xl md:text-5xl uppercase font-bold mb-2">INKEL</h1>
            <p className="leading-relaxed text-base">Media Artikel Terpercaya dan Dicintai Oleh Masyarakat.</p>
          </div>
          <div className="md:w-1/2 sm:w-1/2 md:pl-12 md:pr-12 md:py-8 sm:pl-8  mb-5 md:mb-0 pb-10 border-b">
            <p className="text-base">Laman artikel ini dibuat pada saat awal covid merajalela di Indonesia dan para masyarakat memulai kehidupan sehari-harinya dari rumah. Saat itu media online sangatlah laris.</p>
          </div>
        </div>
      </section>


      <div className="flex flex-col text-center w-full mb-10">
          <h1 className="text-3xl font-semibold mb-2 tracking-widest">
              Our Team
          </h1>
          <p className="mx-5">
              Kami memiliki tim yang sangat handal dan cekatan karena kami mengedepankan yel-yel kami yaitu Semangat dan Kompak
          </p>
      </div>

      <div className="container my-12 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap -mx-1 lg:-mx-8">
          <div className="md:hover:scale-[1.01] transition duration-300 ease-in-out my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
            
            <article className="overflow-hidden rounded-lg shadow-lg bg-white">
              
              <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                <div className="flex items-center no-underline hover:underline text-black">
                  <img alt="Placeholder" className="block rounded-lg" src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=64" />
                  <p className="ml-5 text-xl font-semibold">
                    Muhammad Nurdin
                  </p>
                </div>
              </footer>

              <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                <h1 className="text-lg">
                <div className="text-black text-base font-semibold">
                    Officer
                </div>
                </h1>
                <p className="text-grey-darker text-sm font-semibold">
                  @nrdn_man
                </p>
              </header>
            </article>
          </div>
          <div className="md:hover:scale-[1.01] transition duration-300 ease-in-out my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
            
            <article className="overflow-hidden rounded-lg shadow-lg bg-white">
              
              <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                <div className="flex items-center no-underline hover:underline text-black">
                  <img alt="Placeholder" className="block rounded-lg" src="https://i.pravatar.cc/64?img=13" />
                  <p className="ml-5 text-xl font-semibold">
                    Bambang Sutarji
                  </p>
                </div>
              </footer>

              <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                <h1 className="text-lg">
                <div className="text-black text-base font-semibold">
                    CEO
                </div>
                </h1>
                <p className="text-grey-darker text-sm font-semibold">
                  @bb_strji
                </p>
              </header>
            </article>
          </div>
          <div className="md:hover:scale-[1.01] transition duration-300 ease-in-out my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
            
            <article className="overflow-hidden rounded-lg shadow-lg bg-white">
              
              <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                <div className="flex items-center no-underline hover:underline text-black">
                  <img alt="Placeholder" className="block rounded-lg" src="https://i.pravatar.cc/64?img=68" />
                  <p className="ml-5 text-xl font-semibold">
                    Choiron Hidayat
                  </p>
                </div>
              </footer>

              <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                <h1 className="text-lg">
                  <div className="text-black text-base font-semibold">
                    UI UX Design
                  </div>
                </h1>
                <p className="text-grey-darker text-sm font-semibold">
                  @choiday_t
                </p>
              </header>
            </article>
          </div>
        </div>
      </div>

      <div className="container flex flex-col justify-center p-4 mx-auto md:p-8">
        <p className="p-2 text-sm font-medium tracki text-center uppercase">apa keuntungan membaca Artikel di INKEL?</p>
        <h2 className="mb-12 md:text-4xl text-3xl font-semibold leading text-center">Keunggulan dan keuntungan memakai INKEL</h2>
        <div className="grid gap-10 md:gap-8 sm:p-3 md:grid-cols-2 lg:px-12 xl:px-32">
          <div className="md:hover:scale-[1.01] transition duration-300 ease-in-out bg-white rounded-md p-4 dark:text-white">
            <h3 className="font-semibold">Konten Buatan Pengguna dan Integrasi Sosial:</h3>
            <p className="mt-1 dark:text-gray-400">Situs web berita merangkul konten buatan pengguna dan integrasi media sosial. Tombol berbagi di media sosial, bagian komentar, dan konten buatan pengguna berkontribusi pada lingkungan berita yang lebih interaktif dan berbasis komunitas. Tren ini menumbuhkan rasa inklusivitas dan memungkinkan pengguna untuk berpartisipasi dalam diskusi.</p>
          </div>
          <div className="md:hover:scale-[1.01] transition duration-300 ease-in-out bg-white rounded-md p-4 dark:text-white">
            <h3 className="font-semibold">Pengoptimalan Seluler:</h3>
            <p className="mt-1 dark:text-gray-400">Mayoritas konsumsi berita kini terjadi di perangkat seluler. Situs web berita memprioritaskan pengoptimalan seluler untuk menghadirkan pengalaman yang lancar dan responsif di berbagai ukuran layar. Aplikasi seluler, pemberitahuan push, dan antarmuka yang ramah pengguna meningkatkan aksesibilitas bagi pembaca yang sedang bepergian.</p>
          </div>
          <div className="md:hover:scale-[1.01] transition duration-300 ease-in-out bg-white rounded-md p-4 dark:text-white">
            <h3 className="font-semibold">Beragam Format Konten:</h3>
            <p className="mt-1 dark:text-gray-400">Situs web berita kini melampaui artikel tradisional. Konten video, podcast, grafik interaktif, dan presentasi multimedia menjadi semakin populer. Pergeseran ini memenuhi beragam preferensi audiens modern dan meningkatkan pengalaman pengguna secara keseluruhan.</p>
          </div>
          <div className="md:hover:scale-[1.01] transition duration-300 ease-in-out bg-white rounded-md p-4 dark:text-white">
            <h3 className="font-semibold">Berita Terkini di Era Digital:</h3>
            <p className="mt-1 dark:text-gray-400">Selidiki strategi yang digunakan oleh situs berita untuk menyediakan pembaruan real-time tentang berita terkini. Diskusikan peran pemberitahuan push, blog langsung, dan integrasi media sosial dalam menyampaikan informasi yang tepat waktu dan akurat kepada pengguna.</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="grid grid-cols-2 md:gap-x-0 gap-y-4 row-gap-8 md:grid-cols-4">
          <div className="text-center md:border-r md:border-gray-800">
            <h6 className="text-4xl font-bold lg:text-5xl xl:text-6xl">144K</h6>
            <p className="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
              Artikel
            </p>
          </div>
          <div className="text-center md:border-r md:border-gray-800">
            <h6 className="text-4xl font-bold lg:text-5xl xl:text-6xl">12.9K</h6>
            <p className="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
              kategori
            </p>
          </div>
          <div className="text-center md:border-r md:border-gray-800">
            <h6 className="text-4xl font-bold lg:text-5xl xl:text-6xl">48.3K</h6>
            <p className="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
              Komentar
            </p>
          </div>
          <div className="text-center">
            <h6 className="text-4xl font-bold lg:text-5xl xl:text-6xl">24.5K</h6>
            <p className="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
              Users
            </p>
          </div>
        </div>
      </div>

      <Footer />

    </>
  );
}

export default AboutUser;
