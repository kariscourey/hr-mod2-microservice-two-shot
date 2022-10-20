async function handleDelete(event) {
    event.preventDefault();
    // console.log(event.target.value);
    const id = event.target.value;
    const articleUrl = `http://localhost:8080/api/shoes/${id}/`;
    const fetchConfig = {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = await fetch(articleUrl, fetchConfig);

    if (response.ok) {
        const delArticle = await response.json();
        console.log(delArticle);
        refreshPage();
    }
}
