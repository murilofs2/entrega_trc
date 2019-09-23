import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

import conn from "../../config/dbConnection";

mongoose.connect(conn.url);
autoIncrement.initialize(mongoose);

const DisciplinaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  codigo: {
    type: String,
    required: true
  },
  professor: {
    type: String,
    required: true
  },
  departamento: {
      type: String,
      required: true
  },
  },
  {
    versionKey: false
  });

  DisciplinaSchema.plugin(autoIncrement.plugin, {
  model: "Disciplina",
  fiel: "id",
  startAt: 1,
  incrementBy: 1
});

export default mongoose.model("Disciplina", DisciplinaSchema);
