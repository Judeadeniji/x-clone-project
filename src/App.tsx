import './App.css'
import { ErrorBoundary } from "rc-extended/components"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainLayout } from './components/layout'
import { Guard } from './lib/Guard'
import { LoginForm } from './pages/auth/login'
import { SignUpComponent } from './pages/auth/sign-in'
import { cn } from './lib/utils'
import { useElementSize } from 'rc-extended/use'
import { lazy } from 'react'

const HomeComponent = lazy(() => import('./pages/home'))

function App() {
  const { width } = useElementSize(document.body)
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" storageKey="rc-extended-example">
        <main className={cn("min-w-screen min-h-screen md:mx-auto dark:bg-[#121212] max-w-[1440px]", width < 760 && "h-screen relative overflow-x-hidden overflow-y-scroll no-scrollbar")}>
          <Toaster />
          <BrowserRouter>
          <Guard>
          <MainLayout>
            <Routes>
              <Route path='/' element={<LoginForm />} />
              <Route path='/home' element={<HomeComponent />} />
              <Route path='/sign-in' element={<SignUpComponent />} />
              <Route path='/login' element={<LoginForm />} />
            </Routes>
          </MainLayout>
          </Guard>
          </BrowserRouter>
        </main>
      </ThemeProvider>
     </ErrorBoundary>
  )
}

export default App
