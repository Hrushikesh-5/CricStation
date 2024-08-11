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
let arr = [];
let isStriker = true; // Keep track of who is on strike--> JUST CHANGED
let sScore = document.getElementById('strikerScore');// THIS IS JUST CHANGED
let nsScore = document.getElementById('nonStrikerScore');
// Get the parent div element
const thisOver = document.getElementById('thisOver');
// Get all child div elements
const thisOverChildDivs = thisOver.querySelectorAll('div');

// function updateBatterDisplay() {--->JUST CHANGED FOR  A WHILE TO CHECK
//     let sName = document.getElementById('sName');
//     sName.innerText = `${strikerName} *`;
//     let nsName = document.getElementById('nsName');
//     nsName.innerText = `${nonStrikerName}`;

//     let sScore = document.getElementById('strikerScore');
//     sScore.innerText = `${strikerScore}(${strikerBalls})`;

//     let nsScore = document.getElementById('nonStrikerScore');
//     nsScore.innerText = `${nonStrikerScore}(${nonStrikerBalls})`;
// }
// function swapStrike() {--->JUST CHANGED FOR A WHILE TO CHECK
//     [strikerName, nonStrikerName] = [nonStrikerName, strikerName];
//     [strikerScore, nonStrikerScore] = [nonStrikerScore, strikerScore];
//     [strikerBalls, nonStrikerBalls] = [nonStrikerBalls, strikerBalls];
//     updateBatterDisplay();
// }
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
function thisOverUpdation(b, thisOver, thisOverChildDivs, arr) {
    const firstChildDiv = thisOver.querySelector('div:nth-child(2)');
    if (b > 4) {
        let arrCloned = [...arr];
        let div = thisOverChildDivs[5];
        div.innerText = Number(arrCloned[5]);
        div.style.display = "block";
        setTimeout(function () {//temporar until nextOver Feature is added
            for (let i = 0; i < 6; i++) {
                let divDisappear = thisOverChildDivs[i];
                arr.pop();
                divDisappear.style.display = "none";
            }
        }, 2000)

        //     let arrRev = [...arr];
        //     arrRev.reverse();
        /*for (let i = 0; i < arrRev.length; i++){
         let div = thisOverChildDivs[i];
         div.innerText = Number(arrRev[i]);
         div.style.display = "block";
         console.log(div.innerText);
        }*/

    } else {
        if (getComputedStyle(firstChildDiv).display === "none") {
            // firstChildDiv.innerText = Number(runs);
            firstChildDiv.innerText = Number(arr[0]);
            firstChildDiv.style.display = "block";
        } else {
            let arrCloned = [...arr];
            for (let i = 0; i < arrCloned.length; i++) {
                let div = thisOverChildDivs[i];
                div.innerText = Number(arrCloned[i]);
                div.style.display = "block";
            }
            //    let arrRev = [...arr];
            //    arrRev.reverse();
            // for (let i = 0; i < arrRev.length; i++){// this is for reverse timeline..
            //     let div = thisOverChildDivs[i];
            //     let runs = Number(arrRev[i]);
            //     div.innerText = Number(runs);
            //     div.style.display = "block";
            //     // console.log("runs:")
            //     // console.log(runs);
            //     console.log(div.innerText);

            // }
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
            //code for strike change and updating runs of individual batsmans
            if ((isStriker) && (runs % 2 === 1)) {
                strikerScore += Number(runs);
                strikerBalls++;
                sScore.innerText = `${strikerScore}(${strikerBalls})`;
                changeStrike();

                //strikerScore += Number(runs);THESE
                //strikerBalls++;THREE 
                //swapStrike();LINE HAVE TO BE UNCOMMENT

            } else if ((isStriker === false) && (runs % 2 == 1)) {
                nonStrikerScore += Number(runs);
                nonStrikerBalls++;
                nsScore.innerText = `${nonStrikerScore}(${nonStrikerBalls})`;
                changeStrike();
            } else if ((isStriker === false) && (runs % 2 == 0)) {
                nonStrikerScore += Number(runs);
                nonStrikerBalls++;
                nsScore.innerText = `${nonStrikerScore}(${nonStrikerBalls})`;
            } else if ((isStriker) && (runs % 2 == 0)) {
                strikerScore += Number(runs);
                strikerBalls++;
                sScore.innerText = `${strikerScore}(${strikerBalls})`;
            }
            arr.push(Number(runs));
            thisOverUpdation(b, thisOver, thisOverChildDivs, arr);
            //--JUST CHANGED ONLY THE CURLY BRACE HAS TO BE UNCOMMENT

            /*if(runs % 2 === 0){
            strikerScore += Number(runs);
            strikerBalls++;
            }
            updateBatterDisplay();*/

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
}
function changeStrike() {// JUST CHANGED FOR A WHILE
    isStriker = !isStriker;
    updateStrike();
}

function updateStrike() {//JUST CHANGED FOR A WHILE
    let sName = document.getElementById('sName');
    let nsName = document.getElementById('nsName');

    if (isStriker) {
        sName.innerText = strikerName + "*";
        //  sName.style.color = 'red';
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
