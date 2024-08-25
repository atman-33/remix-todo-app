import { Outlet } from '@remix-run/react';

const LadingLayout = () => {
  return (
    <>
      <div className="border-4 p-2">
        <div>Landing Layout</div>
        <Outlet />
      </div>
    </>
  );
};

export default LadingLayout;
