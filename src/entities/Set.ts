import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("uq_set_code_set", ["set_code"], { unique: true })
@Entity("set", { schema: "yugioh_shop" })
export class Set {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", {
    name: "set_code",
    nullable: true,
    unique: true,
    length: 50,
  })
  set_code: string | null;

  @Column("varchar", { name: "set_name", nullable: true, length: 255 })
  set_name: string | null;

  @Column("int", { name: "num_of_cards", nullable: true })
  num_of_cards: number | null;

  @Column("date", { name: "tcg_date", nullable: true })
  tcg_date: string | null;

  @Column("varchar", { name: "set_image", nullable: true, length: 255 })
  set_image: string | null;
}
