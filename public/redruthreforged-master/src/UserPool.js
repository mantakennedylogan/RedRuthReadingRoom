import { CognitoUserPool } from "amazon-cognito-identity-js";


// NOT VALID CREDENTIALS
// UNIMPLEMENTED CODE
// Object to hold user pool data (to be changed with Ethan's new Pool)
const poolData = {
    UserPoolId: "us-east-1_vQMe1CGGM",
    ClientId: "k20kq8qns8h4mavub54f9d18m"
}

export default new CognitoUserPool(poolData);