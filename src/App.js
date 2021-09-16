import React from "react";
import "./App.css";
import SingleDrink from "./SingleDrink";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			drinkList: [],
			userInput: "",
			singleDrink: {},
		};
		this.onInputChange = this.onInputChange.bind(this);
		this.onButtonClick = this.onButtonClick.bind(this);
		this.singleDrinkDetail = this.singleDrinkDetail(this);
	}

	componentDidMount() {}

	onInputChange(e) {
		this.setState({
			userInput: e.target.value,
		});
	}

	onButtonClick(e) {
		let drinkType = this.state.userInput;
		fetch(
			"https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + drinkType
		)
			.then((res) => res.json())
			.then((result) => {
				this.setState({
					drinkList: result.drinks,
				});
			});
	}

	singleDrinkDetail(e) {
		console.log("event", e);
		// this.setState({singleDrink:})
		// fetch("www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + id)
		// 	.then((res) => res.json())
		// 	.then((result) => {
		// 		this.setState({
		// 			singleDrink: result.drinks,
		// 		});
		// 	});
	}

	render() {
		console.log("this.state", this.state);

		let data = this.state.drinkList;
		let singleDrink = this.state.singleDrink;

		if (singleDrink.id) {
			return (
				<div>
					<SingleDrink drink={singleDrink} />;
				</div>
			);
		} else {
			if (data.length) {
				return (
					<div className="App">
						<input type="text" onChange={this.onInputChange} />
						<input
							type="button"
							value="Enter a drink"
							onClick={this.onButtonClick}
						/>
						<ul>
							{data.map((drink) => (
								<li
									key={drink.idDrink}
									onClick={() => this.singleDrinkDetail(drink.idDrink)}
								>
									{drink.strDrink}
									<img
										src={drink.strDrinkThumb}
										alt=""
										onClick={this.singleDrinkDetail}
									/>
								</li>
							))}
						</ul>
					</div>
				);
			} else {
				return (
					<div className="App">
						<input type="text" onChange={this.onInputChange} />
						<input
							type="button"
							value="Enter a drink"
							onClick={this.onButtonClick}
						/>
					</div>
				);
			}
		}
	}
}

export default App;
