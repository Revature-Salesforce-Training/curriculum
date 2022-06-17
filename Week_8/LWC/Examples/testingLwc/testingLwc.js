import { LightningElement, wire, api, track } from "lwc";
import { getRecord } from "lightning/uiRecordApi";
import GetAccount from "@salesforce/apex/WebController.GetAccount";
import ACCOUNT_NAME_FIELD from "@salesforce/schema/Account.Name";

// In order to test, we need functions! Let's pull in some of the greatest hits from our demos
export default class TestingLwc extends LightningElement {
  guitaristOptions = [
    {
      name: "Jeff Loomis",
      image:
        "https://www.ultimate-guitar.com/static/article/news/5/66485_0_wide_ver1505394095.jpg"
    },
    {
      name: "B.B. King",
      image:
        "https://www.chicagotribune.com/resizer/jE-UU3MmUBjFZ01zqp4evh5EKWM=/1200x0/top/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/4ZT7Y5FTQZDTVJDOWS3PJ2H3NY.jpg"
    },
    {
      name: "Plini",
      image:
        " https://upload.wikimedia.org/wikipedia/commons/2/20/Plini248_300x_RG.jpg"
    },
    {
      name: "Adam Jones",
      image:
        "https://m.media-amazon.com/images/M/MV5BYzk3ODhiMmEtMTcxYy00OGI0LWJiY2QtZDYzOTc0Y2ViMzNjXkEyXkFqcGdeQXVyMjUyNDk2ODc@._V1_.jpg"
    },
    {
      name: "Sarah Longfield",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/2/27/Sarah_Longfield_and_her_signature_Strandberg_Boden_8_string_%28cropped%29.jpg"
    },
    {
      name: "Ikkyu Nakajima",
      image:
        "https://thumbs.dreamstime.com/b/tricot-singer-ikkyu-nakajima-band-performance-festival-rock-people-hradec-kralove-czech-republic-july-51791035.jpg"
    },
    {
      name: "Orianthi",
      image:
        " https://guitar.com/wp-content/uploads/2020/11/Orianthi-Studio-Chris-Ace-17@1400x1050.jpg"
    },
    {
      name: "Brittany Howard",
      image:
        "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2016_07/1418576/160124-nbcblk28-howard.jpg"
    },
    {
      name: "Josh Homme",
      image:
        "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2017_49/2256226/171210-josh-homme-se-140p.jpg"
    },
    {
      name: "Guthrie Govan",
      image: "https://cdn.mos.cms.futurecdn.net/AE8GWzw956JWAfZthtpJ67.jpg"
    }
  ];
  workingList = [...this.guitaristOptions];

  // We'll use the wire service
  @api recordId;
  @wire(getRecord, { recordId: "$recordId", fields: [ACCOUNT_NAME_FIELD] })
  myRecord;

  @track
  apexAccount;

  get name() {
    return this.myRecord.data.fields.Name.value;
  }

  // We've got a regular function that just returns a random guitarist here
  // Note I've used @api to make it a public function
  @api getGuitarist() {
    let selection = Math.floor(Math.random() * this.workingList.length);
    let ret = this.workingList[selection];
    this.workingList.splice(selection, 1);
    if (this.workingList.length <= 0) {
      this.workingList = [...this.guitaristOptions];
    }
    return ret;
  }

  // And we'll even make a server call here. How will this all work?
  getApexAccount() {
    GetAccount()
      .then((response) => {
        this.apexAccount = response;
      })
      .catch((error) => {
        console.log("There was an error: " + error);
      });
  }
}

/*
    We're going to be working with tests. The testing framework we'll be using is Jest, so we need to set that up

    If you haven't done so already to work with LWC in VS Code, you'll need to install Node.js now for Jest
    Once installed, run: npm install -g npm@latest
    Next, we need to set up the Jest test environment. We can do so easily using the following command.
    Run: sfdx force:lightning:lwc:test:setup
    Now we should be all set up!

    Once we're set up, we need to create the test folder: __tests__
    Inside, we create .js files for our tests. By convention, these are named with the .test.js extension
    Additionally, we need to ignore the __tests__ folder in the .forceignore so that we don't save Jest tests to SF

    If we want to have the CLI set things up for us, we can run: sfdx force:lightning:lwc:test:create -f path/to/component/component.js
    It even takes care of the .forceignore for us!

    If you'd like to look at the ins and outs of Jest, you can view the documentation here: https://jestjs.io/docs/getting-started
    Otherwise, we'll go over the essentials for LWC
*/
