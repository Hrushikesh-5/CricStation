document.addEventListener('DOMContentLoaded', function () {
    // Add an event listener for the form submission on the next page
    document.getElementById('playerNamesForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission behavior
// Retrieve the matchId from a global variable or directly from the EJS template
// Retrieve matchId from the global window object
const matchId = window.matchId;
// const matchId = "<%= matchId %>";
        // Get the entered player names from the form
        let strikerName = document.getElementById('striker').value;
        let nonStrikerName = document.getElementById('nonStriker').value;
        let bowlerName = document.getElementById('bowler').value;

        // Store the player names in local storage
        sessionStorage.setItem('strikerName', strikerName);
        sessionStorage.setItem('nonStrikerName', nonStrikerName);
        window.sessionStorage.setItem('bowlerName', bowlerName);
        console.log(window.sessionStorage.getItem('flag'));
            // window.location.href = '/scorecard';
            const matchIdFromScrecard = window.sessionStorage.getItem('matchId');
            if (!matchIdFromScrecard) {
                console.log('Match ID is missing. Cannot redirect to scorecard.');
                window.location.href = `/scorecard/${matchId}`;
               
            }else{
                window.location.href = `/scorecard/${matchIdFromScrecard}`;
            }
            
       
        // window.location.href = '/scorecard';
        // Redirect to scorecard
        // window.location.href = `/scorecard/${matchId}`;
        // Continue with your logic or page rendering
        alert('Player names submitted successfully!');
        
    });
});