/**
 * Goal:
 * Use the GitHub API to create a web page that combines 
 * all issues from CoInvestor's GitHub Project Boards.
 */

var url = 'https://api.github.com/';

/**
 * Set headers for authentication
 * and to define the media type
 */

var headers = new Headers();
headers.append('Authorization', `Basic ${KEY}`);
headers.append('Accept', 'application/vnd.github.inertia-preview+json'); 

/**
 * Define a template for fetching data
 * this makes the code more reusable.
 * Accepts a url and parses the response
 * as JSON.
 */

function fetchData(url) {

	return fetch(url, {headers:headers}).then(response => {
		return response.json();
	});

}

/**
 * Format the column name returned from the
 * API removing the whitespace and making
 * every character lowercase.
 * i.e In Progress to inprogress
 * This will determine which column a card
 * will go in matching the id name specified
 * in the HTML.
 */
function format(column_name) {
	return column_name.replace(/\s/g, '').toLowerCase();
}

/**
 * Create a card to be displayed on the project board
 */
function createCard(description, project_name, creator, creator_profile, date_created, column_name) {

	//Create card
	var card = `<div class="card">
		<h2>${description}</h2>
		<p>From project board: ${project_name}<p>
		<p><a href="${creator_profile}">${creator}</a><span class="date"> - ${date_created}</span></p>
	</div>`;

	//Get the correct column
	var column = document.getElementById(`${column_name}`);

	//Add card to the column
	column.innerHTML += card;

}

/**
 * Fetch the data for each of CoInvestors
 * projects
 */
function fetchProjects() {

	fetchData(url + 'repos/CoInvestor/webtest-2019/projects').then(response => {
		
		//Get the projects id and the name of the project board
		//Send results to fetchColumns function
		response.forEach(element => {
			fetchColumns(element.id, element.name);
		});

	});

}

/**
 * Fetch the columns in each project
 */
function fetchColumns(project_id, project_name) {

	fetchData(url + `projects/${project_id}/columns`).then(response => {

		//Get the projects column id and the name of 
		//the column it's in. Send the results to fetchCards
		//function
		response.forEach(element => {
			fetchCards(element.id, format(element.name), project_name);
		});

	});
}

/**
 * Fetch the cards in each column
 */
function fetchCards(column_id, column_name, project_name) {

	fetchData(url + `projects/columns/${column_id}/cards`).then(response => {

		//Get the card data and create a card adding it
		//to the HTML
		response.forEach(element => {
			createCard(element.note,
				project_name,  
				element.creator.login, 
				element.creator.html_url, 
				element.created_at, 
				column_name);
		});

	});

}

fetchProjects();