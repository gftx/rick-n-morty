import React from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";
import Character from "./components/character";
import Main from "./components/main";

const Wrapper = styled.div`
	width: 62vw;
	margin: 0 auto;
	text-align: center;
`;

const Header = styled.div`
	margin: 2rem;
	font-size: 30px;
`;

export default function App() {
	return (
		<Wrapper>
			<Header>wabbu labbu dub dub</Header>
			<p>this is Rick and Morty characters wiki</p>
			<p>and its made on ReactJS</p>

			<Route path="/" exact component={Main} />
			<Route path="/character" exact component={Character} />
		</Wrapper>
	);
}
