import React, { Component } from 'react';
import './App.css';
import DiscoverPlanet from './components/DiscoverPlanet';
import axios from 'axios';
import Button from './components/Button';
import Header from './components/Header';

class App extends Component {
	constructor() {
		super();
		this.state = {
			visited: [],
			planets: [],
			planet: null,
			planetIndex: -1,
			displayPlanets: false,
			displayForm: false,
			editPlanet: false,
		};
	}
	componentWillMount() {
		axios
			.get('/planets')
			.then((response) => {
				this.setState({
					planets: [ ...response.data ]
				});
			})
			.catch((err) => console.warn(err));
		axios
			.get('/visited')
			.then((response) => {
				this.setState({
					visited: [ ...response.data ]
				});
			})
			.catch((err) => console.warn(err));
	}
	discoverPlanet = (response) => {
		this.setState({ visited: [ ...response.data ] });
	};
	beginPlanetEdit(planet, index){
		this.setState( { editPlanet: true
		 }, ()=> this.editPlanet(planet, index)
		 )
	}
	editPlanet(planet, index) {
		this.setState({
			planet,
			planetIndex: index
		})
	
	}
	deletePlanet(index) {
		var visitedPlanets = this.state.visited;
		axios.delete('/visited/' + index).then(() => {
			visitedPlanets.splice(index, 1);
			this.setState({
				visited: visitedPlanets,
				planet: null,
				planetIndex: -1,
				
			});
		});
	}
	updatePlanet = (response) => {
		var editedPlanets = this.state.visited;
		const planetIndex = this.state.planetIndex;
		editedPlanets.splice(planetIndex, 1, response.data);
		this.setState({
			visited: editedPlanets,
			planet: null,
			planetIndex: -1,
			editPlanet: false
		});
	};
	visitPlanet(planet) {
		axios.post('/visited', planet).then((response) => {
			this.setState({ visited: [ ...response.data ] });
		});
	}
	getPlanets() {
		this.setState({ displayPlanets: true });
	}
	hidePlanets() {
		this.setState({ displayPlanets: false });
  }
  showNewPlanetForm(){
    this.setState({ displayForm: true })
  }
hideNewPlanetForm(){
  this.setState( { displayForm: false } )
}
	render() {
		const planetList = this.state.displayPlanets
			? this.state.planets.map((planet, index) => (
					<p className="planet-boxes" key={index} onClick={() => this.visitPlanet(planet)}>
						{planet.name}
					</p>
				))
			: '';

		const visitedPlanetsList = this.state.visited.map((planet, index) => (
			<p className="visited-planets" key={index} onClick={() => this.beginPlanetEdit(planet, index)}>
				<Button className="delete-button" onClick={() => this.deletePlanet(index)}>
					X
				</Button>
				<br />
				<span> Name: </span>
				{planet.name}
				<br />
				<span>Climate: </span> {planet.climate}
				<br />
				<span>Population: </span> {planet.population}
			</p>
		));
		const HideButton =
			this.state.displayPlanets === false ? (
				''
			) : (
				<Button className="hide-button" onClick={() => this.hidePlanets()}>
					Hide
				</Button>
			);
		const GetPlanetsButton =
			HideButton === '' ? (
				<Button className="get-known-planets" onClick={() => this.getPlanets()}>
					Add Known Planets
				</Button>
			) : (
				''
			);
		const newOrEdit = this.state.planet ? <h3>Edit Planet</h3> : <h3>Log New Planet Discovery</h3>;
		const showForm =
			this.state.editPlanet || this.state.displayForm ? (
				<DiscoverPlanet
					visitPlanet={this.discoverPlanet}
					editPlanet={this.state.planet}
					planetIndex={this.state.planetIndex}
          			updatePlanet={this.updatePlanet}
          			hideForm= {()=>this.hideNewPlanetForm()}
				/>
			) : (
				''
      );
      const discoverButton = showForm === ""? <Button className="show-planet-form" onClick={()=> this.showNewPlanetForm()}>Log Discovery of New Planet</Button> : ""
		return (
			<div className="App">
				<Header>My Travels in a Galaxy Far Far Away...</Header>
				{showForm}
		<div className="button-container">
		{discoverButton}
       

				{GetPlanetsButton}
				</div>
				<div>{HideButton}</div>
				<div className="planet-list">{planetList}</div>
				<h2>Planets I have visited:</h2>
				<div className="visited-list">{visitedPlanetsList}</div>
			</div>
		);
	}
}

export default App;
