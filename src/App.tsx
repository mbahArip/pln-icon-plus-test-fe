import { Link, Route, Routes } from "react-router";
import { Button } from "./components/Button";
import ViewAdditionalTest from "./views/AdditionalTest";
import ViewDashboard from "./views/Dashboard";
import ViewForm from "./views/Form";
import ViewFormAdd from "./views/Form/Add";
import ViewFormLayout from "./views/Form/layout";
import ViewHome from "./views/Home";

export default function App() {
  return (
    <Routes>
      <Route index element={<ViewHome />} />
      <Route path="additional" element={<ViewAdditionalTest />} />
      <Route path="dashboard" element={<ViewDashboard />} />
      <Route path="form" element={<ViewFormLayout />}>
        <Route index element={<ViewForm />} />
        <Route path="add" element={<ViewFormAdd />} />
      </Route>
      <Route
        path="*"
        element={
          <div className="flex items-center justify-center flex-col gap-4 w-full h-full min-h-screen text-form-foreground">
            <div className="flex items-center gap-2">
              <h1 className="text-4xl font-bold">404</h1>
              <div className="h-8 w-px bg-form-input" />
              <p className="text-lg">Halaman tidak ditemukan</p>
            </div>
            <Link to="/">
              <Button>Kembali ke halaman utama</Button>
            </Link>
          </div>
        }
      />
    </Routes>
  );
}
