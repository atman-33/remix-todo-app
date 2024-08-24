import { Outlet } from '@remix-run/react';

const RootLayout = () => {
  return (
    <>
      <div className="border-4 p-2">
        <div>Root Layout</div>
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
