/**
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';
import Home from './pages/Home';
import SpecialistProfile from './pages/SpecialistProfile';
import Category from './pages/Category';
import Jobs from './pages/Jobs';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-brand-bg">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/profile/:id" element={<SpecialistProfile />} />
            <Route path="/category/:slug" element={<Category />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
        <AIAssistant />
      </div>
    </Router>
  );
}
