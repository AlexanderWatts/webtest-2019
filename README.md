# CoInvestor Developer Test 2019

In this project I used JavaScript to make requests to the GitHub API and to handle the responses. I made use of features from ES6 including arrow functions and template literals.

## How to use

In order to see the data on the project board you will need to generate your own personal access token see: [Create a personal access token](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line). Please select the checkbox next to repo at stage seven when selecting the permissions. Once you have your token navigate to `js/api-key.js` where you will see the following code:
 
`const KEY = 'PLACE TOKEN HERE';`

Add your token to the string replacing `PLACE TOKEN HERE` then save the file and you are done :)

## Fetching data

To get the data I used the Fetch API instead of using `XMLHttpRequest` avoiding the pyramid of doom with functions like `then()` and reducing the amount of code needed to be written.

## Tools

Instead of using cURL to test each API request I used the application Postman which made it easier to visualise the responses and to set the request headers including authentication.