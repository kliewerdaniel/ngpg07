// src/App.tsx

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';

const UploadSample = lazy(() => import('./components/GhostWriter/UploadSample'));
const PersonaList = lazy(() => import('./components/GhostWriter/PersonaList'));
const BlogPosts = lazy(() => import('./components/GhostWriter/BlogPosts'));
const NavBar = lazy(() => import('./components/Layout/NavBar'));
const Login = lazy(() => import('./components/Auth/Login'));  // Update import path for Login component
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));  // Import ProtectedRoute
const GenerateContent = lazy(() => import('./components/GhostWriter/GenerateContent'));
const EditPersona = lazy(() => import('./components/GhostWriter/EditPersona'));

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <NavBar />
          <div style={{ padding: '20px' }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route 
                path="/upload" 
                element={
                  <ProtectedRoute>
                    <UploadSample />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/" 
                element={
                  <ProtectedRoute>
                    <PersonaList />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/personas" 
                element={
                  <ProtectedRoute>
                    <PersonaList />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/persona/edit/:id" 
                element={
                  <ProtectedRoute>
                    <EditPersona />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/generate" 
                element={
                  <ProtectedRoute>
                    <GenerateContent />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/blog-posts" 
                element={
                  <ProtectedRoute>
                    <BlogPosts />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
};

export default App;
