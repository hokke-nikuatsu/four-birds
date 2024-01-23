const FETCH_API_TIMEOUT = 60000;

export const pathToPlaceHolderImage = '/images/placeholder.png';

export const fetchApiAbortController = new AbortController();
export const fetchApiTimeout = setTimeout(() => {
	fetchApiAbortController.abort();
}, FETCH_API_TIMEOUT);
