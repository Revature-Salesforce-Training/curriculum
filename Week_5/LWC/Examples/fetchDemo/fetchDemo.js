import { LightningElement } from 'lwc';

export default class FetchDemo extends LightningElement {
    gameDate;
    gameResult;
    promiseReturned;

    handleClick(event) {
        let buttonLabel = event.target.label;
        if(buttonLabel === 'Fetch API') {
            this.invokeFetch();
        } else if(buttonLabel === 'Fetch API w/ Async/Await') {
            this.invokeFetchAsync();
        }
    }

    invokeFetch() {
        const fetchPromise = fetch("https://www.balldontlie.io/api/v1/games/38");
        fetchPromise.then(response => {
            return response.json();
        }).then(gameInfo => {
            this.parseJson(gameInfo);
        })
        .catch(error => {
                console.error(error);
        })
    }

    async invokeFetchAsync() {
        const fetchPromise = await fetch("https://www.balldontlie.io/api/v1/games/38");
        let gameInfo = await fetchPromise.json();
        this.parseJson(gameInfo);
    }

    parseJson(gameInfo) {
        this.gameDate = new Date(gameInfo.date);
            
        let homeTeamName = gameInfo.home_team.full_name;
        let awayTeamName = gameInfo.visitor_team.full_name;
        let homeTeamScore = gameInfo.home_team_score;
        let awayTeamScore = gameInfo.visitor_team_score;

        if(homeTeamScore > awayTeamScore) {
            this.gameResult = `${homeTeamName} beat ${awayTeamName} by a score of ${homeTeamScore} to ${awayTeamScore}.`;
        } else {
            this.gameResult = `${awayTeamName} beat ${homeTeamName} by a score of ${awayTeamScore} to ${homeTeamScore}`
        }

        this.promiseReturned = true;
    }
}