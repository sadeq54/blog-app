import { ReactNode } from 'react';

export default function PostLayout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Post Details</h2>
      {children}
    </div>
  );
}