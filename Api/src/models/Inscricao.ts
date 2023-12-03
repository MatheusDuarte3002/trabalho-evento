import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./Usuario";
import { Evento } from "./Evento";

@Entity("inscricoes")
export class Inscricao extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: "date",
  })
  public data_inscricao: string;

  @Column()
  public situacao: boolean;

  @ManyToOne(() => Usuario, usuario => usuario.inscricoes)
  @JoinColumn({ name: "usuarioId" })
  public usuario: Usuario;

  @ManyToOne(() => Evento, evento => evento.inscricoes)
  @JoinColumn({ name: "eventoId" })
  public evento: Evento;
}




