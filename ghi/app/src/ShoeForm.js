import React from 'react';
import {useNavigate} from 'react-router-dom';

//OFI redirect elsewhere
class ShoeForm extends React.Component {
    constructor(props) {
        super(props)
        // can just use state =
        this.state = {
            model: '',
            manufacturer: '',
            pictureUrl: '',
            shoeBins: [],
        };
        // binding can be replaced with => fns
        this.handleModelChange = this.handleModelChange.bind(this);
        this.handleManufacturerChange = this.handleManufacturerChange.bind(this);
        this.handlePictureUrlChange = this.handlePictureUrlChange.bind(this);
        this.handleShoeBinChange = this.handleShoeBinChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const url = 'http://localhost:8100/api/bins/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            this.setState({shoeBins:data.bins});
            // console.log(this.state.shoeBins);
            }
        }

    handleModelChange(event) {
        const value = event.target.value;
        this.setState({model: value});
    }

    handleManufacturerChange(event) {
        const value = event.target.value;
        this.setState({manufacturer: value});
    }

    handlePictureUrlChange(event) {
        const value = event.target.value;
        this.setState({pictureUrl: value});
    }

    handleShoeBinChange(event) {
        const value = event.target.value;
        this.setState({shoeBin: value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        data.picture_url = data.pictureUrl;
        data.shoe_bin = data.shoeBin;
        delete data.pictureUrl;
        delete data.shoeBin;
        delete data.shoeBins;
        console.log(data);

        const body = JSON.stringify(data);

        const articleUrl = 'http://localhost:8080/api/shoes/';
        const fetchConfig = {
            method: 'post',
            body: body,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(articleUrl, fetchConfig);

        if (response.ok) {
            const newArticle = await response.json();
            console.log(newArticle);

            const cleared = {
                model: '',
                manufacturer: '',
                pictureUrl: '',
                shoeBin: '',
            };
            this.setState(cleared);
        }

        // return <Redirect to="/shoes" />
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div id="alert">
                    <div></div>
                    </div>
                    <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new shoe</h1>
                        <form onSubmit={this.handleSubmit} id="create-shoe-form">
                        <div className="form-floating mb-3">
                            <input onChange={this.handleModelChange} value={this.state.model} placeholder="Model" required type="text" id="model" name="model" className="form-control"/>
                            <label htmlFor="name">Model</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={this.handleManufacturerChange} value={this.state.manufacturer} placeholder="Manufacturer" required type="text" id="manufacturer" name="manufacturer" className="form-control"/>
                            <label htmlFor="manufacturer">Manufacturer</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={this.handlePictureUrlChange} value={this.state.pictureUrl} placeholder="Picture Url" required type="text" id="pictureUrl" name="pictureUrl" className="form-control"/>
                            <label htmlFor="pictureUrl">Picture Url</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={this.handleShoeBinChange} value={this.state.shoeBin} required id="shoeBin" name="shoeBin" className="form-select">
                            <option value="">Choose a bin</option>
                            {this.state.shoeBins.map(shoeBin => {
                                return (
                                    <option key={shoeBin.id} value={shoeBin.id}>
                                        {shoeBin.closet_name} {shoeBin.bin_number}
                                    </option>
                                );
                            })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShoeForm;
