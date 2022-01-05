import { useEffect } from "react";
import Link from "next/link";

const Nav = (props) => {
	useEffect(() => {
		console.log("Nav Component..");
	}, []);

	return (
		<ul>
			<li>
				<Link href="/Home">
					<a>Home</a>
				</Link>
			</li>
			<li>
				<Link href="/About">
					<a>About Us</a>
				</Link>
			</li>
			<li>
				<Link href="/ProjectList">
					<a>Project List</a>
				</Link>
			</li>
		</ul>
	);
};

export default Nav;
