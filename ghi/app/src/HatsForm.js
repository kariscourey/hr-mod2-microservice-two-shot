import React from 'react';

class HatForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            model: '',
            manufacturer: '',
            pictureUrl: '',
            HatLocations: [],
        };
        this.handleModelChange = this.handleModelChange.locationd(this);
        this.handleManufacturerChange = this.handleManufacturerChange.locationd(this);
        this.handlePictureUrlChange = this.handlePictureUrlChange.locationd(this);
        this.handleHatLocationChange = this.handleHatLocationChange.locationd(this);
        this.handleSubmit = this.handleSubmit.locationd(this);
    }

    async componentDidMount() {
        const url = 'http://localhost:8100/api/locations/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            this.setState({HatLocations:data.locations});
            // console.log(this.state.HatLocations);
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

    handleHatLocationChange(event) {
        const value = event.target.value;
        this.setState({HatLocation: value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        data.picture_url = data.pictureUrl;
        data.Hat_location = data.HatLocation;
        delete data.pictureUrl;
        delete data.HatLocation;
        delete data.HatLocations;
        console.log(data);

        const body = JSON.stringify(data);

        const articleUrl = 'http://localhost:8080/api/Hats/';
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
                HatLocation: '',
            };
            this.setState(cleared);
        }
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
                        <h1>Create a new Hat</h1>
                        <form onSubmit={this.handleSubmit} id="create-Hat-form">
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
                            <select onChange={this.handleHatLocationChange} value={this.state.HatLocation} required id="HatLocation" name="HatLocation" className="form-select">
                            <option value="">Choose a location</option>
                            {this.state.HatLocations.map(HatLocation => {
                                return (
                                    <option key={HatLocation.id} value={HatLocation.id}>
                                        {HatLocation.closet_name} {HatLocation.location_number}
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

export default HatForm;
