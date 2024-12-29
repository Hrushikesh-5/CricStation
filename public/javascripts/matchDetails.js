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
        sessionStorage.setItem('teamA', teamA);
        sessionStorage.setItem('teamB', teamB);
        sessionStorage.setItem('tossWonBy', tossWonBy);
        sessionStorage.setItem('optedTo', optedTo);
        sessionStorage.setItem('overs', overs);

//           // Send to server
//           const data = { teamA, teamB, tossWonBy, optedTo, overs };
//           try {
//               const response = await fetch('/saveGameDetails', {
//                   method: 'POST',
//                   headers: { 'Content-Type': 'application/json' },
//                   body: JSON.stringify(data),
//               });

//               if (response.ok) {
//                   console.log('Game details saved successfully!');
//                   alert('Game details saved successfully!');
//                   window.location.href = '/nextpage.js';
//               } else {
//                   console.error('Failed to save game details');
//               }
//           } catch (error) {
//               console.error('Error:', error);
//           }
//       });
//   });
 // Submit the form to the server
 event.target.submit();
        // Redirect to the next page
        // window.location.href = '/nextpage';
    });
});