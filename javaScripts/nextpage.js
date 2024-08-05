document.addEventListener('DOMContentLoaded', function () {
    // Add an event listener for the form submission on the next page
    document.getElementById('playerNamesForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Get the entered player names from the form
        let strikerName = document.getElementById('striker').value;
        let nonStrikerName = document.getElementById('nonStriker').value;
        let bowlerName = document.getElementById('bowler').value;

        // Store the player names in local storage
        localStorage.setItem('strikerName', strikerName);
        localStorage.setItem('nonStrikerName', nonStrikerName);
        localStorage.setItem('bowlerName', bowlerName);
        
        window.location.href = 'scorecard.html';
        // Continue with your logic or page rendering
        alert('Player names submitted successfully!');
        
    });
});