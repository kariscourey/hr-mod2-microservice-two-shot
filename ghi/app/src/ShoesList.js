import React from 'react';

class ShoesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            shoes: [],
        };
    }

    async componentDidMount() {

        try {
            const response = await fetch(`http://localhost:8080/api/shoes/`);
            // console.log(response);

            if (response.ok) {
            const data = await response.json();
            // console.log(data.shoes);
            this.setState({shoes: data.shoes})
            } else {
            console.error(response);
            }

        } catch (e) {
            console.error(e);
        }

    }

    // console.log(props);
    // console.log(props.shoes);
    // console.log(props.shoes.then());

    // const shoes = loadData("shoes", 8080);
    // console.log(shoes);

    render() {
        return (
        <div>
            {this.state.shoes}
        </div>
    )
}
}

export default ShoesList;
