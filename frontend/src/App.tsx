import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/layout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              {' '}
              <p>Homepage</p>{' '}
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              {' '}
              <p>Search page</p>{' '}
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
