import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/app/providers'
import Link from 'next/link'
import { IBM_Plex_Mono } from 'next/font/google'
import { ThemeToggle } from '@/components/theme-toggle'
import { UserBox } from '@/components/user'
// import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: 'mitism - Block Editor Demo',
  description: 'mitism portfolio',
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/icon?<generated>",
        href: "/icon?<generated>",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/fav-light.png",
        href: "/fav-light.png",
      }
    ]
  }
}

const mono = IBM_Plex_Mono({
  weight: "400",
  subsets: ["latin"]
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className=''>
        <Providers>
          <header
              className={`z-[99999] fixed top-0 h-5 bg-emerald-300 text-emerald-900 text-xs w-full flex items-center justify-center px-2 ${mono.className}`}
          >
              under developement...
          </header>
              <div className='z-[99999] fixed top-5 right-0 p-2 flex items-center justify-between w-full bg-neutral-200 dark:bg-neutral-900'>
                <UserBox />
                <ThemeToggle />
              </div>
              {children}
          <footer
              className={`fixed bottom-0 min-h-5 bg-black text-white dark:bg-white dark:text-black text-xs w-full flex items-center justify-between px-2 ${mono.className}`}
              >
              <div>
                  © {new Date().getFullYear()} <Link href="https://mitism.com" target="_blank" className="underline">mitism.com</Link>
              </div>
              <div>
                  Demo: Block Editor
              </div>
          </footer>
        </Providers>
        {/* <Toaster /> */}
      </body>
    </html>
  )
}
