import React from 'react';
import './App.css'

import { BrowserRouter, useRoutes } from 'react-router-dom'

// Components
import ScrollToTop from './components/ScrollToTop'
import NotFound from './pages/NotFound';
import BackButton from './components/BackButton';

// Sections
import Landing from './pages/Landing';
import Form from './pages/Form'

const RouterConfig = () => {
  const routes = [
    {
      path: '/',
      element: <Landing />,
    },
    {
      path: '*',
      element: (
        <>
          <BackButton />
          <div className="content">
            {useRoutes([
              { path: '/gift-form', element: <Form /> },
              { path: '*', element: <NotFound /> },
            ])}
          </div>
        </>
      ),
    },
  ];

  return useRoutes(routes);
};

const App = () => {
  return (
    <>
      <BrowserRouter basename="/">
        <ScrollToTop />
        <RouterConfig />
      </BrowserRouter>
    </>
  );
};

export default App;
