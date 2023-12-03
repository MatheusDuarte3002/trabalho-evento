import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Inscricao } from "./Inscricao";

@Entity("usuarios")
export class Usuario extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public nome: string;

  @Column({ select: false })
  public senha: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public telefone: string;

  @Column()
  public genero: string;

  @Column()
  public cpf: string;

  @Column()
  public endereco: string;

  @Column()
  public situacao: boolean;

  @OneToMany(() => Inscricao, inscricao => inscricao.usuario)
  public inscricoes: Inscricao[];
}
