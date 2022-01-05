import React from "react";
import Link from "next/link";
import Nav from "./Nav";

const About = (props) => {
	console.log("About page..");

	return (
		<div>
			<Nav />
			<p>This is About Page. </p>
		</div>
	);
};

export default About;
