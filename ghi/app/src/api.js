async function loadData(article, port) {
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

export default loadData;
