import Header from '@/components/ui/header';
import HeaderSecundary from '@/components/ui/headerSecundary';
import { getMenu, testDBConnection, getUser } from '@/lib/db/queries';

export default async function Layout({ children }: { children: React.ReactNode }) {
  let conexion = await testDBConnection();
  const user = await getUser();
 const menu = user ? await getMenu(user?.role) : [];

  return (
    <section className="flex flex-col min-h-screen">
      {
        !conexion && (
          <div className="bg-red-500 text-white text-center h-6">
            <p>We are experiencing some slowliness in our database connection, please try again.</p>
          </div>
        )
      }
      <Header navItems={menu} />
      {children}
    </section>
  );
}
