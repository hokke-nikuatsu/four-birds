// articles table
export const QUERY_INSERT_ARTICLE =
	'INSERT INTO `articles` (`article_id`, `title`, `description`, `published_date`, `url`, `ogp_url`, `publisher_id`, `is_valid`, `created_at`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
export const QUERY_HAS_ARTICLE_ID =
	'SELECT 1 FROM `articles` WHERE `article_id` = ? LIMIT 1';

// article_categories table
export const QUERY_INSERT_ARTICLE_CATEGORY =
	'INSERT INTO `article_categories` (`article_id`, `category_id`, `created_at`) VALUES (?, ?, ?)';

// categories table
export const QUERY_SELECT_CATEGORY_ID =
	'SELECT `category_id` FROM `categories` WHERE `name` = ? LIMIT 1';
export const QUERY_HAS_CATEGORY =
	'SELECT 1 FROM `categories` WHERE `name` = ? LIMIT 1';
export const QUERY_INSERT_CATEGORY =
	'INSERT INTO `categories` (`name`, `created_at`) VALUES (?, ?)';

// publishers table
export const QUERY_SELECT_PUBLISHER_ID =
	'SELECT `publisher_id` FROM `publishers` WHERE `name` = ? LIMIT 1';
export const QUERY_HAS_PUBLISHER =
	'SELECT 1 FROM `publishers` WHERE `name` = ? LIMIT 1';
export const QUERY_INSERT_PUBLISHER =
	'INSERT INTO `publishers` (`name`, `created_at`) VALUES (?, ?)';

// country table
export const QUERY_SELECT_COUNTRY_ID =
	'SELECT `country_id` FROM `countries` WHERE `name` = ? LIMIT 1';
export const QUERY_HAS_COUNTRY =
	'SELECT 1 FROM `countries` WHERE `name` = ? LIMIT 1';
export const QUERY_INSERT_COUNTRY =
	'INSERT INTO `countries` (`name`, `created_at`) VALUES (?, ?)';

// article_countries table
export const QUERY_INSERT_ARTICLE_COUNTRY =
	'INSERT INTO `article_countries` (`article_id`, `country_id`, `created_at`) VALUES (?, ?, ?)';

// newsFetchLongs table
export const QUERY_INSERT_FETCH_NEWS_LOG =
	'INSERT INTO `fetch_news_logs` (`executed_date`, `news_count`, `status`, `created_at`) VALUES (?, ?, ?, ?)';
