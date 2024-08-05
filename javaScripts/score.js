let teamA = window.localStorage.getItem('teamA');
let teamB = window.localStorage.getItem('teamB');
let choice = window.localStorage.getItem('optedTo');
let heading = document.getElementById('h1');
let secondIng = document.getElementById('second-ing');
let toss = window.localStorage.getItem('tossWonBy');
let count = 0;
let CurrRunRate = document.getElementById('CRR');
let ProjectedScore = document.getElementById("PrjScr");
let strikerName = window.localStorage.getItem('strikerName');
let nonStrikerName = window.localStorage.getItem('nonStrikerName');
let bowlerName = window.localStorage.getItem('bowlerName');
let strikerScore = 0;
let strikerBalls = 0;
let nonStrikerScore = 0;
let nonStrikerBalls = 0;
// let isStriker = true; // Keep track of who is on strike
/*
localStorage.setItem('strikerName', strikerName);
localStorage.setItem('nonStrikerName', nonStrikerName);
localStorage.setItem('bowlerName', bowlerName);
*/
function updateBatterDisplay() {
    let sName = document.getElementById('sName');
    sName.innerText = `${strikerName} *`;
    let nsName = document.getElementById('nsName');
    nsName.innerText = `${nonStrikerName}`;

    let sScore = document.getElementById('strikerScore');
    sScore.innerText = `${strikerScore}(${strikerBalls})`;

    let nsScore = document.getElementById('nonStrikerScore');
    nsScore.innerText = `${nonStrikerScore}(${nonStrikerBalls})`;
}
function swapStrike() {
    [strikerName, nonStrikerName] = [nonStrikerName, strikerName];
    [strikerScore, nonStrikerScore] = [nonStrikerScore, strikerScore];
    [strikerBalls, nonStrikerBalls] = [nonStrikerBalls, strikerBalls];
    updateBatterDisplay();
}
function whoToBat() {
    updateBatterDisplay();
    // let sName = document.getElementById('sName');
    // sName.innerText = strikerName;
    // let nsName = document.getElementById('nsName');
    // nsName.innerText = nonStrikerName;
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
    // updateStrike();
}

// Call the function to set the heading when the page loads
reset = () => {
    document.querySelector('h1').innerText = "0/0";
    document.querySelector('#ballToBall').value = "0.0";
    let target = document.querySelector('h2');
    target.innerText = "target:" + localStorage.getItem('totalScore');
    target.style.display = "block";
    isStriker = true;
    // updateStrike();
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
function run(runs, wic = false) {
    let [crrText, crr] = CurrRunRate.innerText.split(':');
    let [ProjScrText,ProjectedSrc] = ProjectedScore.innerText.split(':');
    let heading = document.querySelector('h1');
    let [score, wicket] = heading.innerText.split('/');
    let ballToBall = document.getElementById('ballToBall')
    let [a, b] = ballToBall.value.split('.');
    let OverToOver = document.getElementById('overToOver');
    let totalOvers = OverToOver.value.split('/')[1];
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
            }
            else {
                ballToBall.value = eval(Number(ballToBall.value) + (0.1)).toFixed(1);
            }
        }

        if (!wic) {
            
            heading.innerText = (eval(Number(score) + Number(runs)) + "/" + wicket);
            //code for updation of current run rate.
            let totalBalls = ((Number(a) * 6) + Number(b) + 1) / 6;
            crr = (Number(score) + Number(runs)) / totalBalls;
            CurrRunRate.innerText = crrText + ":" + crr.toFixed(2);
            //code for updation of projected score.
            ProjectedSrc = (Number(crr.toFixed(2)) * Number(totalOvers));
            ProjectedScore.innerText = ProjScrText + ":" + ProjectedSrc.toFixed(0);
            if (runs % 2 === 1) {
                strikerScore += Number(runs);
            strikerBalls++;
            // let temp = strikerName; 
            // nonStrikerName = nonStrikerName + "*";
            // strikerName = temp.replace("*","");
                  swapStrike();
                 // Swap the asterisk without swapping the positions
                //  let temp = strikerName;
                //  strikerName = nonStrikerName + " *";
                //  nonStrikerName = temp.replace(" *", "");
            }
            if(runs % 2 === 0){
            strikerScore += Number(runs);
            strikerBalls++;
            }
            updateBatterDisplay();
            // let strikerRuns = document.getElementById('strikerScore');
            // let [strRuns,strBallsTxt] = strikerRuns.innerText.split('(');
            // let strBalls = strBallsTxt.innerText.split(')')[0];
            // let nonStrikerRuns = document.getElementById('nonStrikerScore');
            // let [nonStrRuns,nonStrBallsTxt] = nonStrikerRuns.innerText.split('(');
            // let nonStrBalls = nonStrBallsTxt.innerText.split(')')[0];
            /* if (runs === '1' || runs === '3') {
            
                 changeStrike();
        }*/
            // crr = (eval(Number(score)/(Number(ballToBall.value))));
            // CurrRunRate.innerText = crrText + ":" + crr;
            // if(b < 4){
            // crr = (Number(score) + Number(runs)) / (Number(ballToBall.value));
            // crr = (Number(score) + Number(runs)) / ((Number(a) * 6) + Number(b) + 1) / 6;


            /*  ek number error finding approach bolte chat gpt bhi har gaya !!!!!!!
               console.log((Number(score) + Number(runs)) / ((Number(a) * 6) + Number(b) + 1))
               console.log((Number(score) + Number(runs)));
               console.log(((Number(a) * 6) + Number(b) + 1) / 6);
               console.log((Number(a) * 6));
               console.log(Number(b) + 1);
               console.log((Number(score) + Number(runs)) / ((Number(a) * 6) + Number(b) + 1) / 6);
               console.log((Number(score) + Number(runs)) / totalBalls);
               */

        }//}
        else {
            heading.innerText = score + '/' + (eval(Number(wicket) + Number(runs)))
            //{
            //for updation of current run rate when wicket is fallen.
            let totalBalls = ((Number(a) * 6) + Number(b) + 1) / 6;
            crr = (Number(score)) / totalBalls;
            CurrRunRate.innerText = crrText + ":" + crr.toFixed(2);
            //}
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
    let ballToBall = document.getElementById('ballToBall')
    let [a, b] = ballToBall.value.split('.');
    let OverToOver = document.getElementById('overToOver');
    let totalOvers = OverToOver.value.split('/')[1];
    let [crrText, crr] = CurrRunRate.innerText.split(':');
    let [ProjScrText,ProjectedSrc] = ProjectedScore.innerText.split(':');
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
}
// function changeStrike() {
//     isStriker = !isStriker;
//     updateStrike();
// }

// function updateStrike() {
//     let sName = document.getElementById('sName');
//     let nsName = document.getElementById('nsName');

//     if (isStriker) {
//         sName.innerText = strikerName + "*";
//         nsName.innerText = nonStrikerName;
//     } else {
//         sName.innerText = strikerName;
//         nsName.innerText = nonStrikerName + "*";
//     }
// }

whoToBat();


secondIng.addEventListener('click', () => {
    secondInnings();
    secondIng.style.display = "none"


})