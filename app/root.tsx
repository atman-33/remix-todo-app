import { MetaFunction } from '@remix-run/node';
import { Link, Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { Separator } from './components/ui/separator';
import { SideBarNav } from './routes/_root/components/side-bar-nav';
import './tailwind.css';

export const meta: MetaFunction = () => {
  return [{ title: 'Remix Todo App' }, { name: 'description', content: 'Remix Todo App' }];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <div
        className="flex h-screen overflow-hidden"
        style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}
      >
        <aside className="w-[250px] px-4 py-5">
          <div className="space-y-4">
            <Link to="/" className="text-xl font-bold hover:opacity-70">
              Todo App
            </Link>
            <Separator className="border-2 border-gray-400" />
            <SideBarNav />
          </div>
        </aside>

        <Separator orientation="vertical" className="h-screen border-2 border-gray-400" />

        <main className="flex-1 overflow-y-scroll px-8 pt-12">
          {/* Outletに各ページのコンポーネントが反映される。 */}
          <Outlet />
        </main>
      </div>
    </>
  );
}
