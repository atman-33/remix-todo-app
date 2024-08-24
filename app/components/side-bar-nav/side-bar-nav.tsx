import { Link } from '@remix-run/react';
import { Button } from '../shadcn/ui/button';

const sideBarNavItems: {
  title: string;
  href: string;
}[] = [
  {
    title: 'TODO',
    href: '/todos',
  },
  {
    title: 'ユーザー',
    href: '/users',
  },
];

export const SideBarNav = () => {
  return (
    <nav className="flex flex-col gap-2">
      {sideBarNavItems.map((item) => (
        <Link key={item.href} to={item.href}>
          <Button variant="ghost" className="hover:bg-red-200">
            {item.title}
          </Button>
        </Link>
      ))}
    </nav>
  );
};
