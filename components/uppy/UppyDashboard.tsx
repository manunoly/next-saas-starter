'use client';
import { useEffect, useState } from 'react';
import { Upload } from '@/lib/db/schema';

import Uppy from '@uppy/core';
// For now, if you do not want to install UI components you
// are not using import from lib directly.
import Dashboard from '@uppy/react/lib/Dashboard';
// import Tus from '@uppy/tus'; use to resume your uploads
import Xhr from '@uppy/xhr-upload';

import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import { Button } from '../ui/button';
import { revalidateUrl } from '@/app/(dashboard)/dashboard/actions';
import { usePathname } from 'next/navigation'

function createUppyS() {
	// tus to resume your uploads if the connection is lost
	// return new Uppy().use(Tus, { endpoint: '/api/upload' });

	// upload directly to the server
	return new Uppy().use(Xhr, { endpoint: '/api/upload' });
}

function createUppy() {
	const uppy = new Uppy();
	uppy.use(Transloadit, {
		async assemblyOptions() {
			// You can send meta data along for use in your template.
			// https://transloadit.com/docs/topics/assembly-instructions/#form-fields-in-instructions
			const { meta } = uppy.getState();
			const body = JSON.stringify({ customValue: meta.customValue });
			const res = await fetch('/transloadit-params', { method: 'POST', body });
			return response.json();
		},
	});
	return uppy;
}

interface UppyDashboardProps {
	customValue: any;
	uploads: Upload[];
}

export default function UppyDashboard({ customValue, uploads }: UppyDashboardProps) {
	// IMPORTANT: passing an initializer function to prevent the state from recreating.
	const [uppy] = useState(createUppyS);
	const [darkMode, setDarkMode] = useState(false);
	const pathname = usePathname()

	useEffect(() => {
		if (customValue) {
			uppy.setOptions({ meta: { customValue } });
		}
		// uppy.on('upload-success', (file, response) => {
		// 	console.log('%cMyProject%cline:57%cresponse', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(89, 61, 67);padding:3px;border-radius:2px', response)
		// 	console.log('%cMyProject%cline:57%cfile', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(34, 8, 7);padding:3px;border-radius:2px', file)
		// 	revalidateUrl(pathname);
		// });

		uppy.on('complete', () => {
			revalidateUrl(pathname);
		});
		return () => {
			uppy.cancelAll();
		}
	}, [uppy, customValue]);

	return (
		<>
			<Button onClick={() => setDarkMode(!darkMode)} variant='outline' className={darkMode ? 'bg-black text-white' : 'bg-white text-black'}>
				Toggle Dark Mode
			</Button>
			<Button onClick={() => revalidateUrl(pathname)} variant='outline' className='bg-white text-black'>
				Refresh
			</Button>
			<Dashboard theme={darkMode ? 'dark' : 'light'} uppy={uppy} />
		</>
	)
}