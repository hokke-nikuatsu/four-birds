export const QUERY_SELECT_ARTICLES = `
  SELECT 
    a.article_id,
    a.title,
    a.description,
    a.published_date,
    a.url,
    a.ogp_url,
    p.display_name,
    GROUP_CONCAT(c.japanese_name ORDER BY c.japanese_name SEPARATOR ', ') AS categories,
    GROUP_CONCAT(c2.japanese_name ORDER BY c2.japanese_name SEPARATOR ', ') AS countries
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
  LIMIT 20 OFFSET 20;
`;
