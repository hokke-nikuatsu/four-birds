export const DESCRIPTION_MAXIMUM_LENGTH = 300;

export const QUERY_LATEST_PUBLISHED_DATE =
	'SELECT MAX(published_date) as latest_published_date FROM articles;';
export const QUERY_INSERT_ARTICLE = `
  INSERT INTO
		articles
    	(article_id, title, description, published_date, url, ogp_url, publisher_id, is_valid, created_at)
  VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9)
`;
export const QUERY_HAS_ARTICLE_ID = `
  SELECT
		1 
  FROM
		articles 
  WHERE
		article_id = $1
  LIMIT
		1
`;

export const QUERY_INSERT_ARTICLE_CATEGORY = `
  INSERT INTO
		article_categories 
    	(article_id, category_id, created_at) 
  VALUES 
    ($1, $2, $3)
`;

export const QUERY_SELECT_CATEGORY_ID = `
  SELECT
		category_id 
  FROM
		categories 
  WHERE
		name = $1
  LIMIT
		1
`;
export const QUERY_HAS_CATEGORY = `
  SELECT
		1 
  FROM
		categories 
  WHERE
		name = $1
  LIMIT
		1
`;
export const QUERY_INSERT_CATEGORY = `
  INSERT INTO
		categories 
  		(name, created_at) 
  VALUES 
    ($1, $2)
`;

export const QUERY_SELECT_PUBLISHER_ID = `
  SELECT
		publisher_id 
  FROM
		publishers 
  WHERE
		name = $1
  LIMIT
		1
`;
export const QUERY_HAS_PUBLISHER = `
  SELECT
		1 
  FROM
		publishers 
  WHERE
		name = $1
  LIMIT
		1
`;
export const QUERY_INSERT_PUBLISHER = `
  INSERT INTO
		publishers 
    	(name, created_at) 
  VALUES 
    ($1, $2)
`;

export const QUERY_SELECT_COUNTRY_ID = `
  SELECT
		country_id 
  FROM
		countries 
  WHERE
		name = $1
  LIMIT
		1
`;
export const QUERY_HAS_COUNTRY = `
  SELECT
		1 
  FROM
		countries 
  WHERE
		name = $1
  LIMIT
		1
`;
export const QUERY_INSERT_COUNTRY = `
  INSERT INTO
		countries 
    	(name, created_at) 
  VALUES 
    ($1, $2)
`;

export const QUERY_INSERT_ARTICLE_COUNTRY = `
  INSERT INTO
		article_countries 
    	(article_id, country_id, created_at) 
  VALUES 
    ($1, $2, $3)
`;

export const QUERY_INSERT_FETCH_ARTICLES_LOG = `
  INSERT INTO
		fetch_article_logs 
    	(executed_date, article_count, status, created_at) 
  VALUES 
    ($1, $2, $3, $4)
`;
