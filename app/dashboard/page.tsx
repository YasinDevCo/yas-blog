import BlogDashboard from '@/components/dashboard/blog-dashboard';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

const Dashboard = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect('/');
  }

  return (
    <div>
      <BlogDashboard />
    </div>
  );
};

export default Dashboard;
