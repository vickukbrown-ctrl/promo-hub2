import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Landing } from './pages/Landing';
import { Login, Register } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { PromoForm } from './pages/PromoForm';
import { PublicPage } from './pages/PublicPage';

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/promo/new" element={<PromoForm />} />
          <Route path="/promo/edit/:id" element={<PromoForm />} />
          <Route path="/u/:username" element={<PublicPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}