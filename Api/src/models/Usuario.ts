import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
  public cpf: string;

  @Column()
  public endereco: string;

  @Column()
  public situacao: boolean;
}
