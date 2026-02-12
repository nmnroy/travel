import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/core/Layout';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import BookingFlow from './pages/BookingFlow';

import ItineraryBuilder from './pages/ItineraryBuilder';

function App() {
  return (
    <Router basename="/travel">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/search" element={<SearchResults />} /> {/* Legacy/Fallback */}

          {/* Booking Flow Routes */}
          <Route path="/book/wizard" element={<BookingFlow />} /> {/* Redirect/Wrapper */}
          <Route path="/booking/itinerary" element={<BookingFlow />} />
          <Route path="/booking/travelers" element={<BookingFlow />} />
          <Route path="/booking/payment" element={<BookingFlow />} />
          <Route path="/booking/confirmation" element={<BookingFlow />} />

          <Route path="/book/:id" element={<BookingFlow />} /> {/* Legacy dynamic route */}
          <Route path="/itinerary" element={<ItineraryBuilder />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
