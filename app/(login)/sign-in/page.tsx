import { redirect } from 'next/navigation';
import { Login } from '../login';
import { getUser } from '@/lib/db/queries';

export default async function SignInPage() {
    const user = await getUser();
  
    if (user) {
      redirect('/dashboard');
    }
  return <Login mode="signin" />;
}
