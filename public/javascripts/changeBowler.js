document.addEventListener('DOMContentLoaded', function () {
    // Add an event listener for the form submission on the next page
    document.getElementById('changeBowlerForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Get the entered player names from the form
        let nextBowlerName = document.getElementById('nextBowlerName').value;
        // Store the player names in local storage
        window.sessionStorage.setItem('nextBowlerName', nextBowlerName);
        console.log('Bowler saved:', nextBowlerName);
        setTimeout(() => {
            // window.location.href = '/scorecard';
            const matchId = window.sessionStorage.getItem('matchId');
            if (!matchId) {
                alert('Match ID is missing. Cannot redirect to scorecard.');
                return;
            }
            window.location.href = `/scorecard/${matchId}`;
        }, 300); // Adjust delay if necessary
        
        // Continue with your logic or page rendering
        alert('Player names submitted successfully!');
        /*const bowlerNames = ['Bowler 1', 'Bowler 2', 'Bowler 3']; // Add actual bowler names here
        const datalist = document.getElementById('bowlerList');
        bowlerNames.forEach(bowler => {
        let option = document.createElement('option');
        option.value = bowler;
        datalist.appendChild(option);
    */
    });
});