import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const List = styled.div`
	list-style: none;
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
`;

const Card = styled.div`
	background-color: white;
	border: 1px solid #eee;
	cursor: pointer;
	margin-top: 10px;
	display: flex;
	align-items: center;
	flex-direction: column;

	:hover {
		box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.24);
	}
`;
const Buttons = styled.div`
	display: flex;
    justify-content: center;
`;

const Button = styled.div`
	margin: 10px;
	padding: 5px;
	width: 10vw;
	border: 1px solid gray;
	border-radius: 10px;
	background-color: white;
    cursor: pointer;
	:hover {
		box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.24);
	}
`;
export default function Main() {
	const [pages, setPages] = useState({});
	const [results, setResults] = useState([]);
	const defaultEndpoint = "https://rickandmortyapi.com/api/character/";
	const [page, setPage] = useState(1);
	const [next, setNext] = useState(defaultEndpoint);
	const [prev, setPrev] = useState(defaultEndpoint);
	const [endpoint, setEndpoint] = useState(defaultEndpoint);

	useEffect(() => {
		axios.get(defaultEndpoint).then((res) => {
			setPages(res.data.info.pages);
			setResults(res.data.results);
			console.log(res.data.info);
		});
	}, []);

	useEffect(() => {
		axios.get(next).then((res) => {
			setResults(res.data.results);
		});
	}, [next]);

	useEffect(() => {
		axios.get(prev).then((res) => {
			setResults(res.data.results);
		});
	}, [prev]);

	useEffect(() => {
		axios.get(endpoint).then((res) => {
			setResults(res.data.results);
		});
	}, [endpoint]);

	function nextPage() {
		if (page <= pages) {
			setNext(`https://rickandmortyapi.com/api/character/?page=${page + 1}`);
			return setPage(page + 1);
		} else {
			alert("end of pages");
		}
	}

	function prevPage() {
		if (page > 1) {
			setPrev(`https://rickandmortyapi.com/api/character/?page=${page - 1}`);
			return setPage(page - 1);
		} else {
			alert("u are on 1st page");
		}
	}

	function handleOnSubmitSearch(e) {
		e.preventDefault();
		const { currentTarget = {} } = e;
		const fields = Array.from(currentTarget?.elements);
		const fieldQuery = fields.find((field) => field.name === "query");
		const value = fieldQuery.value || "";
		setEndpoint(`https://rickandmortyapi.com/api/character/?name=${value}`);
	}

	return (
		<div>
			<form className="search" onSubmit={handleOnSubmitSearch}>
				<input name="query" type="search" />
				<button>Search</button>
			</form>

			{page >= 2 ? (
				<Buttons>
					<Button onClick={prevPage}>prev page</Button>
					<Button onClick={nextPage}>next page</Button>
				</Buttons>
			) : null}

			<List className="list">
				{results.map((character) => {
					const { id, name, image } = character;
					return (
						<NavLink
							to={{
								pathname: "/character",
								props: { id },
							}}
						>
							<Card key={id}>
								<img src={image} alt={{ name }} />
								<p>{name}</p>
							</Card>
						</NavLink>
					);
				})}
			</List>

			<Buttons>
				<Button onClick={prevPage}>prev page</Button>
				<Button onClick={nextPage}>next page</Button>
			</Buttons>
		</div>
	);
}
