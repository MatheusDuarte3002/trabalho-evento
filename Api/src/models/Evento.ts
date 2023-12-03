import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Inscricao } from "./Inscricao";

@Entity("eventos")
export class Evento extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public nome: string;

  @Column()
  public endereco: string;

  @Column()
  public descricao: string;

  @Column({
    type: "date",
  })
  public data_inicio: string;

  @Column({
    type: "date",
    nullable: true,
  })
  public data_termino: string;

  @Column({
    type: "numeric",
    precision: 7,
    scale: 2,
  })
  public preco: number;

  @Column()
  public situacao: boolean;

  @OneToMany(() => Inscricao, inscricao => inscricao.evento)
  public inscricoes: Inscricao[];
}

