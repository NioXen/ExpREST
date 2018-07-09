import {Column, Entity, PrimaryColumn} from "typeorm";
import {ConsumerEntity} from "../abstract/DataConsumer";

@Entity()
export class Item extends ConsumerEntity {

    @PrimaryColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public icon: string;

    @Column()
    public quality: number;

    @Column()
    public itemLevel: number;

    protected consumeArray(data: object[]) {
        console.error("Item tried to consume an Array. Item should not contain Array-like properties");
    }
}
