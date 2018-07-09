import {Column, Entity, ManyToOne, PrimaryColumn, RelationId} from "typeorm";
import {ConsumerEntity} from "../abstract/DataConsumer";
import {Achievement} from "./Achievement";

@Entity()
export class Criteria extends ConsumerEntity {

    @PrimaryColumn()
    public id: number;

    @ManyToOne((type) => Achievement, (achievement) => achievement.criteria)
    public achievement: Achievement;

    @PrimaryColumn()
    @RelationId((criteria: Criteria) => criteria.achievement)
    public achievementId: number;

    @Column()
    public description: string;

    @Column()
    public orderIndex: number;

    @Column()
    public max: number;

    protected consumeArray(data: object[]) {
        console.error("Criteria tried to consume an Array. Criteria should not contain Array-like properties");
    }
}
