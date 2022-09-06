import { createInterface } from "readline";
import { connectDatabase } from "./database";
import mongoose from "mongoose";

//Validando se o número foi passado como paramentro
if (process.argv.length < 3) {
  throw `Não se esqueça de passar o número que deseja deletar. Exemplo: "yarn start 889656565656"`;
}

(async () => {
  const db = await connectDatabase() as mongoose.Connection;

  const phoneDeleted = process.argv.pop();

  const user = await db.collection('users').findOne({ phone: phoneDeleted })

  if(!user) {
    throw ("Nenhum usuario encontrado com esse número")
  }

  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readline.question(
    `WARNING: Deseja deletar esta conta: "${user?.realName} - ${user?.email}" ? [y/n]\n`,
    async (resp) => {
      switch (resp) {
        case "y":
          await db.collection('users').deleteOne({ _id: user._id })
          console.log("Usuario deletado!")
          break;
        case "n":
          console.log("ok!")
          break;
        default:
          console.log("Opção invalida");
          break;
      }
    }
  );
})();
