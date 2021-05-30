import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Profile = styled.div`
	display: flex;
	margin-top: 2em;
	justify-content: space-around;
`;

const Pic = styled.div`
	margin-right: 2em;

`

const Details = styled.div`
	flex: 1;
	text-align: left;
`

const Button = styled.div`
	margin: 10px;
	padding: 5px;
	width: 25vw;
	border: 1px solid gray;
	border-radius: 10px;
	background-color: white;
	:hover {
		box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.24);
	}
`;

export default function Character(props) {
	const [character, setCharacter] = useState({});
	const id = props.location.props.id;

	console.log(props.location.props);
	useEffect(() => {
		axios.get(`https://rickandmortyapi.com/api/character/${id}`).then((res) => {
			setCharacter(res.data);
		});
	}, [id]);

	const { name, image, gender, location, origin, species, status } = character;

	return (
		<Wrapper>
			<h1>{name}</h1>
			<Profile>
				<Pic>
					<img src={image} alt={name} />
				</Pic>
				<Details >
					<h2>Character Details</h2>
					<div>
						<div>
							<span>Name:</span> {name}
						</div>
						<div>
							<span>Status:</span> {status}
						</div>
						<div>
							<span>Gender:</span> {gender}
						</div>
						<div>
							<span>Species:</span> {species}
						</div>
						<div>
							<span>Location:</span> {location?.name}
						</div>
						<div>
							<span>Originally From:</span> {origin?.name}
						</div>
					</div>
				</Details>
			</Profile>
			<NavLink to="/">
				<Button>Back to all characters</Button>
			</NavLink>
		</Wrapper>
	);
}
