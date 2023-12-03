import { NextFunction, Request, Response, Router } from "express";
import { InscricoesController } from "../controllers/InscricoesController";
import * as yup from "yup";
import { Inscricao } from "../models/Inscricao";

async function validarPayload(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  let schema = yup.object({
    data_inscricao: yup.date().required(),
    usuarioId: yup.number().required(),
    eventoId: yup.number().required()
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
  let inscricao: Inscricao | null = await Inscricao.findOneBy({ id });
  if (!inscricao) {
    return res.status(422).json({ error: "Inscrição não encontrada!" });
  }

  res.locals.inscricao = inscricao;

  return next();
}

let router: Router = Router();

let inscricoesController: InscricoesController = new InscricoesController();

router.get("/inscricoes", inscricoesController.list);

router.get("/inscricoes/:id", validarSeExiste, inscricoesController.list);

router.post(
  "/inscricoes",
  validarPayload,
  inscricoesController.create
);

router.put(
  "/inscricoes/:id",
  validarSeExiste,
  validarPayload,
  inscricoesController.update
);

router.delete("/inscricoes/:id", validarSeExiste, inscricoesController.delete);

export default router;


