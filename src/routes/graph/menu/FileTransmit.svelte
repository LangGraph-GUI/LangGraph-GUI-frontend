<!-- routes/graph/menu/FileTransmit.svelte -->
<script lang="ts" module>
	import { username } from './menu.store';
	import { get } from 'svelte/store';

	const SERVER_URL = import.meta.env.VITE_BACKEND_URL;

	/** Upload selected files */
	export async function handleUpload(event: Event) {
		const files = (event.target as HTMLInputElement).files;
		const user = get(username);

		if (!files?.length) {
			alert('No files selected for upload.');
			return;
		}
		const formData = new FormData();
		for (const file of Array.from(files)) {
			formData.append('files', file);
		}

		try {
			const res = await fetch(`${SERVER_URL}/upload/${encodeURIComponent(user)}`, {
				method: 'POST',
				body: formData
			});
			if (res.ok) {
				alert('Files successfully uploaded');
			} else {
				const err = await res.json();
				alert('Upload failed: ' + err.error);
			}
		} catch (err) {
			alert('Upload failed: ' + err);
		}
	}

	/** Trigger a workspace ZIP download */
	export async function handleDownload() {
		const user = get(username);
		try {
			const res = await fetch(`${SERVER_URL}/download/${encodeURIComponent(user)}`);
			if (res.ok) {
				const blob = await res.blob();
				const url = URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.href = url;
				a.download = `${user}_workspace.zip`;
				a.click();
				URL.revokeObjectURL(url);
			} else {
				const err = await res.json();
				alert('Download failed: ' + err.error);
			}
		} catch (err) {
			alert('Download failed: ' + err);
		}
	}

	/** Clean the user’s server-side cache */
	export async function handleCleanCache() {
		const user = get(username);
		try {
			const res = await fetch(`${SERVER_URL}/clean-cache/${encodeURIComponent(user)}`, {
				method: 'POST'
			});
			if (res.ok) {
				alert('Cache successfully cleaned');
			} else {
				const err = await res.json();
				alert('Clean cache failed: ' + err.error);
			}
		} catch (err) {
			alert('Clean cache failed: ' + err);
		}
	}
</script>
