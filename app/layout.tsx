import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '../contexts/AuthContext'
import { Toaster } from 'react-hot-toast'
import { AdminProvider } from '../components/AdminContext'
import { UserProvider } from '../components/UserContext'
import PromoBannerModal from '../components/PromoBannerModal'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vedic Vigyanam Explorer Society',
  icons: {
    icon: '/vves-logo(1).png'
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#8B0000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <AdminProvider>
            <UserProvider>
              {children}
              <PromoBannerModal />
            </UserProvider>
          </AdminProvider>
        </AuthProvider>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  )
}


