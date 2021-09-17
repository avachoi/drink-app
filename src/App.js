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

		fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + id)
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

		return (
			<div>
				<h1>Cocktail Picker</h1>
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

				{singleDrink.idDrink ? (
					<div>
						<div>
							<SingleDrink drink={singleDrink} />
						</div>
					</div>
				) : data.length ? (
					<div className="App">
						<ul className="drinks">
							{data.map((drink) => (
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
				) : (
					<div className="message">Pick a cocktail by it's ingredient!</div>
				)}
			</div>
		);
	}
}

export default App;
