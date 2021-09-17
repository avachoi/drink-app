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
		this.singleDrinkDetail = this.singleDrinkDetail.bind(this);
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

	singleDrinkDetail(id) {
		console.log("id", id);

		fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15300")
			.then((res) => res.json())
			.then((result) => {
				console.log("result", result);
				this.setState({
					singleDrink: result.drinks[0],
				});
			});
		console.log("this.state.singleDrink", this.state.singleDrink);
	}

	render() {
		let data = this.state.drinkList;
		let singleDrink = this.state.singleDrink;

		if (singleDrink.idDrink) {
			return (
				<div>
					<div>
						<SingleDrink drink={singleDrink} />
					</div>
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
						<ul className="drinks">
							{data.map((drink) => (
								// <SingleDrink
								//   singleDrink= {singleDrink}
								// />
								<div className="drinklist" key={drink.idDrink}>
									<li
										key={drink.idDrink}
										id={drink.idDrink}
										onClick={() => this.singleDrinkDetail(drink.idDrink)}
									>
										<div className="drinkName">{drink.strDrink}</div>
										<img src={drink.strDrinkThumb} alt="" />
									</li>
								</div>
							))}
						</ul>
					</div>
				);
			} else {
				return (
					<div className="ingredient-input">
						<input
							type="text"
							onChange={this.onInputChange}
							placeholder="ingredient"
						/>
						<input
							placeholder="ingredient"
							type="button"
							value="Enter"
							onClick={this.onButtonClick}
						/>
					</div>
				);
			}
		}
	}
}

export default App;
