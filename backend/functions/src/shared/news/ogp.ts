import ogs from 'open-graph-scraper';
import { type Article } from '../../types/news';

export const obtainOgpUrls = async (
	urls: Article['link'][],
): Promise<string[]> => {
	const fetchOgp = async (url: string) => {
		const options = { url, timeout: 60000 };

		try {
			const data = await ogs(options);
			const status = data.result.success;

			if (!status) {
				throw new Error(`Fetch ogp failed: ${data.error}`);
			}

			const ogpUrl = data.result.ogImage?.[0]?.url ?? '';

			return ogpUrl;
		} catch (e) {
			console.warn(
				`Error fetching open graph data for url ${url} : ${JSON.stringify(e)}`,
			);

			return '';
		}
	};

	return Promise.all(urls.map((url) => fetchOgp(url)));
};
