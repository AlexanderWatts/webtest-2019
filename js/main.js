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
 * Fetch the data for each of CoInvestors
 * projects
 */
function fetchProjects(url) {

	fetchData(url).then(res => {
		console.log(res);
	});

}

fetchProjects(url + 'repos/CoInvestor/webtest-2019/projects');