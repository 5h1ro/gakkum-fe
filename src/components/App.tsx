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
import PerencanaanArsipDetail from '../pages/backoffice/perencanaan/arsip/detail';
import PengawasanDaftar from '../pages/backoffice/pengawasan/daftar';
import PengawasanAgenda from '../pages/backoffice/pengawasan/agenda';
import PerencanaanDaftarDetailA from '../pages/backoffice/perencanaan/daftar/detaila';
import PerencanaanDaftarDetail from '../pages/backoffice/perencanaan/daftar/detail';
import RegistrasiDaftarDetail from '../pages/backoffice/registrasi/daftar/detail';
import RegistrasiArsipDetail from '../pages/backoffice/registrasi/arsip/detail';
import PengawasanAgendaTim from '../pages/backoffice/pengawasan/agenda_tim';
import PengawasanArsip from '../pages/backoffice/pengawasan/arsip';
import PascaPengawasanDaftar from '../pages/backoffice/pasca_pengawasan/daftar';
import PascaPengawasanAgenda from '../pages/backoffice/pasca_pengawasan/agenda';
import PascaPengawasanAgendaTim from '../pages/backoffice/pasca_pengawasan/agenda_tim';
import Setting from '../pages/backoffice/setting';
import { AuthMiddleware, GuestMiddleware, LoginMiddleware } from '../middleware/auth.middleware';
import Profil from '../pages/backoffice/profil';
import PengawasanDaftarDetail from '../pages/backoffice/pengawasan/daftar/detail';
import PengawasanArsipDetail from '../pages/backoffice/pengawasan/arsip/detail';
import PascaPengawasanDaftarDetail from '../pages/backoffice/pasca_pengawasan/daftar/detail';
import SumberData from '../pages/backoffice/setting/sumber_data';
import UpdateSumberData from '../pages/backoffice/setting/sumber_data/update';
import { useState } from 'react';
import { snackbarType } from '../interfaces/snackbar.interface';
import DetailSumberData from '../pages/backoffice/setting/sumber_data/detail';
import CreateSumberData from '../pages/backoffice/setting/sumber_data/create';
import StatusData from '../pages/backoffice/setting/status_data';
import CreateStatusData from '../pages/backoffice/setting/status_data/create';
import UpdateStatusData from '../pages/backoffice/setting/status_data/update';
import DetailStatusData from '../pages/backoffice/setting/status_data/detail';
import TahapanPerencanaan from '../pages/backoffice/setting/tahapan_perencanaan';
import CreateTahapanPerencanaan from '../pages/backoffice/setting/tahapan_perencanaan/create';
import UpdateTahapanPerencanaan from '../pages/backoffice/setting/tahapan_perencanaan/update';
import DetailTahapanPerencanaan from '../pages/backoffice/setting/tahapan_perencanaan/detail';
import TahapanPengawasan from '../pages/backoffice/setting/tahapan_pengawasan';
import CreateTahapanPengawasan from '../pages/backoffice/setting/tahapan_pengawasan/create';
import UpdateTahapanPengawasan from '../pages/backoffice/setting/tahapan_pengawasan/update';
import DetailTahapanPengawasan from '../pages/backoffice/setting/tahapan_pengawasan/detail';
import TahapanPascaPengawasan from '../pages/backoffice/setting/tahapan_pasca_pengawasan';
import CreateTahapanPascaPengawasan from '../pages/backoffice/setting/tahapan_pasca_pengawasan/create';
import UpdateTahapanPascaPengawasan from '../pages/backoffice/setting/tahapan_pasca_pengawasan/update';
import DetailTahapanPascaPengawasan from '../pages/backoffice/setting/tahapan_pasca_pengawasan/detail';
import DokumenPerencanaan from '../pages/backoffice/setting/dokumen_perencanaan';
import CreateDokumenPerencanaan from '../pages/backoffice/setting/dokumen_perencanaan/create';
import UpdateDokumenPerencanaan from '../pages/backoffice/setting/dokumen_perencanaan/update';
import DetailDokumenPerencanaan from '../pages/backoffice/setting/dokumen_perencanaan/detail';
import DokumenPengawasan from '../pages/backoffice/setting/dokumen_pengawasan';
import CreateDokumenPengawasan from '../pages/backoffice/setting/dokumen_pengawasan/create';
import DetailDokumenPengawasan from '../pages/backoffice/setting/dokumen_pengawasan/detail';
import UpdateDokumenPengawasan from '../pages/backoffice/setting/dokumen_pengawasan/update';
import DokumenPascaPengawasan from '../pages/backoffice/setting/dokumen_pasca_pengawasan';
import CreateDokumenPascaPengawasan from '../pages/backoffice/setting/dokumen_pasca_pengawasan/create';
import UpdateDokumenPascaPengawasan from '../pages/backoffice/setting/dokumen_pasca_pengawasan/update';
import DetailDokumenPascaPengawasan from '../pages/backoffice/setting/dokumen_pasca_pengawasan/detail';
import Employee from '../pages/backoffice/setting/user';
import CreateEmployee from '../pages/backoffice/setting/user/create';
import UpdateEmployee from '../pages/backoffice/setting/user/update';
import DetailEmployee from '../pages/backoffice/setting/user/detail';
import CreateCompany from '../pages/backoffice/setting/company/create';
import Company from '../pages/backoffice/setting/company';
import DetailCompany from '../pages/backoffice/setting/company/detail';
import UpdateCompany from '../pages/backoffice/setting/company/update';

const App = () => {
  const [showSnackbar, setShowSnackbar] = useState<snackbarType>({
    isOpen: false,
    message: '',
    status: 'success'
  });
  return (
    <Routes>
      <Route element={<GuestMiddleware />}>
        <Route element={<LoginMiddleware />}>
          <Route path="/" element={<Login />} />
        </Route>
      </Route>
      <Route element={<AuthMiddleware />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register/daftar" element={<RegistrasiDaftar />} />
        <Route path="/register/daftar/tambah" element={<RegistrasiDaftarCreate />} />
        <Route path="/register/daftar/detail/:dataID" element={<RegistrasiDaftarDetail />} />
        <Route path="/register/reguler" element={<RegistrasiReguler />} />
        <Route path="/register/insidental" element={<RegistrasiInsidental />} />
        <Route path="/register/arsip" element={<RegistrasiArsip />} />
        <Route path="/register/arsip/detail/:dataID" element={<RegistrasiArsipDetail />} />

        <Route path="/perencanaan/daftar" element={<PerencanaanDaftar />} />
        <Route path="/perencanaan/daftar/detail/:dataID" element={<PerencanaanDaftarDetail />} />
        <Route path="/perencanaan/reguler" element={<PerencanaanReguler />} />
        <Route path="/perencanaan/insidental" element={<PerencanaanInsidental />} />
        <Route path="/perencanaan/arsip" element={<PerencanaanArsip />} />
        <Route path="/perencanaan/arsip/detail/:dataID" element={<PerencanaanArsipDetail />} />

        <Route path="/pengawasan/daftar" element={<PengawasanDaftar />} />
        <Route path="/pengawasan/daftar/detail/:dataID" element={<PengawasanDaftarDetail />} />
        <Route path="/pengawasan/agenda" element={<PengawasanAgenda />} />
        <Route path="/pengawasan/agenda-tim" element={<PengawasanAgendaTim />} />
        <Route path="/pengawasan/arsip" element={<PengawasanArsip />} />
        <Route path="/pengawasan/arsip/detail/:dataID" element={<PengawasanArsipDetail />} />

        <Route path="/pasca-pengawasan/daftar" element={<PascaPengawasanDaftar />} />
        <Route path="/pasca-pengawasan/daftar/detail/:dataID" element={<PascaPengawasanDaftarDetail />} />
        <Route path="/pasca-pengawasan/agenda" element={<PascaPengawasanAgenda />} />
        <Route path="/pasca-pengawasan/agenda-tim" element={<PascaPengawasanAgendaTim />} />
        <Route path="/pasca-pengawasan/arsip" element={<PengawasanArsip />} />
        <Route path="/pasca-pengawasan/arsip/detail/:dataID" element={<PengawasanArsipDetail />} />

        <Route path="/profil" element={<Profil />} />

        <Route path="/pengaturan/sumber-data" element={<SumberData setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/pengaturan/sumber-data/create" element={<CreateSumberData setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/pengaturan/sumber-data/update/:sumberDataID" element={<UpdateSumberData setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/pengaturan/sumber-data/detail/:sumberDataID" element={<DetailSumberData />} />

        <Route path="/pengaturan/status-data" element={<StatusData setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/pengaturan/status-data/create" element={<CreateStatusData setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/pengaturan/status-data/update/:statusDataID" element={<UpdateStatusData setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/pengaturan/status-data/detail/:statusDataID" element={<DetailStatusData />} />

        <Route path="/pengaturan/tahapan-perencanaan" element={<TahapanPerencanaan setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/pengaturan/tahapan-perencanaan/create" element={<CreateTahapanPerencanaan setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/pengaturan/tahapan-perencanaan/update/:tahapanPerencanaanID" element={<UpdateTahapanPerencanaan setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/pengaturan/tahapan-perencanaan/detail/:tahapanPerencanaanID" element={<DetailTahapanPerencanaan />} />

        <Route path="/pengaturan/tahapan-pengawasan" element={<TahapanPengawasan setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/pengaturan/tahapan-pengawasan/create" element={<CreateTahapanPengawasan setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/pengaturan/tahapan-pengawasan/update/:tahapanPengawasanID" element={<UpdateTahapanPengawasan setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/pengaturan/tahapan-pengawasan/detail/:tahapanPengawasanID" element={<DetailTahapanPengawasan />} />

        <Route path="/pengaturan/tahapan-pasca-pengawasan" element={<TahapanPascaPengawasan setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/pengaturan/tahapan-pasca-pengawasan/create" element={<CreateTahapanPascaPengawasan setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/pengaturan/tahapan-pasca-pengawasan/update/:tahapanPascaPengawasanID" element={<UpdateTahapanPascaPengawasan setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/pengaturan/tahapan-pasca-pengawasan/detail/:tahapanPascaPengawasanID" element={<DetailTahapanPascaPengawasan />} />

        <Route path="/pengaturan/dokumen-perencanaan" element={<DokumenPerencanaan setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/pengaturan/dokumen-perencanaan/create" element={<CreateDokumenPerencanaan setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/pengaturan/dokumen-perencanaan/update/:dokumenPerencanaanID" element={<UpdateDokumenPerencanaan setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/pengaturan/dokumen-perencanaan/detail/:dokumenPerencanaanID" element={<DetailDokumenPerencanaan />} />

        <Route path="/pengaturan/dokumen-pengawasan" element={<DokumenPengawasan setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/pengaturan/dokumen-pengawasan/create" element={<CreateDokumenPengawasan setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/pengaturan/dokumen-pengawasan/update/:dokumenPengawasanID" element={<UpdateDokumenPengawasan setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/pengaturan/dokumen-pengawasan/detail/:dokumenPengawasanID" element={<DetailDokumenPengawasan />} />

        <Route path="/pengaturan/dokumen-pasca-pengawasan" element={<DokumenPascaPengawasan setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/pengaturan/dokumen-pasca-pengawasan/create" element={<CreateDokumenPascaPengawasan setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/pengaturan/dokumen-pasca-pengawasan/update/:dokumenPascaPengawasanID" element={<UpdateDokumenPascaPengawasan setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/pengaturan/dokumen-pasca-pengawasan/detail/:dokumenPascaPengawasanID" element={<DetailDokumenPascaPengawasan />} />

        <Route path="/pengaturan/user" element={<Employee setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/pengaturan/user/create" element={<CreateEmployee setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/pengaturan/user/update/:employeeID" element={<UpdateEmployee setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/pengaturan/user/detail/:employeeID" element={<DetailEmployee />} />

        <Route path="/pengaturan/perusahaan" element={<Company setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/pengaturan/perusahaan/create" element={<CreateCompany setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/pengaturan/perusahaan/update/:employeeID" element={<UpdateCompany setShowSnackbar={setShowSnackbar} showSnackBar={showSnackbar} />} />
        <Route path="/pengaturan/perusahaan/detail/:employeeID" element={<DetailCompany />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
