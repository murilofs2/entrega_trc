import Disciplina from "../models/Disciplina";

class DisciplinaController {
  // GET
  async index(req, res) {
    try {
      const disciplinas = await Disciplina.find();
      return res.status(200).json(disciplinas);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

   // POST
   async store(req, res) {
    const { nome } = req.body;

    const verification = await Disciplina.findOne({ nome });

    if (verification) {
      return res.status(400).json({ message: "Disciplina já existem" });
    }
    try {
      const disciplina = await Disciplina.create(req.body);

      if (!disciplina) {
        return res
          .status(400)
          .json({ message: "Nome, Professor, código, departamento são necessários" });
      }

      return res.status(201).json({ disciplina });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
  //UPDATE
  async update(req, res) {
    const disciplinaToUpdate = await Disciplina.findOne({
      _id: req.params.id
    });
    const { codigo } = req.body;

    const verification = disciplinaToUpdate.codigo;

    if (verification != codigo) {
      return res.status(400).json({ error: "Disciplina não existe." });
    }

    const disciplina = await Disciplina.update(req.body);

    return res.status(201).json({ message: "Disciplina foi alterado com sucesso." });
  }
  // DELETE
  async delete(req, res) {
    const disciplinaToDelete = await Disciplina.findOne({
      _id: req.params.id
    });
    const { codigo } = req.body;

    const verification = disciplinaToDelete.codigo;

    if (verification != codigo) {
      return res.status(400).json({ error: "Disciplina não existe." });
    }

    const result = await Disciplina.deleteOne({ _id: req.params.id });

    return res.status(204).json({ message: "Disciplina foi excluida com êxito." });
  }
}

export default new DisciplinaController();
