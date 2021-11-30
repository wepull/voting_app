import React, { Component } from 'react';
import { navigate } from '@reach/router';
import roost from './assets/roost.png';
import k3d from './assets/k3d.svg';
import kind from './assets/kind.png';
import minikube from './assets/minikube.png';
import docker from './assets/docker.png';
import kubernates from './assets/kubernates.png';
import './App.css';

const ballot_endpoint =
	process.env.REACT_APP_BALLOT_ENDPOINT ||
	window.env.ballotEndpoint ||
	'roost-controlplane:30080';
const candidates = ['roost', 'docker', 'minikube', 'kind', 'k3d'];

class Home extends Component {
	constructor(props) {
		super(props);
		// this.handleonCardClick = this.handleonCardClick.bind(this)
		this.state = {
			candidate_id: '',
			voter_id: '',
			disabled: false,
			view: 1,
			showResultsButton: false,
      showNotification: false
		};
	}

	componentDidMount() {
		let r = Math.random().toString(36).substring(7);
		this.setState({ voter_id: r });
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.candidate_id !== this.state.candidate_id) {
			const data = {
				candidate_id: this.state.candidate_id,
				vote: this.state.voter_id,
			};
			console.log('state: ', this.state);
			console.log('data for POST: ', data);
			console.log('ballot endpoint is: ', ballot_endpoint);
			if (ballot_endpoint === '') {
				console.error('ballot endpoint is not set');
			} else {
				fetch(`http://${ballot_endpoint}`, {
					method: 'POST',
					body: JSON.stringify(data),
				})
					.then((response) => response.json())
					.then((response) => {
						this.setState({ showResultsButton: true });
						console.log(response);
					})
					.catch((error) => {
						console.error(
							'ballot service is not reachable at http://' + ballot_endpoint
						);
					});
			}
		}
    if(prevState.showResultsButton !== this.state.showResultsButton){
      this.setState({showNotification: true})
      setTimeout(() =>{
        this.setState({showNotification: false})
      }, 3000)
    }
	}

	render() {
		const handleonCardClick = async (e) => {
			if (this.state.disabled === false) {
				let targetHtml = e.target.innerHTML;
				let targetElement = e.target;
				if (e.target.className === 'cardBackgroundContainer') {
					targetHtml = e.target.parentElement.children[1].innerHTML;
					targetElement = e.target.parentElement.children[1];
				} else if (
					e.target.className === 'cardBackground' ||
					e.target.className === 'cardBackgroundImage'
				) {
					targetHtml =
						e.target.parentElement.parentElement.children[1].innerHTML;
					targetElement = e.target.parentElement.parentElement.children[1];
				} else if (e.target.className === 'card') {
					targetHtml = e.target.children[1].innerHTML;
					targetElement = e.target.children[1];
				} else if (e.target.className === 'image') {
					targetHtml =
						e.target.parentElement.parentElement.parentElement.children[1]
							.innerHTML;
					targetElement =
						e.target.parentElement.parentElement.parentElement.children[1];
				}
				await this.setState({ candidate_id: targetElement.innerHTML });
				candidates.forEach((candidate) => {
					if (candidate === targetElement.innerHTML) {
						targetElement.parentElement.classList.add('selectedCard');
						this.setState({ disabled: true });
					}
				});
			}
		};
		const showResults = () => {
			navigate(`/result`);
		};
		const CustomCard = (candidate) => {
			return (
				<div className="card" onClick={(e) => handleonCardClick(e)}>
					<div className="cardBackgroundContainer">
						<div className="cardBackground"></div>
						<div className="cardBackgroundImage">
							{candidate === 'roost' ? (
								<img
									src={roost}
									width="150px"
									height="150px"
									className="image"
								/>
							) : null}
							{candidate === 'docker' ? (
								<img
									src={docker}
									width="150px"
									height="150px"
									className="image"
								/>
							) : null}
							{candidate === 'minikube' ? (
								<img
									src={minikube}
									width="150px"
									height="150px"
									className="image"
								/>
							) : null}
							{candidate === 'k3d' ? (
								<img src={k3d} width="150px" height="150px" className="image" />
							) : null}
							{candidate === 'kind' ? (
								<img
									src={kind}
									width="150px"
									height="150px"
									className="image"
								/>
							) : null}
						</div>
					</div>
					<div className="cardContent">{candidate}</div>
				</div>
			);
		};
		return (
			<div className="Home">
				<div className="logo">
					<img src={kubernates} width="70px" height="70px" />
				</div>
				<div className="heading">
					How do you create a K8S cluster on your local system ?
				</div>
				<div className="cardContainer">
					{candidates.map((candidate, index) => {
						return CustomCard(candidate, index);
					})}
				</div>
				{this.state.showResultsButton && (
					<div className="showResultsButton" onClick={() => showResults()}>
						Show Results
					</div>
				)}
        {this.state.showNotification && <div className="notificationPopup">
          <div className="closeNotification" onClick={() => this.setState({showNotification: false})}>x</div>
          <div className="notificationContent">Vote registered for {this.state.candidate_id}</div>
        </div>}
			</div>
		);
	}
}

export default Home;
