import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

import Tasks from './pages/Tasks'
import Calendar from './pages/Calendar'
import Reports from './pages/Reports'

import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'

import AddTask from './pages/AddTask'
import ViewTask from './pages/ViewTask'
import EditTask from './pages/EditTask'

import PageNotFound from './pages/PageNotFound'


function App() {

    const [theme, setTheme] = useState(
        sessionStorage.getItem('theme') || 'light'
    )

    useEffect(() => {
        sessionStorage.setItem('theme', theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    return (
        <div className={theme === 'dark' ? 'dark' : ''}>
            <Routes>

                
                <Route path="/" element={<Home theme={theme} toggleTheme={toggleTheme} />} />

                <Route path="/login" element={<Login theme={theme} toggleTheme={toggleTheme} />} />

                <Route path="/register" element={<Register theme={theme} toggleTheme={toggleTheme} />} />



                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <Layout theme={theme} toggleTheme={toggleTheme}>
                            <Dashboard />
                        </Layout>
                    </ProtectedRoute>
                } />

                <Route path="/tasks" element={
                    <ProtectedRoute>
                        <Layout theme={theme} toggleTheme={toggleTheme}>
                            <Tasks />
                        </Layout>
                    </ProtectedRoute>
                } />

                <Route path="/calendar" element={
                    <ProtectedRoute>
                        <Layout theme={theme} toggleTheme={toggleTheme}>
                            <Calendar />
                        </Layout>
                    </ProtectedRoute>
                } />

                <Route path="/reports" element={
                    <ProtectedRoute>
                        <Layout theme={theme} toggleTheme={toggleTheme}>
                            <Reports />
                        </Layout>
                    </ProtectedRoute>
                } />

                <Route path="/tasks/add" element={
                    <ProtectedRoute>
                        <Layout theme={theme} toggleTheme={toggleTheme}>
                            <AddTask />
                        </Layout>
                    </ProtectedRoute>
                } />

                <Route path="/tasks/:id" element={
                    <ProtectedRoute>
                        <Layout theme={theme} toggleTheme={toggleTheme}>
                            <ViewTask />
                        </Layout>
                    </ProtectedRoute>
                } />

                <Route path="/tasks/edit/:id" element={
                    <ProtectedRoute>
                        <Layout theme={theme} toggleTheme={toggleTheme}>
                            <EditTask />
                        </Layout>
                    </ProtectedRoute>
                } />


            

                <Route path="*" element={<PageNotFound />} />

            </Routes>
        </div>
    )
}


export default App