import validator from 'validator';

export const validateUrl = (url: string): boolean => {
	const isValidLength = url.length;
	if (isValidLength > 2083) {
		return false;
	}

	const isValidProtocol = url.startsWith('https://');
	if (!isValidProtocol) {
		return false;
	}

	const isValidUrl = validator.isURL(url, {
		protocols: ['https'],
		require_tld: true,
		require_protocol: true,
		require_host: true,
		require_valid_protocol: true,
		allow_underscores: false,
		allow_trailing_dot: false,
		allow_protocol_relative_urls: false,
	});

	if (!isValidUrl) {
		return false;
	}

	const hasOnlyValidCharacters = validator.matches(
		url,
		/^[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=%]+$/,
	);

	if (!hasOnlyValidCharacters) {
		return false;
	}

	return true;
};
