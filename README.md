# Osa 13 tehtävät

## Muutamia SQL komentoja

```sql
--Create table blogs
CREATE TABLE blogs (
  id SERIAL PRIMARY KEY, 
  author text, 
  url text NOT NULL, 
  title text NOT NULL, 
  likes integer DEFAULT 0
);

--Show tables
\d

--Show specific table info
\d blogs

--Add blogs
insert into blogs (author, url, title) values ('Juhana Kuparinen', 'juhanakuparinen.dev', 'Trying out PostgreSQL');

insert into blogs (author, url, title, likes) values ('Matti Meikäläinen', 'www.matti.fi', '1000 tykkäystä :)', 1000);

--Show all blogs
select * from blogs;
```