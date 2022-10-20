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
    const articleUrl = `http://localhost:8080/api/Hats/${id}/`;
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
    let Hats = props.Hats;
    // console.log(Hats);

    return (
        <>
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Model</th>
                            <th>Manufacturer</th>
                            <th>Location</th>
                            <th>Picture Url</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Hats.map((Hat) => {
                            return (
                                <tr key={Hat.id}>
                                    <td><Link to={`/Hats/${Hat.id}`} >{Hat.model}</Link></td>
                                    <td>{Hat.manufacturer}</td>
                                    <td>{Hat.Hat_location.location_number}</td>
                                    <td><img style={{ width: 100 }} src={Hat.picture_url} /></td>
                                    <td>
                                        <button onClick={handleDelete} className="btn btn-outline-danger btn-sm" value={Hat.id} >Delete </button>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Link to="/Hats/new" className="btn btn-primary btn-lg px-4 gap-3">Create a Hat</Link>
              <Outlet />
            </div>
        </>

    );
  }


class HatsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Hats: [],
        };
    }

    async componentDidMount() {

        let Hats_data = await getArticles("Hats",8080);
        // console.log(Hats_data);
        this.setState({Hats:Hats_data});

    }


    render() {
        return (
            <div className="row">
                <DataTable Hats={this.state.Hats} />
            </div>
    )
}
}

export default HatsList;
