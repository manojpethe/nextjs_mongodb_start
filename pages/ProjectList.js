import { useEffect, useState } from "react";
import Nav from "./Nav";

const ProjectList = () => {
	const [projects, set_projects] = useState([]);
	const [name, set_name] = useState("");
	const [description, set_description] = useState("");
	const [filter, set_filter] = useState(false);

	useEffect(() => {
		fetchProjectList();
	}, []);

	const fetchProjectList = (name, description) => {
		let suffix = "?";
		suffix += name ? "name=" + name : "";
		suffix += description ? "&description=" + description : "";

		if (!name && !description) {
			suffix = "";
		}

		fetch("http://localhost:3000/api/Project" + suffix)
			.then((response) => response.json())
			.then((data) => {
				set_projects(data);
				console.log(data);
			});
	};

	const handleCreate = () => {
		console.log(
			postData("http://localhost:3000/api/Project", { name, description })
		);
		setTimeout(() => {
			fetchProjectList();
		}, 2000);
	};

	async function postData(url = "", data = {}) {
		// Default options are marked with *
		const response = await fetch(url, {
			method: "POST", // *GET, POST, PUT, DELETE, etc.
			mode: "cors", // no-cors, *cors, same-origin
			cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
			credentials: "same-origin", // include, *same-origin, omit
			headers: {
				"Content-Type": "application/json",
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: "follow", // manual, *follow, error
			referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			body: JSON.stringify(data), // body data type must match "Content-Type" header
		});
		return response.json(); // parses JSON response into native JavaScript objects
	}

	return (
		<div>
			<Nav />
			<h2>List of Projects ({projects.length})</h2>
			<div>
				<form>
					<input
						type="text"
						name="name"
						id="name"
						value={name}
						onChange={(e) => {
							set_name(e.target.value);
						}}
						placeholder="Name"
					/>
					<input
						type="text"
						name="description"
						id="description"
						value={description}
						onChange={(e) => {
							set_description(e.target.value);
						}}
						placeholder="Description"
					/>
					<p />
					<input
						type="button"
						onClick={handleCreate}
						value="Create"
					/> &nbsp;{" "}
					<input type="button" onClick={fetchProjectList} value="Refresh" />
					&nbsp;
					<input
						type="button"
						onClick={() => {
							fetchProjectList(name, description);
						}}
						value="Apply Filter"
					/>
				</form>
			</div>

			{projects.map((item) => {
				return (
					<div key={item._id}>
						{item.name}: {item.description}{" "}
					</div>
				);
			})}
		</div>
	);
};

export default ProjectList;
