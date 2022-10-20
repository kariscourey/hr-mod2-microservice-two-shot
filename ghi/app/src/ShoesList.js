import React from 'react';
import {getArticles} from './api';
import { Link, Outlet } from 'react-router-dom';

function refreshPage() {
    window.location.reload(false);
}

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


function DataTable(props) {

    // console.log(props);
    let shoes = props.shoes;
    // console.log(shoes);

    return (
        <>
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Model</th>
                            <th>Manufacturer</th>
                            <th>Bin</th>
                            <th>Picture Url</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shoes.map((shoe) => {
                            return (
                                <tr key={shoe.id}>
                                    <td><Link to={`/shoes/${shoe.id}`} >{shoe.model}</Link></td>
                                    <td>{shoe.manufacturer}</td>
                                    <td>{shoe.shoe_bin.bin_number}</td>
                                    <td><img style={{ width: 100 }} src={shoe.picture_url} /></td>
                                    <td>
                                        <button onClick={handleDelete} className="btn btn-outline-danger btn-sm" value={shoe.id} >Delete </button>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Link to="/shoes/new" className="btn btn-primary btn-lg px-4 gap-3">Create a shoe</Link>
              <Outlet />
            </div>
        </>

    );
  }


class ShoesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            shoes: [],
        };
    }

    async componentDidMount() {

        let shoes_data = await getArticles("shoes",8080);
        // console.log(shoes_data);
        this.setState({shoes:shoes_data});

    }


    render() {
        return (
            <div className="row">
                <DataTable shoes={this.state.shoes} />
            </div>
    )
}
}

export default ShoesList;
