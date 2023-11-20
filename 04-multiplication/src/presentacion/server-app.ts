import { CreateTable } from "../domain/use-cases/create-table.use-cases";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

interface RunOptions {
  base: number;
  limit: number;
  showTable: boolean;
  name: string;
  destination: string;
}

export class ServerApp {
  static run({ base, limit, showTable, name, destination }: RunOptions) {
    const table = new CreateTable().execute({ base, limit });
    const wasCreated = new SaveFile().execute({
      fileContent: table,
      fileDestination: destination,
      fileName: name,
    });

    if (showTable) console.log(table);

    wasCreated ? console.log("File created") : console.log("File no created");
  }
}
