/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
window.addEventListener("load", function () {
            var request = new XMLHttpRequest();
    var matchesSelect = document.getElementById("match");
    var betType = document.getElementById("result_choice");
    request.open("GET", "https://my-json-server.typicode.com/poi92/BetRest/db", true);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {

            console.log('Done', request.readyState);
            console.log('OK', request.status);
            var tutto = JSON.parse(request.responseText);
            for (var i = 0; i < tutto.Matches.length; i++) {
                console.log('Parsing Matches' + "" + i);
                matchesSelect.innerHTML += "<option>" + tutto.Matches[i].title + "</option>";
            }       
            
            for (var j = 0; j < tutto.Bet_Type.length; j++) {
                console.log('Parsing Bet_Type' + "" + j);
                betType.innerHTML += "<option>" + tutto.Bet_Type[j].body + "</option>";
            }
        }
    };
    request.send();
    document.getElementById("betting").addEventListener("click", function () {
        var match = document.getElementById("match").value;
        var bet = document.getElementById("bet").value;
        var result_choice = document.getElementById("result_choice").value;
        var x = new SoccerBet();
        x.match = match;
        console.log(x.match);
        console.log(x.bet);
        console.log(x.result_choice);
        x.bet = bet;
        x.result_choice = result_choice;
        alert("Partita: " + x.match);
        alert("Puntata: " + x.bet + "€");
        alert("Risultato: " + x.result_choice);
        var recap = document.getElementById("bet_recap");
        recap.innerHTML = x.toString();
    }, false);

}, false);

function SoccerBet()
{
    this.match = match;
    this.bet = bet;
    this.result_choice = result_choice;
}
;

SoccerBet.prototype.toString = function () {
    var betString = "Partita: " + this.match + "<br>" + "Puntata: " + this.bet;
    switch (this.result_choice)
    {
        case "1":
            this.result_choice = "Vittoria in Casa";
            break;
        case "X":
            this.result_choice = "Pareggio";
            break;
        case "2":
            this.result_choice = "Vittoria Ospite";
            break;
    }
    betString = betString + "<br>" + "Risultato: " + this.result_choice;
    return betString;
};
