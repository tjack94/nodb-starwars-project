import React, { Component } from 'react';
import Button from './Button';
import axios from 'axios';

class DiscoverPlanet extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			climate: '',
			population: '',
			newPlanet: {},
			planetToEdit: {}
		};
    }
    componentWillReceiveProps(props){
            if(props.editPlanet){
                this.setState({
                    name: props.editPlanet.name,
                    climate: props.editPlanet.climate,
                    population: props.editPlanet.population
                })
            }else(this.setState({
                name: '',
			    climate: '',
			    population: '',
            }))
          
        }
    

	handleChange(event, name) {
		const value = event.target.value;
		this.setState({ [name]: value });
	}
	handleSubmit() {
		var newPlanet = {
			name: this.state.name,
			climate: this.state.climate,
            population: this.state.population
        }
        axios.post('/visited', newPlanet).then((response) => {
            console.log(response);
            this.props.visitPlanet(response);
            this.setState({
                name: '',
                climate: '',
                population: '',
                newPlanet: {}
            });
            this.props.hideForm()
        });
	}

	updatePlanet() {
		var editedPlanet = {
			name: this.state.name,
			climate: this.state.climate,
			population: this.state.population
		};
		this.setState(
			{
				planetToEdit: editedPlanet
			},
			() => {
				axios.patch(`/visited/` + this.props.planetIndex, this.state.planetToEdit).then((response) => {
					this.props.updatePlanet(response);
					this.setState({
						name: '',
						climate: '',
						population: '',
						newPlanet: {},
						planetToEdit: {}
					});
				});
			}
		);
	}
	render() {
        const editOrLog = this.props.editPlanet? "Edit" : "Log Discovery"
		return (
			<div className="new-planet-form">
				<input
					placeholder="Planet Name"
					type="text"
					onChange={(e) => this.handleChange(e, 'name')}
					value={this.state.name}
				/>
				<input
					placeholder="Climate"
					type="text"
					onChange={(e) => this.handleChange(e, 'climate')}
					value={this.state.climate}
				/>
				<input
					placeholder="Population"
					type="text"
					onChange={(e) => this.handleChange(e, 'population')}
					value={this.state.population}
				/>

				<Button className="log-button" onClick={this.props.editPlanet ? () => this.updatePlanet() : () => this.handleSubmit()}>
					{editOrLog}
				</Button>
			</div>
		);
	}
}
export default DiscoverPlanet;
