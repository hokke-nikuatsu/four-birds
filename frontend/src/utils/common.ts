const FETCH_API_TIMEOUT = 60000;

export const PATH_TO_PLACE_HOLDER_IMAGE = '/images/placeholder.png';
export const PATH_TO_MENU_ICON = '/images/menu.png';
export const PATH_TO_LOGO_IMAGE = '/images/logo.png';

export const fetchApiAbortController = new AbortController();
export const fetchApiTimeout = setTimeout(() => {
	fetchApiAbortController.abort();
}, FETCH_API_TIMEOUT);
