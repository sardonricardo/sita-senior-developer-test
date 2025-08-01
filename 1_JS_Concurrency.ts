export async function fetchWithConcurrencyLimit(
	urls: string[],
	maxConcurrency: number
): Promise<any[]> {
	const results: any[] = new Array(urls.length);
	let currentIndex = 0;

	async function worker(): Promise<void> {
		while (currentIndex < urls.length) {
			const index = currentIndex++;
			try {
				const response = await fetch(urls[index]);
				results[index] = await response.json();
			} catch (error) {
				if (error instanceof Error) {
					results[index] = { error: error.message };
				} else {
					results[index] = { error: String(error) };
				}
			}
		}
	}
	const workers = Array.from({ length: maxConcurrency }, worker);
	await Promise.all(workers);
	return results;
}

/* async function test() {
	const urls = [
		"https://jsonplaceholder.typicode.com/posts/1",
		"https://jsonplaceholder.typicode.com/posts/2",
		"https://jsonplaceholder.typicode.com/posts/3",
        "https://jsonplaceholder.typicode.com/posts/4",
        "https://jsonplaceholder.typicode.com/posts/5",
	];
	const results = await fetchWithConcurrencyLimit(urls, 2);
	console.log(results);
}

test().catch(console.error); */
