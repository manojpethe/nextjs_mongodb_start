import React from "react";
import Link from "next/link";
import Nav from "./Nav";

const Home = (props) => {
	console.log("Home page..");

	return (
		<div>
			<Nav />
			<p>This is Home Page....</p>
		</div>
	);
};

export default Home;
