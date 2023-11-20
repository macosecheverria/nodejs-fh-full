import { yarg } from "./config/plugins/yargs.plugins";
import { ServerApp } from "./presentacion/server-app";


(async() => {
  await main();
})();

async function main(){
  const {b:base, s: showTable, l: limit, n: name, d: destination} = yarg;
  ServerApp.run({base, limit, showTable, name, destination});
}