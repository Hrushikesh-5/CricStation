document.addEventListener('DOMContentLoaded', function () {
    // Add an event listener for the form submission
    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Get the selected values from the form
        let teamA = document.getElementById('hostTeam').value;
        let teamB = document.getElementById('visitor').value;
        let tossed = document.querySelector('.toss input[name="radio"]:checked');
        let tossWonBy = tossed.value;
        let result = document.querySelector('.box3 input[name="batBowl"]:checked');
        let optedTo = result.value;
        let overs = document.getElementById('overs').value;

        // Store the selected values in local storage
        localStorage.setItem('teamA', teamA);
        localStorage.setItem('teamB', teamB);
        localStorage.setItem('tossWonBy', tossWonBy);
        localStorage.setItem('optedTo', optedTo);
        localStorage.setItem('overs', overs);

        // Redirect to the next page
        window.location.href = 'nextpage.html';
    });
});