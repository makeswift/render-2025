import { Toaster } from 'react-hot-toast';

export const Notifications = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        className:
          '!text-black !rounded-none !border !border-black !bg-white !shadow-lg !py-4 !px-6 !text-base',
      }}
    />
  );
};
