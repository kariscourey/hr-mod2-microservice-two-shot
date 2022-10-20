import React from 'react';
import loadData from './api';
// import Table from 'react-boostrap/Table';


function DataTable(props) {

    // console.log(props);
    let shoes = props.shoes;
    console.log(shoes);



    return (

        <table>
            <thead>
                <tr>
                    <th>Model</th>
                    <th>Manufacturer</th>
                    <th>Picture</th>
                    <th>Bin</th>
                </tr>
            </thead>
            <tbody>
                {shoes.map((shoe) => {
                    return (
                        <tr key={shoe.id}>
                            <td>{shoe.model}</td>
                            <td>{shoe.manufacturer}</td>
                            <td>{shoe.picture_url}</td>
                            <td>{shoe.shoe_bin.bin_number}</td>
                        </tr>
                    )
                })}

            </tbody>
        </table>
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

        let shoes_data = await loadData("shoes",8080);
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
