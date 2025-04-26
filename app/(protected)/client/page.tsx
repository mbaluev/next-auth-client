'use client';

import { WidgetClient } from '@/components/widgets/client';

const ClientPage = () => {
  return (
    <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <WidgetClient />
    </div>
  );
};

export default ClientPage;
