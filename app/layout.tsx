import '@/app/ui/global.css';
import { Metadata } from 'next';
import {inter} from '@/app/ui/font'
import SideNav from './ui/sideNav';
import '@/app/ui/global.css'
import { Suspense } from 'react';
import { Metrika } from '@/app/components/mertika';
export const metadata: Metadata = {
  title: 'Todo TJ',
  description: 'The official Next.js Course Dashboard, built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),

};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={`${inter.className} mx-2 antialiased`}>
        <nav>
          <SideNav />
        </nav>

        <main>{children}</main>
        <section id="modal"></section>
          <Suspense>
          <Metrika />
        </Suspense>
      </body>
    </html>
  );
}
