import { Routes, Route } from "react-router-dom";
import Login from "./auth/login";
import Register from "./auth/register";
import Kategori from "./Front/kategori/kategori";
import KategoriCreate from "./Front/kategori/kategoriCreate";
import KategoriUpdate from "./Front/kategori/kategoriUpdate";
import DashboardAdmin from "./Front/dashboardAdmin";
import DashboardUser from "./Front/frontuser/dashboardUser";
import AboutUser from "./Front/frontuser/aboutUser";
import Komentar from "./Front/komentar/komentar";
import KomentarAprove from "./Front/komentar/komentarAprove";
import Artikel from "./Front/artikel/artikel";
import ArtikelCreate from "./Front/artikel/artikelCreate";
import ArtikelUpdate from "./Front/artikel/artikelUpdate";
import ArtikelDetail from "./Front/artikelDetail";
import AllArtikel from "./Front/frontuser/allArtikel";
import RekomArtikel from "./Front/rekomendasi/rekomArtikel";
import ArtikelDetailAdmin from "./Front/artikel/artikelDetailAdmin";
import TerbaruArtikel from "./Front/terbaru/terbaruArtikel";
import Akun from "./Front/akun/akun";
import UtamaArtikel from "./Front/utama/utamaArtikel";
import ProfileAdmin from "./Front/akun/profileAdmin";
import RegisterUser from "./auth/registerUser";
import LoginUser from "./auth/loginUser";
import HistoryKomentar from "./Front/frontuser/historyKomentar";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/loginuser" element={<LoginUser />} />
      <Route path="/register" element={<Register />} />
      <Route path="/registeruser" element={<RegisterUser />} />
      <Route path="/admin/dashboard" element={<DashboardAdmin />} />

      <Route path="/admin/kategoris" element={<Kategori />} />
      <Route path="/admin/kategoris/create" element={<KategoriCreate />} />
      <Route path="/admin/kategoris/edit/:id" element={<KategoriUpdate />} />

      <Route path="/admin/artikel" element={<Artikel />} />
      <Route path="/admin/artikel/create" element={<ArtikelCreate />} />
      <Route path="/admin/artikel/detail/:id" element={<ArtikelDetailAdmin />} />
      <Route path="/admin/artikel/edit/:id" element={<ArtikelUpdate />} />

      <Route path="/admin/utamaartikel" element={<UtamaArtikel />} />
      
      <Route path="/admin/rekomartikel" element={<RekomArtikel />} />

      <Route path="/admin/terbaruartikel" element={<TerbaruArtikel />} />

      <Route path="/admin/komentar" element={<Komentar />} />
      <Route path="/admin/komentar/aprove/:id" element={<KomentarAprove />} />

      <Route path="/admin/akun" element={<Akun />} />

      <Route path="/admin/profil" element={<ProfileAdmin />} />

      <Route path="/dashboard" element={<DashboardUser />} />
      <Route path="/artikel" element={<AllArtikel />} />
      <Route path="/artikel/detail/:id" element={<ArtikelDetail />} />
      <Route path="/about" element={<AboutUser />} />
      <Route path="/historykomentar" element={<HistoryKomentar />} />

    </Routes>
  );
}

export default App;
