import React from "react";
import "./App.css";

const SingleDrink = (props) => {
	const drink = props.drink;
	console.log("props", drink);
	return (
		<div className="singleDrink-box">
			<div>Name {drink.strDrink}</div>
			<img src={drink.strDrinkThumb} />
			<div>{drink.strGlass}</div>
			<div>{drink.strInstructions}</div>
		</div>
	);
};

export default SingleDrink;

// let singleDrinkId= this.state.singleDrink;
//     fetch(
//       "www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + singleDrinkId
//     )
//     .then((res) => res.json())
//     .then((result)=>{
//       this.setState({
//         singleDrink: result.drinks
//       })
//     })

// class singleDrink extends React.Component{
//     render(){
//         const drink =
//         return(
//             <div>
//                 <div>{drink.name}</div>
//             </div>
//         )
//     }
// }
