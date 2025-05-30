<!-- src/routes/graph/menu/FileTransmit.svelte -->
<script lang="ts" module>
	import { username } from './user-info.store';
	import { get } from 'svelte/store';

	const SERVER_URL = import.meta.env.VITE_BACKEND_URL;

	/**
	 * Uploads the selected files under the current username.
	 * If no files are picked or the username is still 'unknown',
	 * it alerts the user and bails out.
	 */
	export async function handleUpload(event: Event) {
		// Grab the FileList from the input event
		const files = (event.target as HTMLInputElement).files;
		// Read the current username from the store
		const user = get(username);

		if (!files || files.length === 0) {
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
</script>

<input type="file" multiple onchange={handleUpload} />
