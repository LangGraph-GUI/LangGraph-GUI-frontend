// lib/io/json.ts

export const saveJsonToFile = (filename: string, JsonData: any): void => {
	try {
		const blob = new Blob([JSON.stringify(JsonData, null, 2)], {
			type: 'application/json'
		});
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
		alert('File saving!');
	} catch (error) {
		console.error('Error saving JSON:', error);
		alert('Failed to save file.');
	}
};

export const loadJsonFromFile = (): Promise<any> => {
	return new Promise((resolve, reject) => {
		const fileInput = document.createElement('input');
		fileInput.type = 'file';
		fileInput.accept = '.json';
		fileInput.style.display = 'none';
		document.body.appendChild(fileInput);

		fileInput.addEventListener('change', async (event) => {
			try {
				const file = (event.target as HTMLInputElement).files?.[0];
				if (!file) {
					reject(new Error('No file selected.'));
					return;
				}
				const reader = new FileReader();
				reader.onload = async (e) => {
					try {
						const contents = e.target?.result;
						if (typeof contents === 'string') {
							const parsedData = JSON.parse(contents);
							resolve(parsedData);
						} else {
							reject(new Error('File contents are not a string.'));
						}
					} catch (error) {
						reject(new Error('Error parsing JSON.' + error));
					}
				};
				reader.onerror = () => reject(new Error('Error reading file.'));
				reader.readAsText(file);
			} catch (error) {
				console.error('Error during file handling:', error);
				reject(new Error('Error loading JSON:' + error));
			} finally {
				document.body.removeChild(fileInput);
			}
		});
		fileInput.click();
	});
};
