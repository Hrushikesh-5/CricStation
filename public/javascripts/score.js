console.log(window.sessionStorage.getItem('bowlersRuns'));
console.log(window.sessionStorage.getItem('bowlerNames'));
let isWicketFallen = sessionStorage.getItem('isWicFallen') === 'true';
console.log(isWicketFallen);
window.addEventListener('beforeunload', savePreviousStatsToStorage);
const dismissalMethod = window.sessionStorage.getItem('dismissalMethod');
const matchId = window.matchId;  // matchId is now available here
console.log(matchId);
if (isWicketFallen) {
    // Get current striker's stats
    const strikersName = window.sessionStorage.getItem('strikerName');
    const nonStrikersName = window.sessionStorage.getItem('nonStrikerName');
    const newBatsmanName = sessionStorage.getItem('nextBatsmanName');
    const strikerRun = window.sessionStorage.getItem('strkScore');
    const strikerBall = window.sessionStorage.getItem('strkBalls');
    const nonStrikersScore = parseInt(sessionStorage.getItem('nonStrkScore'));
    const nonStrikerBall = parseInt(sessionStorage.getItem('nonStrkBalls'));
    let isStriker = window.sessionStorage.getItem('isStriker') === 'true'

    if (isStriker) {
        const dismissedStrikersData = {
            name: strikersName, // Current striker
            runs: strikerRun,
            balls: strikerBall,
            howOut: dismissalMethod,
        };
        saveBatsmanDataToDB(dismissedStrikersData);
    } else {
        const dismissedNonStrikersData = {
            name: nonStrikersName, // Current striker
            runs: nonStrikersScore,
            balls: nonStrikerBall,
            howOut: dismissalMethod,
        };
        saveBatsmanDataToDB(dismissedNonStrikersData);
    }

    // Save the next batsman's data
    const nextBatsmanData = {
        name: newBatsmanName,
        runs: 0,  // Next batsman starts with 0 runs
        balls: 0,  // Next batsman starts with 0 balls
        howOut: null,  // Not out
    };

    // Save to the database
    // saveBatsmanDataToDB(dismissedBatsmanData);
    saveBatsmanDataToDB(nextBatsmanData);

    // Optional: Reset sessionStorage for next batsman
    // window.sessionStorage.removeItem('nextBatsmanName');
    // window.sessionStorage.removeItem('dismissalMethod');
}
//-----------STARTING OF BOWLER'S INITIALIZATION----------------------------------//
let bowlerOvers = JSON.parse(window.sessionStorage.getItem('bowlersOvers')) || [];

// If sessionStorage didn't have a value, initialize it as an empty array and push 0
if (bowlerOvers.length === 0) {
    bowlerOvers.push(0);
}
// For bowlersMaiden
let bowlersMaiden = JSON.parse(window.sessionStorage.getItem('bowlersMaiden')) || [];
if (bowlersMaiden.length === 0) {
    bowlersMaiden.push(0);
}
// For bowlersRuns
let bowlersRuns = JSON.parse(window.sessionStorage.getItem('bowlersRuns')) || [];
if (bowlersRuns.length === 0) {
    bowlersRuns.push(0);
}
// For bowlersWickets
let bowlersWickets = JSON.parse(window.sessionStorage.getItem('bowlersWickets')) || [];
if (bowlersWickets.length === 0) {
    bowlersWickets.push(0);
}

let thisOverRuns = JSON.parse(window.sessionStorage.getItem('thisOverRuns')) || [];

let bowlerInfoIndex = parseInt(window.sessionStorage.getItem('bowlerInfoIndex')) ? (window.sessionStorage.getItem('bowlerInfoIndex')) : 0;
let bowlerName = window.sessionStorage.getItem('bowlerName');
let bowlerNames = JSON.parse(window.sessionStorage.getItem('bowlerNames')) || [];
let nextBowlerName = window.sessionStorage.getItem('nextBowlerName');
console.log("nextbowlerName " + nextBowlerName);
if (isWicketFallen) {

    let individualBwlMaidens = document.getElementById('individualBwlMaidens');
    let individualBwlOvers = document.getElementById('bwlOver');
    let [over, ball] = individualBwlOvers.innerText.split('.');
    let individualBwlWickets = document.getElementById('individualBwlWickets');
    let individualBwlRuns = document.getElementById('individualBwlRuns');
    individualBwlOvers.innerText = bowlerOvers[bowlerInfoIndex];
    individualBwlRuns.innerText = bowlersRuns[bowlerInfoIndex];
    individualBwlWickets.innerText = bowlersWickets[bowlerInfoIndex];
    individualBwlMaidens.innerText = bowlersMaiden[bowlerInfoIndex];
}
if (nextBowlerName) {
    console.log('Retrieved bowler:', nextBowlerName);
    bowlerName = nextBowlerName;
    changeBowler();
} else if (isWicketFallen) {
    let indvidualBwlName = document.getElementById('bwlName');
    indvidualBwlName.innerText = bowlerName;

} else {
    let indvidualBwlName = document.getElementById('bwlName');
    indvidualBwlName.innerText = bowlerName;
    let flag = false;
    for (let i = 0; i < bowlerNames.length; i++) {
        if (bowlerNames[i] === bowlerName) {
            flag = true;
            // bowlerInfoIndex = i;
            break;
        } else {
            flag = false;
        }
    }
    if (flag === false) {
        bowlerNames.push(bowlerName);
    }
    changeBowler();
}

//-----------ENDING OF BOWLER'S INITIALIZATION----------------------------------//

//-----------STARTING OF BATSMAN'S INITIALIZATION----------------------------------//
let strikerName = window.sessionStorage.getItem('strikerName');
let nonStrikerName = window.sessionStorage.getItem('nonStrikerName');
let strikerScore = sessionStorage.getItem('strkScore') ? parseInt(sessionStorage.getItem('strkScore')) : 0;
let strikerBalls = sessionStorage.getItem('strkBalls') ? parseInt(sessionStorage.getItem('strkBalls')) : 0;
let nonStrikerScore = sessionStorage.getItem('nonStrkScore') ? parseInt(sessionStorage.getItem('nonStrkScore')) : 0;
let nonStrikerBalls = sessionStorage.getItem('nonStrkBalls') ? parseInt(sessionStorage.getItem('nonStrkBalls')) : 0;
let arr = JSON.parse(sessionStorage.getItem('thisOverArr')) || [];
let wdArr = JSON.parse(sessionStorage.getItem('thisOverWdArr')) || [];
let isStriker = window.sessionStorage.getItem('isStriker') ? (sessionStorage.getItem('isStriker')) === 'true' : true;  // Keep track of who is on strike-->

let sName = document.getElementById('sName');
let nsName = document.getElementById('nsName');
let sScore = document.getElementById('strikerScore');
let nsScore = document.getElementById('nonStrikerScore');

if (!sName || !nsName || !sScore || !nsScore) {
    console.error("One or more elements are missing in the HTML. Check element IDs.");
    // Exit if elements are not found
} else {

    if (isWicketFallen) {
        let newBatsmanName = sessionStorage.getItem('nextBatsmanName'); // New batsman's name
        console.log("New Batsman Name:", newBatsmanName);
        if (isStriker) {
            // Replace striker with new batsman
            strikerName = newBatsmanName;
            strikerScore = 0;
            strikerBalls = 0;
            sName.innerText = strikerName + "*";
            nsName.innerText = nonStrikerName;
            window.sessionStorage.setItem('strikerName', strikerName);
        } else {
            // Replace non-striker with new batsman
            nonStrikerName = newBatsmanName;
            nonStrikerScore = 0;
            nonStrikerBalls = 0;
            sName.innerText = strikerName;
            nsName.innerText = nonStrikerName + "*";
            window.sessionStorage.setItem('nonStrikerName', nonStrikerName);
        }
        // Update score displays
        sScore.innerText = `${strikerScore}(${strikerBalls})`;
        nsScore.innerText = `${nonStrikerScore}(${nonStrikerBalls})`;

        // Debug: Check final state

    } else {
        // Display current batsmen if no wicket has fallen
        sName.innerText = strikerName;
        nsName.innerText = nonStrikerName;
        sScore.innerText = `${strikerScore}(${strikerBalls})`;
        nsScore.innerText = `${nonStrikerScore}(${nonStrikerBalls})`;
    }
}
//-----------ENDING OF BATSMAN'S INITIALIZATION----------------------------------//

let teamA = window.sessionStorage.getItem('teamA');
let teamB = window.sessionStorage.getItem('teamB');
let choice = window.sessionStorage.getItem('optedTo');
let heading = document.getElementById('h1');
let secondIng = document.getElementById('second-ing');
let toss = window.sessionStorage.getItem('tossWonBy');
let count = 0;
let CurrRunRate = document.getElementById('CRR');
let ProjectedScore = document.getElementById("PrjScr");

// Get the parent div element
const thisOver = document.getElementById('thisOver');

let scoreHeader = document.querySelector('h1');

document.addEventListener('DOMContentLoaded', function () {
    let thisOver = document.getElementById('thisOver'); // Ensure this element exists

    if (!thisOver) {
        console.error("Timeline container (thisOver) is still not found. Double-check the HTML element ID.");
        return;
    }
    restoreTimelineState(thisOver);
});
window.onload = function () {

    CurrRunRate.innerText = window.sessionStorage.getItem('currRunRate') ? (sessionStorage.getItem('currRunRate')) : "CRR:0";
    ProjectedScore.innerText = window.sessionStorage.getItem('projScore') ? (sessionStorage.getItem('projScore')) : "Projected Score:0";
    document.getElementById('ballToBall').value = window.sessionStorage.getItem('ballToBall') ? (window.sessionStorage.getItem('ballToBall')) : "0.0";
    scoreHeader.innerText = window.sessionStorage.getItem('headingText') ? (window.sessionStorage.getItem('headingText')) : "0/0";
    sScore.innerText = `${strikerScore}(${strikerBalls})`;
    nsScore.innerText = `${nonStrikerScore}(${nonStrikerBalls})`;
    CurrRunRate.innerText = window.sessionStorage.getItem('currRunRate') ? (sessionStorage.getItem('currRunRate')) : "CRR:0";
    ProjectedScore.innerText = window.sessionStorage.getItem('projScore') ? (sessionStorage.getItem('projScore')) : "Projected Score:0";
    document.getElementById('ballToBall').value = window.sessionStorage.getItem('ballToBall') ? (window.sessionStorage.getItem('ballToBall')) : "0.0";
    // scoreHeader.innerText = window.sessionStorage.getItem('headingText') ? (window.sessionStorage.getItem('headingText')) : "0/0";
    // Call this on page load
    loadPreviousStatsFromStorage();
};

let [runningOver, runningOverBall] = ballToBall.value.split('.');
if (isWicketFallen && runningOverBall === '0') {
    setTimeout(() => {
        let startNextOver = prompt("Start Next Over?", "answer in yes OR no");

        if (startNextOver.toLowerCase() === "yes") {
            // Redirect to changeBowler.html to select the bowler
            window.location.href = '/changeBowler';
        }
    }, 500);
}
// Add the bowler input code here
// const bowlerInputContainer = document.getElementById('bowlerInputContainer');
// const bowlerInput = document.getElementById('bowlerInput');
// const bowlerList = document.getElementById('bowlerList');
// const submitBowlerName = document.getElementById('submitBowlerName');

function populateBowlerList() {
    bowlerList.innerHTML = '';
    bowlerNames.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        bowlerList.appendChild(option);
    });
}

function showBowlerInput(bowlerInfoIndex) {
    bowlerInputContainer.style.display = 'block';
    populateBowlerList();

    submitBowlerName.onclick = function () {
        const newBowlerName = bowlerInput.value;
        if (newBowlerName) {
            bowlerName = newBowlerName;
            bowlerNames.push(bowlerName);
            bowlerInfoIndex = changeBowler(bowlerInfoIndex);
            bowlerInputContainer.style.display = 'none';
        }
    }
}
// Get all child div elements
// const thisOverChildDivs = thisOver.querySelectorAll('div');
function whoToBat() {
    //**  updateBatterDisplay();-->JUST CHANGED

    if (toss === 'host') {
        if (choice === 'bat') {
            heading.textContent = teamA;
        } else {
            heading.textContent = teamB;
        }
    } else if (toss === 'visit') {
        if (choice === 'bat') {
            heading.textContent = teamB;
        } else {
            heading.textContent = teamA;
        }
    }
    updateStrike();//-JUST CHANGED
}

// Call the function to set the heading when the page loads
reset = () => {
    document.querySelector('h1').innerText = "0/0";
    document.querySelector('#ballToBall').value = "0.0";
    let target = document.querySelector('h2');
    target.innerText = "target:" + localStorage.getItem('totalScore');
    target.style.display = "block";
    isStriker = true;
    updateStrike();//JUST CHANGED
}
secondInnings = () => {
    if (heading.innerText === teamA) {
        heading.innerText = teamB;
        reset();
        return;
    } else {
        heading.innerText = teamA;
        reset();
        return;
    }
}
function insertWideInThisOver(thisOver) {
    let div = document.createElement("div");
    div.textContent = "Wd";
    div.style.height = "40px";
    div.style.width = "40px";
    div.style.borderRadius = "50%";
    div.style.border = "1px solid black";
    div.style.backgroundColor = "#bef264";
    div.style.padding = "0.1rem 0.6rem";
    div.style.fontSize = "1rem";
    div.style.display = "block";
    div.style.fontWeight = "bold";
    thisOver.appendChild(div);

}
function insertRunsOrWicInThisOver(arr, b, thisOver) {
    let div = document.createElement("div");
    div.textContent = arr[b];
    div.style.height = "40px";
    div.style.width = "40px";
    div.style.borderRadius = "50%";
    div.style.border = "1px solid black";
    div.style.backgroundColor = "#bef264";
    div.style.padding = "0.1rem 0.6rem";
    div.style.fontSize = "1.9rem";
    div.style.display = "block";
    thisOver.appendChild(div);
}
function thisOverUpdation(b, thisOver, arr, wd) {
    if (b > 4) {
        if (wd) {
            insertWideInThisOver(thisOver);
        } else {
            insertRunsOrWicInThisOver(arr, b, thisOver);
            setTimeout(function () {//temporary until nextOver Feature is added
                let childDivs = thisOver.querySelectorAll('div');
                for (let i = 0; i < childDivs.length; i++) {
                    let divDisappear = childDivs[i];
                    divDisappear.remove(); // Remove the div element
                }
                // Clear the array as part of the cleanup
                arr.length = 0;
                sessionStorage.removeItem('thisOverArr');
                sessionStorage.removeItem('thisOverWdArr');
            }, 2000)

        }
    } else {
        if (wd) {
            insertWideInThisOver(thisOver);

        } else {
            insertRunsOrWicInThisOver(arr, b, thisOver);
        }
    }
}

function run(runs, wic = false) {
    let [crrText, crr] = CurrRunRate.innerText.split(':');
    let [ProjScrText, ProjectedSrc] = ProjectedScore.innerText.split(':');
    let heading = document.querySelector('h1');
    let [score, wicket] = heading.innerText.split('/');
    let ballToBall = document.getElementById('ballToBall')
    let [a, b] = ballToBall.value.split('.');
    let OverToOver = document.getElementById('overToOver');
    let totalOvers = OverToOver.value.split('/')[1];
    // isWicketFallen = false;
    window.sessionStorage.setItem('isWicFallen', false);
    if (wicket < 10) {

        if (ballToBall.value === '5.0') {
            if (count === 0) {
                secondIng.style.display = "block";
                totalScore = heading.innerText.split('/')[0];
                window.localStorage.setItem('totalScore', totalScore)
                count++;
                return;
            }

            else {
                return;
            }

        }
        else {
            if (b > 4) {
                ballToBall.value = eval(Number(ballToBall.value) + (0.5)).toFixed(1);

                setTimeout(() => {
                    console.log(heading.innerText);
                    // rplaced the code written in the savetosession storage function with storage function it self
                    saveToSessionStorage(heading);
                    saveScoreToDatabase(teamA, matchId);
                    //   window.sessionStorage.setItem('thisOverRuns', JSON.stringify(thisOverRuns));
                }, 200);

                // Now redirect to changeBowler.html
                setTimeout(() => {
                    let startNextOver = prompt("Start Next Over?", "answer in yes OR no");

                    if (startNextOver.toLowerCase() === "yes") {
                        // Redirect to changeBowler.html to select the bowler
                        window.location.href = '/changeBowler';
                    }
                }, 500);
            }
            else {
                ballToBall.value = eval(Number(ballToBall.value) + (0.1)).toFixed(1);
            }
        }

        if (!wic) {
            let wic = false;
            let wd = false;

            updateBwlOvers(wic, wd, runs, bowlersWickets, bowlersMaiden, bowlersRuns, bowlerOvers, thisOverRuns, bowlerInfoIndex);
            heading.innerText = (eval(Number(score) + Number(runs)) + "/" + wicket);

            //code for updation of current run rate.
            let totalBalls = ((Number(a) * 6) + Number(b) + 1) / 6;
            crr = (Number(score) + Number(runs)) / totalBalls;
            CurrRunRate.innerText = crrText + ":" + crr.toFixed(2);

            //code for updation of projected score.
            ProjectedSrc = (Number(crr.toFixed(2)) * Number(totalOvers));
            ProjectedScore.innerText = ProjScrText + ":" + ProjectedSrc.toFixed(0);

            //code for strike change and updating runs of individual batsmans
            if ((isStriker) && (runs % 2 === 1)) {
                strikerScore += Number(runs);
                sessionStorage.setItem('strkScore', strikerScore);
                strikerBalls++;
                sessionStorage.setItem('strkBalls', strikerBalls);
                sScore.innerText = `${strikerScore}(${strikerBalls})`;
                changeStrike();

            } else if ((isStriker === false) && (runs % 2 == 1)) {
                nonStrikerScore += Number(runs);
                sessionStorage.setItem('nonStrkScore', nonStrikerScore);
                nonStrikerBalls++;
                sessionStorage.setItem('nonStrkBalls', nonStrikerBalls);
                nsScore.innerText = `${nonStrikerScore}(${nonStrikerBalls})`;
                changeStrike();

            } else if ((isStriker === false) && (runs % 2 == 0)) {
                nonStrikerScore += Number(runs);
                sessionStorage.setItem('nonStrkScore', nonStrikerScore);
                nonStrikerBalls++;
                sessionStorage.setItem('nonStrkBalls', nonStrikerBalls);
                nsScore.innerText = `${nonStrikerScore}(${nonStrikerBalls})`;

            } else if ((isStriker) && (runs % 2 == 0)) {
                strikerScore += Number(runs);
                window.sessionStorage.setItem('strkScore', strikerScore);
                strikerBalls++;
                sessionStorage.setItem('strkBalls', strikerBalls);
                sScore.innerText = `${strikerScore}(${strikerBalls})`;
            }
            arr.push(Number(runs));
            wdArr.push(0);
            thisOverUpdation(b, thisOver, arr);
            window.sessionStorage.setItem('thisOverRuns', JSON.stringify(thisOverRuns));
            saveToSessionStorage(heading);
            saveTimelineState(arr);
            saveBowlerDataToDB();
            saveScoreToDatabase(teamA, matchId) ;
        }//}
        else {
            let wic = true;
            let wd = false;
            heading.innerText = score + '/' + (eval(Number(wicket) + Number(runs)))

            //for updation of current run rate when wicket is fallen.
            let totalBalls = ((Number(a) * 6) + Number(b) + 1) / 6;
            crr = (Number(score)) / totalBalls;
            CurrRunRate.innerText = crrText + ":" + crr.toFixed(2);
            arr.push("W");
            wdArr.push(0);
            thisOverUpdation(b, thisOver, arr);
            updateBwlOvers(wic, wd, runs, bowlersWickets, bowlersMaiden, bowlersRuns, bowlerOvers, thisOverRuns, bowlerInfoIndex);
            saveBowlerDataToDB();
            setTimeout(() => {
                window.sessionStorage.setItem('thisOverRuns', JSON.stringify(thisOverRuns));
                //rplaced the code written in the savetosession storage function with storage function it self
                saveToSessionStorage(heading);
                saveScoreToDatabase(teamA, matchId);
                saveTimelineState(arr);
            }, 200);

            setTimeout(() => {
                window.location.href = '/FallOfWicket';

            }, 1000);
        }

    }
    else {
        if (count === 0) {
            secondIng.style.display = "block";
            totalScore = heading.innerText.split('/')[0];
            window.localStorage.setItem('totalScore', totalScore)
            count++;
            alert("No More Wickets Left");
            return;
        }
        // alert("No More Wickets Left");

    }

}
let wideCount = 0;
function wide(runs) {
    let wd = true;
    let wic = false;
    let ballToBall = document.getElementById('ballToBall')
    let [a, b] = ballToBall.value.split('.');
    let OverToOver = document.getElementById('overToOver');
    let totalOvers = OverToOver.value.split('/')[1];
    let [crrText, crr] = CurrRunRate.innerText.split(':');
    let [ProjScrText, ProjectedSrc] = ProjectedScore.innerText.split(':');
    let heading = document.querySelector('h1');
    let [score, wicket] = heading.innerText.split('/');
    totalScore = heading.innerText.split('/')[0];
    window.localStorage.setItem('totalScore', totalScore)
    heading.innerText = (eval(Number(score) + Number(runs)) + "/" + wicket)
    wideCount++;
    let wides = document.querySelector('h3');
    wides.innerText = wideCount;
    let totalBalls = ((Number(a) * 6) + Number(b) + 1) / 6;
    crr = (Number(score) + Number(runs)) / totalBalls;
    CurrRunRate.innerText = crrText + ":" + crr.toFixed(2);
    ProjectedSrc = (Number(crr.toFixed(2)) * Number(totalOvers));
    ProjectedScore.innerText = ProjScrText + ":" + ProjectedSrc.toFixed(0);
    thisOverUpdation(b, thisOver, arr, wd);
    updateBwlOvers(wic, wd, runs, bowlersWickets, bowlersMaiden, bowlersRuns, bowlerOvers, thisOverRuns, bowlerInfoIndex);
    wdArr.push("Wd");
    saveBowlerDataToDB();
    window.sessionStorage.setItem('thisOverRuns', JSON.stringify(thisOverRuns));
    saveToSessionStorage(heading);
    saveTimelineState(arr);
    saveScoreToDatabase(teamA, matchId);
}
function changeStrike() {
    isStriker = !isStriker;
    updateStrike();
}

function updateStrike() {
    sName = document.getElementById('sName');
    nsName = document.getElementById('nsName');

    if (isStriker) {
        sName.innerText = strikerName + "*";
        nsName.innerText = nonStrikerName;
    } else {
        sName.innerText = strikerName;
        nsName.innerText = nonStrikerName + "*";
    }
}

whoToBat();


secondIng.addEventListener('click', () => {
    secondInnings();
    secondIng.style.display = "none"


})

function updateBwlOvers(wic, wd, runs, bowlersWickets, bowlersMaiden, bowlersRuns, bowlersOvers, thisOverRuns, bowlerInfoIndex) {

    let individualBwlMaidens = document.getElementById('individualBwlMaidens');
    let individualBwlOvers = document.getElementById('bwlOver');
    let [over, ball] = individualBwlOvers.innerText.split('.');
    let individualBwlWickets = document.getElementById('individualBwlWickets');
    let individualBwlRuns = document.getElementById('individualBwlRuns');

    if (ball > 4) {
        if (wic) {
            thisOverRuns.push(0);
            bowlersWickets[bowlerInfoIndex] = bowlersWickets[bowlerInfoIndex] + 1;
            individualBwlWickets.innerText = bowlersWickets[bowlerInfoIndex];
            bowlersOvers[bowlerInfoIndex] = Number(eval(Number(individualBwlOvers.innerText) + (0.5)).toFixed(1));
            individualBwlOvers.innerText = bowlersOvers[bowlerInfoIndex];
            thisOverRuns.push(0);

            checkMaiden(thisOverRuns, individualBwlMaidens, bowlerInfoIndex, bowlersMaiden);

        } else if (wd) {
            bowlersRuns[bowlerInfoIndex] = bowlersRuns[bowlerInfoIndex] + Number(runs);
            individualBwlRuns.innerText = bowlersRuns[bowlerInfoIndex];
            thisOverRuns.push(Number(runs));

            checkMaiden(thisOverRuns, individualBwlMaidens, bowlerInfoIndex, bowlersMaiden);

        } else {
            thisOverRuns.push(Number(runs));
            bowlersRuns[bowlerInfoIndex] = Number(bowlersRuns[bowlerInfoIndex]) + Number(runs);
            individualBwlRuns.innerText = bowlersRuns[bowlerInfoIndex];
            bowlersOvers[bowlerInfoIndex] = eval(Number(individualBwlOvers.innerText) + (0.5)).toFixed(1);

            checkMaiden(thisOverRuns, individualBwlMaidens, bowlerInfoIndex, bowlersMaiden);

            individualBwlOvers.innerText = Number(bowlersOvers[bowlerInfoIndex]);

        }

    } else {
        if (wic) {

            thisOverRuns.push(0);
            bowlersWickets[bowlerInfoIndex] = bowlersWickets[bowlerInfoIndex] + 1;
            individualBwlWickets.innerText = bowlersWickets[bowlerInfoIndex];
            bowlersOvers[bowlerInfoIndex] = Number(eval(Number(individualBwlOvers.innerText) + (0.1)).toFixed(1));
            individualBwlOvers.innerText = bowlersOvers[bowlerInfoIndex];

        } else if (wd) {

            thisOverRuns.push(Number(runs));
            bowlersRuns[bowlerInfoIndex] = bowlersRuns[bowlerInfoIndex] + Number(runs);
            individualBwlRuns.innerText = bowlersRuns[bowlerInfoIndex];

        } else {

            thisOverRuns.push(Number(runs));
            bowlersRuns[bowlerInfoIndex] = Number(bowlersRuns[bowlerInfoIndex]) + Number(runs);
            individualBwlRuns.innerText = bowlersRuns[bowlerInfoIndex];
            bowlersOvers[bowlerInfoIndex] = Number(eval(Number(individualBwlOvers.innerText) + (0.1)).toFixed(1));
            individualBwlOvers.innerText = bowlersOvers[bowlerInfoIndex];
            console.log(bowlerInfoIndex);

        }

    }
}
function changeBowler() {
    let individualBwlMaidens = document.getElementById('individualBwlMaidens');
    let individualBwlOvers = document.getElementById('bwlOver');
    let individualBwlWickets = document.getElementById('individualBwlWickets');
    let individualBwlRuns = document.getElementById('individualBwlRuns');
    let individualBwlName = document.getElementById('bwlName');
    // let bowlerInfoIndex = -1;
    let flag = false;
    for (let i = 0; i < bowlerNames.length; i++) {
        if (bowlerNames[i] === bowlerName) {
            flag = true;
            bowlerInfoIndex = i;
            break;
        } else {
            flag = false;
        }
    }

    if (flag === false) {
        bowlerInfoIndex = bowlerNames.length;
        console.log("bowlerinfoIndex" + bowlerInfoIndex);
        bowlerNames.push(bowlerName);
        bowlersMaiden.push(0);
        bowlerOvers.push(0);
        bowlersRuns.push(0);
        bowlersWickets.push(0);
        individualBwlName.innerText = bowlerName;
        individualBwlOvers.innerText = Number(0);
        individualBwlMaidens.innerText = Number(0);
        individualBwlWickets.innerText = Number(0);
        individualBwlRuns.innerText = Number(0);
        //  return bowlerInfoIndex;
    } else {
        console.log(bowlerInfoIndex);
        individualBwlName.innerText = bowlerName;
        individualBwlOvers.innerText = Number(bowlerOvers[bowlerInfoIndex]);
        individualBwlMaidens.innerText = bowlersMaiden[bowlerInfoIndex];
        individualBwlWickets.innerText = bowlersWickets[bowlerInfoIndex];
        individualBwlRuns.innerText = bowlersRuns[bowlerInfoIndex];
        //    return bowlerInfoIndex;
    } return bowlerInfoIndex;
}
function checkMaiden(thisOverRuns, individualBwlMaidens, bowlerInfoIndex, bowlersMaiden) {
    let thisOverTotalRuns = 0;
    for (let i = 0; i < thisOverRuns.length; i++) {
        thisOverTotalRuns = thisOverTotalRuns + thisOverRuns[i];
    }
    if (thisOverTotalRuns == 0) {
        bowlersMaiden[bowlerInfoIndex] = bowlersMaiden[bowlerInfoIndex] + 1;
        individualBwlMaidens.innerText = bowlersMaiden[bowlerInfoIndex];
    } else {
        individualBwlMaidens.innerText = bowlersMaiden[bowlerInfoIndex];
    }
    thisOverRuns.length = 0;
    sessionStorage.removeItem('thisOverRuns');
}

function restoreTimelineState(thisOver) {
    if (!thisOver) {
        console.warn("Timeline container (thisOver) is not found.");
        return; // Exit if thisOver element is not found
    }

    let savedArr = JSON.parse(sessionStorage.getItem('thisOverArr')) || [];

    let savedWdArr = JSON.parse(sessionStorage.getItem('thisOverWdArr')) || [];

    // savedArr.forEach(run => {
    //     insertRunsOrWicInThisOver(savedArr, run, thisOver);
    // });
    for (let i = 0; i < savedArr.length; i++) {

        insertRunsOrWicInThisOver(savedArr, i, thisOver);
    }
    // const thisOver = document.getElementById('thisOver');
    for (let i = 0; i < savedWdArr.length; i++) {

        if (savedWdArr[i] === 'Wd') {
            let div = document.createElement("div");
            div.textContent = "Wd";
            div.style.height = "40px";
            div.style.width = "40px";
            div.style.borderRadius = "50%";
            div.style.border = "1px solid black";
            div.style.backgroundColor = "#bef264";
            div.style.padding = "0.1rem 0.6rem";
            div.style.fontSize = "1rem";
            div.style.display = "block";
            div.style.fontWeight = "bold";
            insertDivAtPosition(thisOver, div, i + 1);
        }
    }
}
function insertDivAtPosition(parentDiv, newDiv, index) {
    // Check if the index is within the bounds
    if (index < 0 || index > parentDiv.children.length) {
        console.log("Index out of bounds.");
        return;
    }

    // Find the reference node based on the index
    const referenceNode = parentDiv.children[index];

    // Insert the new div before the reference node
    parentDiv.insertBefore(newDiv, referenceNode);
}

function saveTimelineState(arr) {
    window.sessionStorage.setItem('thisOverArr', JSON.stringify(arr));
    window.sessionStorage.setItem('thisOverWdArr', JSON.stringify(wdArr));
}



function saveToSessionStorage(heading) {
    window.sessionStorage.setItem('currRunRate', CurrRunRate.innerText);
    window.sessionStorage.setItem('projScore', ProjectedScore.innerText);
    window.sessionStorage.setItem('isStriker', isStriker);
    window.sessionStorage.setItem('ballToBall', document.getElementById('ballToBall').value);
    window.sessionStorage.setItem('headingText', heading.innerText);
    console.log(heading.innerText);
    window.sessionStorage.setItem('bowlersOvers', JSON.stringify(bowlerOvers));
    window.sessionStorage.setItem('bowlerNames', JSON.stringify(bowlerNames));
    window.sessionStorage.setItem('bowlersMaiden', JSON.stringify(bowlersMaiden));
    window.sessionStorage.setItem('bowlersRuns', JSON.stringify(bowlersRuns));
    window.sessionStorage.setItem('bowlersWickets', JSON.stringify(bowlersWickets));
    window.sessionStorage.setItem('bowlerInfoIndex', bowlerInfoIndex);

    // window.sessionStorage.setItem('thisOverRuns', JSON.stringify(thisOverRuns));


}

let previousBowlerStatsMap = {};

function saveBowlerDataToDB() {
    const currentBowlerStats = {
        runs: bowlersRuns[bowlerInfoIndex],
        overs: bowlerOvers[bowlerInfoIndex],
        maidens: bowlersMaiden[bowlerInfoIndex],
        wickets: bowlersWickets[bowlerInfoIndex],
    };

    const bowlerKey = bowlerName; // Unique key for each bowler (e.g., name)
    if (!previousBowlerStatsMap[bowlerKey]) {
        previousBowlerStatsMap[bowlerKey] = { runs: 0, overs: 0, maidens: 0, wickets: 0 };
    }

    const previousStats = previousBowlerStatsMap[bowlerKey];
    const increment = {
        runs: currentBowlerStats.runs - previousStats.runs,
        overs: currentBowlerStats.overs - previousStats.overs,
        maidens: currentBowlerStats.maidens - previousStats.maidens,
        wickets: currentBowlerStats.wickets - previousStats.wickets,
    };

    // Update the map for this bowler
    previousBowlerStatsMap[bowlerKey] = { ...currentBowlerStats };

    // Send incremental updates to the backend
    fetch('http://localhost:3000/api/bowler', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: bowlerName,
            ...increment,
        }),
    })
        .then(response => response.json())
        .then(data => console.log('Bowler data saved:', data))
        .catch(error => console.error('Error saving bowler data:', error));
}


function savePreviousStatsToStorage() {
    sessionStorage.setItem('previousBowlerStats', JSON.stringify(previousBowlerStatsMap));
}

function loadPreviousStatsFromStorage() {
    const savedStats = sessionStorage.getItem('previousBowlerStats');
    if (savedStats) {
        previousBowlerStatsMap = JSON.parse(savedStats);
    }
}

// Call this on page load
// loadPreviousStatsFromStorage();

function saveBatsmanDataToDB(batsmanData) {
    fetch('http://localhost:3000/api/batsman', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(batsmanData),
    })
        .then(response => response.json())
        .then(data => console.log('Batsman data saved:', data))
        .catch(error => console.error('Error saving batsman data:', error));
}

function saveScoreToDatabase(teamA, matchId) {
    try {
        let heading = window.sessionStorage.getItem('headingText');
        
        // Get current score and wickets from the frontend
        let [score, wicket] = heading.split('/');
        
        wicket = Number(wicket); // Convert to number if needed
        score = Number(score);
        const ballToBall = window.sessionStorage.getItem('ballToBall');

        // Get the updated overs from the frontend
        const overs = Number(ballToBall);
        let team = teamA;

        // Prepare the data to send
        const ballDetails = {
            matchId,
            team,
            score,
            wickets: wicket, // Adjusted for no wicket in this example
            overs,
        };

        // Send data to the backend
        fetch('/saveBallDetails', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ballDetails),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();  // Parse the response as JSON
        })
        .then(data => {
            console.log('Response data:', data);  // Log the entire response object
            if (data.message === 'Ball details saved successfully!') {
                console.log('Ball details saved:', data.message);
            } else {
                console.error('Error saving ball details:', data.message);
            }
        })
        .catch(error => {
            console.error('Error sending ball details:', error);  // Log any errors that occur
        });
    } catch (error) {
        console.error('Error in run function:', error);  // Log any other errors
    }
}

// async function run(runs, team, matchId) {
//     try {
//         // Get current score and wickets from the frontend
//         let heading = document.querySelector('h1');
//         let [score, wicket] = heading.innerText.split('/');
//         wicket = Number(wicket); // Convert to number if needed

//         // Update the frontend score
//         heading.innerText = `${Number(score) + runs}/${wicket}`;

//         // Get the updated overs from the frontend
//         const overs = document.getElementById('ballToBall').value;

//         // Send data to the backend
//         const response = await fetch('/saveBallDetails', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 matchId,
//                 team,
//                 runs,
//                 wickets: 0, // Adjusted for no wicket in this example
//                 overs,
//             }),
//         });

//         const data = await response.json();
//         if (response.ok) {
//             console.log(data.message);
//         } else {
//             console.error(data.message);
//         }
//     } catch (error) {
//         console.error('Error sending ball details:', error);
//     }
// }
//previous mistakes
/*function thisOverUpdation(b, thisOver, thisOverChildDivs, arr, wic) {
// const firstChildDiv = thisOver.querySelector('div:nth-child(2)');
    if (b > 4) {
        let arrCloned = [...arr];
         let div = thisOverChildDivs[5];
         div.innerText = Number(arrCloned[5]);
         div.style.display = "block";
        setTimeout(function () {
            for (let i = 0; i < arrCloned.length; i++) {
                 let divDisappear = thisOverChildDivs[i];
                 arr.pop();

                divDisappear.style.display = "none";
            }
        }, 2000)
             let arrRev = [...arr];
             arrRev.reverse();
        for (let i = 0; i < arrRev.length; i++){
         let div = thisOverChildDivs[i];
         div.innerText = Number(arrRev[i]);
         div.style.display = "block";
         console.log(div.innerText);
        }
}
        else {
         if (getComputedStyle(firstChildDiv).display === "none") {
              firstChildDiv.innerText = (arr[0]);
                 firstChildDiv.style.display = "block";
            }
                 //this was the mistae after wic feature
                 else{
                     for(let i =0; i < arr.length; i++){
                         if(arr[i] === "W"){
                             continue;
                         }else{
                             firstChildDiv.innerText = (arr[i]);
                 firstChildDiv.style.display = "block";
                             break;
                         }
                     }
            }

         } else {
                 let arrCloned = [...arr];
             for (let i = 0; i < arrCloned.length; i++) {
                     let div = thisOverChildDivs[i];
                     div.innerText = Number(arrCloned[i]);
                     div.style.display = "block";
                 }

    // for reverse timeline
                    let arrRev = [...arr];
                    arrRev.reverse();
                 for (let i = 0; i < arrRev.length; i++){
                     let div = thisOverChildDivs[i];
                     let runs = Number(arrRev[i]);
                    div.innerText = Number(runs);
                     div.style.display = "block";
                 }
            }
        }
    }
*/
// Insert the new div before the first child of 'thisOver'
/* if (thisOver.firstChild) {
     thisOver.insertBefore(div, thisOver.firstChild);
 } else {
     thisOver.appendChild(div);
 }*/
/*   error finding approach  !!!!!!!
              console.log((Number(score) + Number(runs)) / ((Number(a) * 6) + Number(b) + 1))
              console.log((Number(score) + Number(runs)));
              console.log(((Number(a) * 6) + Number(b) + 1) / 6);
              console.log((Number(a) * 6));
              console.log(Number(b) + 1);
              console.log((Number(score) + Number(runs)) / ((Number(a) * 6) + Number(b) + 1) / 6);
              console.log((Number(score) + Number(runs)) / totalBalls);
              */
// Save `arr` and `thisOver` content to sessionStorage


// Restore the timeline on page load


// Add the save call before redirecting to FallOfWicket page

// Example of restoration on page load