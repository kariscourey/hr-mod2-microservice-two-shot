import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticle } from "./api";

export default function Shoe() {
    let params = useParams();

    // declare state variable, shoe ... preserves values between function calls
    // equivalent to this.state
    // for this.state, inital state is an Object; here, doesn't have to be
    // useState() returns current state and a function that updates it
    // equivalent to this.state.shoe and this.setState in a class
    const [shoe, setShoe] = useState({});


    useEffect(() => {
        const shoe_data = getArticle("shoes", 8080, parseInt(params.shoeId, 10));
        setShoe(shoe_data);
    }, []);

    // console.log(shoe);

    return (

        <div>
        <p>Hello</p>
        {/* <button onClick={() => setShoe(getArticle("shoes", 8080, parseInt(params.shoeId, 10)))}>
            Click me
        </button> */}
    </div>


    );
    }

// import React from 'react';
// import { Link } from 'react-router-dom';

// class ShoeForm extends React.Component {
//     constructor(props) {
//         super(props)

//         let params = userParams();

//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     async componentDidMount() {
//         const url = 'http://localhost:8100/api/bins/';
//         const response = await fetch(url);

//         if (response.ok) {
//             const data = await response.json();
//             // console.log(data);
//             this.setState({shoeBins:data.bins});
//             // console.log(this.state.shoeBins);
//             }
//         }


//     async handleSubmit(event) {
//         event.preventDefault();

//         const articleUrl = `http://localhost:8080/api/shoes/1/`;
//         const fetchConfig = {
//             method: 'delete',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         };

//         const response = await fetch(articleUrl, fetchConfig);

//         if (response.ok) {
//             const newArticle = await response.json();
//             console.log(newArticle);

//             const cleared = {
//                 model: '',
//                 manufacturer: '',
//                 pictureUrl: '',
//                 shoeBin: '',
//             };
//             this.setState(cleared);
//         }
//     }

//     render() {
//         return (
//             <>
//                 <div className="container">
//                     <h2>{params.shoeId}</h2>
//                     shoe detail here
//                 </div>
//             </>

//         );
//     }
// }

// export default ShoeForm;
