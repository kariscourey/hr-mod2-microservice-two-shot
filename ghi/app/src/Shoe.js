import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticle } from "./api";
import { Link, Outlet } from 'react-router-dom';


function refreshPage() {
    window.location.reload(false);
}

// OFI pass in article, id
// OFI place in actions, import
// redirect elsewhere after delete
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

export default function Shoe() {
    let params = useParams();

    // declare state variable, shoe ... preserves values between function calls
    // equivalent to this.state
    // for this.state, inital state is an Object; here, doesn't have to be
    // useState() returns current state and a function that updates it
    // equivalent to this.state.shoe and this.setState in a class
    const [shoe, setShoe] = useState(
        {
            color: "",
            id: 0,
            manufacturer: "",
            model: "",
            picture_url: "",
            shoe_bin: {},
        }
    );


    useEffect(() => {
        const fetchShoe = async () => {
            const shoeData = await getArticle("shoe", 8080, parseInt(params.shoeId, 10));
            console.log(shoeData);
            setShoe(shoeData);
        }
        fetchShoe();
    }, []);

    // console.log(shoe);

    return (

        <>
            <div className="card mb-3 shadow">
                <img src={shoe.picture_url} className="card-img-top" />
                <div className="card-body">
                <h5 className="card-title">{shoe.model}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                    {shoe.manufacturer}
                </h6>
                <p className="card-text">
                    {shoe.shoe_bin.closet_name} {shoe.shoe_bin.bin_number}
                </p>
                <button onClick={handleDelete} className="btn btn-outline-danger btn-sm" value={shoe.id} >Delete</button>
                {/* <Link to="#" class="btn btn-primary">Update</Link> */}
                </div>
            </div>
         </>


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
