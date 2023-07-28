// import {
//   PollyClient,
//   SynthesizeSpeechCommand,
//   SynthesizeSpeechInput,
// } from "@aws-sdk/client-polly";
// import fs from "fs";

// async function apiGetPronounce() {
//   const client = new PollyClient();
//   const command = new SynthesizeSpeechCommand();
//   try {
//     let data = await client.send(command);
//     if (!data || !data.AudioStream) throw Error(`bad response`);
//     await saveStream(data.AudioStream, "output.mp3");
//   } catch (err) {
//     console.log(err);
//   }
// }

// function saveStream(fromStream, filename) {
//   return new Promise((resolve, reject) => {
//     let toStream = fs.createWriteStream(filename);
//     toStream.on("finish", resolve);
//     toStream.on("error", reject);
//     fromStream.pipe(toStream);
//   });
// }

// apiGetPronounce();

// export default apiGetPronounce;

// // Initialize the Amazon Cognito credentials provider
// AWS.config.region = "eu-north-1"; // Region
// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//   IdentityPoolId: "eu-north-1:0ae494b6-269e-47af-828c-0459cac1c3b4",
// });
