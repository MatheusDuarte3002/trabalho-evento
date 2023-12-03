import { Inscricao } from "../models/Inscricao";
import { Request, Response } from "express";
import { Usuario } from "../models/Usuario";
import { Evento } from "../models/Evento";


export class InscricoesController {
  async list(req: Request, res: Response) {
    let id: number = Number(req.params.id);

    let inscricoes: Inscricao[] = await Inscricao.findBy({
      id: id ? id : undefined,
    });
    return res.status(200).json(inscricoes);
  }

  async create(req: Request, res: Response) {
    try {
      const body = req.body;
      const { usuarioId, eventoId, data_inscricao } = body;
      if (!usuarioId || !eventoId) {
        return res.status(400).json({ error: 'Falta de dados necessários: usuarioId e eventoId são obrigatórios.' });
      }
      const usuario = await Usuario.findOne({ where: { id: usuarioId } });
      const evento = await Evento.findOne({ where: { id: eventoId } });
      if (!usuario || !evento) {
        return res.status(404).json({ error: 'Usuário ou evento não encontrado.' });
      }
      const inscricao: Inscricao = await Inscricao.create({
        data_inscricao,
        situacao: true,
        usuario: usuario,
        evento: evento,
      }).save();
      return res.status(200).json(inscricao);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let inscricao: Inscricao = res.locals.inscricao;

    (inscricao.situacao = body.situacao);
    await inscricao.save();

    return res.status(200).json(inscricao);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    let inscricao: Inscricao = res.locals.inscricao;

    await inscricao.remove();

    return res.status(200).json();
  }
}



