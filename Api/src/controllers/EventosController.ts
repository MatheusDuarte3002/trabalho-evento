import { Evento } from "../models/Evento";
import { Request, Response } from "express";


export class EventosController {
  async list(req: Request, res: Response) {
    let id: number = Number(req.params.id);

    let eventos: Evento[] = await Evento.findBy({
      id: id ? id : undefined,
    });
    return res.status(200).json(eventos);
  }

  async create(req: Request, res: Response) {
    let body = req.body;

    let evento: Evento = await Evento.create({
      nome: body.nome,
      endereco: body.endereco,
      descricao: body.descricao,
      data_inicio: body.data_inicio,
      data_termino: body.data_termino,
      preco: body.preco,
      situacao: true
    }).save();

    return res.status(200).json(evento);
  }

  async update(req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let evento: Evento = res.locals.evento;

    (evento.nome = body.nome),
    (evento.endereco = body.endereco),
    (evento.descricao = body.descricao),
    (evento.data_inicio = body.data_inicio),
    (evento.data_termino = body.data_termino),
    (evento.preco = body.preco),
    (evento.situacao = body.situacao);
    await evento.save();

    return res.status(200).json(evento);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    let evento: Evento = res.locals.evento;

    await evento.remove();

    return res.status(200).json();
  }
}
