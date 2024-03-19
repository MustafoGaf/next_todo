import '@/app/ui/global.css';
import { Metadata } from 'next';
import {inter} from '@/app/ui/font'
import SideNav from './ui/sideNav';
import '@/app/ui/global.css'
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
  
<script type="text/javascript" >
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(96793920, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
   });
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/96793920" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
      </body>
    </html>
  );
}
