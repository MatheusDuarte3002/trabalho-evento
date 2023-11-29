import { NextFunction, Request, Response, Router } from "express";
import { EventosController } from "../controllers/EventosController";
import * as yup from "yup";
import { Evento } from "../models/Evento";
import { Not } from "typeorm";

async function validarPayload(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  let schema = yup.object({
    nome: yup.string().min(3).max(255).required(),
    endereco: yup.string().max(255).required(),
    descricao: yup.string().max(255).required(),
    data_inicio: yup.date().required(),
    data_termino: yup.date().required(),
    preco: yup.number(),
  });

  let payload = req.body;

  try {
    req.body = await schema.validate(payload, {
      abortEarly: false,
      stripUnknown: true,
    });

    return next();
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return res.status(400).json({ errors: error.errors });
    }
    return res.status(500).json({ error: "Ops! Algo deu errado." });
  }
}

async function validarSeExiste(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  let id = Number(req.params.id);
  let evento: Evento | null = await Evento.findOneBy({ id });
  if (!evento) {
    return res.status(422).json({ error: "Evento não encontrado!" });
  }

  res.locals.evento = evento;

  return next();
}

let router: Router = Router();

let eventosController: EventosController = new EventosController();

router.get("/eventos", eventosController.list);

router.get("/eventos/:id", validarSeExiste, eventosController.list);

router.post(
  "/eventos",
  validarPayload,
  eventosController.create
);

router.put(
  "/eventos/:id",
  validarSeExiste,
  validarPayload,
  eventosController.update
);

router.delete("/eventos/:id", validarSeExiste, eventosController.delete);

export default router;
