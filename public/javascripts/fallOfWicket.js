document.addEventListener('DOMContentLoaded', function () {
    // Add an event listener for the form submission on the next page
    document.getElementById('FallOfWicket').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Get the entered player names from the form
        let nextBatsmanName = document.getElementById('newBatsman').value;
        // Store the player names in local storage
        // Get the selected dismissal method from the dropdown
        let dismissalMethod = document.getElementById('dismissalMethod').value;
        let wicket = true;
        // let matchId = window.sessionStorage.getItem('matchId');
        window.sessionStorage.setItem('isWicFallen',wicket);
        window.sessionStorage.setItem('nextBatsmanName', nextBatsmanName);
        window.sessionStorage.setItem('dismissalMethod', dismissalMethod);
        
        console.log('Dismissal Method saved:', dismissalMethod);
        console.log('Batsman saved:', nextBatsmanName);
        alert('Player names submitted successfully!');
        setTimeout(() => {
const matchId = window.sessionStorage.getItem('matchId');
            if (!matchId) {
                alert('Match ID is missing. Cannot redirect to scorecard.');
                return;
            }
            window.location.href = `/scorecard/${matchId}`;
        }, 1000); // Adjust delay if necessary
        
        // Continue with your logic or page rendering
        
        
    });
});