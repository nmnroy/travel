import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/core/Layout';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import BookingFlow from './pages/BookingFlow';
import { UnifiedBookingWizard } from './components/booking/UnifiedBookingWizard';

import ItineraryBuilder from './pages/ItineraryBuilder';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/book/wizard" element={<UnifiedBookingWizard />} />
          <Route path="/book/:id" element={<BookingFlow />} />
          <Route path="/itinerary" element={<ItineraryBuilder />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
