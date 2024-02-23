export const QUERY_SELECT_ARTICLES = `
  SELECT 
    a.article_id,
    a.title,
    a.description,
    a.published_date,
    a.url,
    a.ogp_url,
    p.display_name AS publisher_name,
    GROUP_CONCAT(c.name ORDER BY c.name SEPARATOR ',') AS categories
  FROM 
    articles a
  JOIN 
    article_categories ac ON a.article_id = ac.article_id
  JOIN 
    categories c ON ac.category_id = c.category_id
  JOIN 
    article_countries ac2 ON a.article_id = ac2.article_id
  JOIN 
    countries c2 ON ac2.country_id = c2.country_id
  JOIN
    publishers p ON a.publisher_id = p.publisher_id
  WHERE 
    a.is_valid = 1
  GROUP BY 
    a.article_id
  ORDER BY 
    a.published_date DESC
  LIMIT 24 OFFSET ?;
`;

export const QUERY_SELECT_USER = `
  SELECT 
    COUNT(*) AS count
  FROM 
    users u
  WHERE 
    u.user_id = ?;
`;

export const QUERY_CREATE_USER = `
  INSERT INTO
    users
      (
        user_id,
        email, 
        photo_url,
        is_active,
        logged_in_at,
        created_at
      )
  VALUES
    (?, ?, ?, ?, ?, ?);
`;

export const QUERY_UPDATE_USER = `
  UPDATE
    users
  SET
    email = ?,
    photo_url = ?,
    is_active = ?,
    logged_in_at = ?,
    updated_at = ?
  WHERE
    user_id = ?;
`;
