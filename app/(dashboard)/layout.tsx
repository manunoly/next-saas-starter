import Header from '@/components/ui/header';
import HeaderSecundary from '@/components/ui/headerSecundary';
import { getMenu, getUser } from '@/lib/db/queries';
import { headers } from "next/headers";

export default async function Layout({ children }: { children: React.ReactNode }) {

  const user = await getUser();
  if (user) {
    const navItems = await getMenu(user.role);
    return (
      <section className="flex flex-col min-h-screen">
        <Header />
        <HeaderSecundary navItems={navItems} />
        {children}
      </section>
    );
  }

  return (
    <section className="flex flex-col min-h-screen">
      <Header />
      {children}
    </section>
  );
}
