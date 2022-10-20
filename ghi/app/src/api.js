export async function getArticle(article, port, id) {
  const url = `http://localhost:${port}/api/${article}/${id}/`;
  const response = await fetch(url);

  if (response.ok) {
      const data = await response.json();

      return data;

      } else {
          console.error(response);
        }
  }


export async function getArticles(article, port) {
      const response = await fetch(`http://localhost:${port}/api/${article}/`);
      // console.log(response);

      if (response.ok) {
        const data = await response.json();
        // console.log(data[article]);
        return data[article];
      } else {
        console.error(response);
      }

    }
