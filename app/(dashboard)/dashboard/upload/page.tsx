import { redirect } from 'next/navigation';
import { getUploadsForUser, getUser } from '@/lib/db/queries';
import UppyDashboard from '@/components/uppy/UppyDashboard';
import { Upload } from '@/lib/db/schema';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function SettingsPage() {
  const user = await getUser();

  if (!user) {
    redirect('/sign-in');
  }

  const uploads: Upload[] = await getUploadsForUser(user.id);
  // get the host on the server side
  const hostUrl = process.env.NEXT_PUBLIC_HOST_URL;

  return (
    <>

      <h1 className='text-3xl font-bold text-center underline p-4'>Uploads</h1>
      <div className="flex justify-around items-start flex-wrap">
        {
          uploads && uploads.map((upload) => (
            <div key={upload.id} className='flex flex-col items-center'>
              <Image src={`${hostUrl}/${upload.filepath}`} alt={upload.filename} width={100} height={100} />
              <Link href={`${hostUrl}/${upload.filepath}`} passHref target='_blank'>
                <Button asChild variant='link' className='mt-2'>
                  <h3 className='text-xs'>{upload.filename}</h3>
                </Button>
              </Link>
            </div>
          ))
        }
      </div>

      <UppyDashboard customValue={user} uploads={uploads} />;
    </>
  )
}
