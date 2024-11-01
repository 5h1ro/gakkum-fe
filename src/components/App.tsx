import { Route, Routes, useLocation } from 'react-router-dom';
import Login from '../pages/auth/login';
import NotFoundPage from '../pages/error/404';
import Dashboard from '../pages/backoffice/dashboard';
import RegistrasiDaftar from '../pages/backoffice/registrasi/daftar';
import RegistrasiDaftarCreate from '../pages/backoffice/registrasi/daftar/create';
import RegistrasiReguler from '../pages/backoffice/registrasi/reguler';
import RegistrasiInsidental from '../pages/backoffice/registrasi/insidental';
import RegistrasiArsip from '../pages/backoffice/registrasi/arsip';
import PerencanaanDaftar from '../pages/backoffice/perencanaan/daftar';
import PerencanaanReguler from '../pages/backoffice/perencanaan/reguler';
import PerencanaanInsidental from '../pages/backoffice/perencanaan/insidental';
import PerencanaanArsip from '../pages/backoffice/perencanaan/arsip';
import PengawasanDaftar from '../pages/backoffice/pengawasan/daftar';
import PengawasanAgenda from '../pages/backoffice/pengawasan/agenda';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/register/daftar" element={<RegistrasiDaftar />} />
      <Route path="/register/daftar/tambah" element={<RegistrasiDaftarCreate />} />
      <Route path="/register/reguler" element={<RegistrasiReguler />} />
      <Route path="/register/insidental" element={<RegistrasiInsidental />} />
      <Route path="/register/arsip" element={<RegistrasiArsip />} />

      <Route path="/perencanaan/daftar" element={<PerencanaanDaftar />} />
      <Route path="/perencanaan/reguler" element={<PerencanaanReguler />} />
      <Route path="/perencanaan/insidental" element={<PerencanaanInsidental />} />
      <Route path="/perencanaan/arsip" element={<PerencanaanArsip />} />

      <Route path="/pengawasan/daftar" element={<PengawasanDaftar />} />
      <Route path="/pengawasan/agenda" element={<PengawasanAgenda />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
