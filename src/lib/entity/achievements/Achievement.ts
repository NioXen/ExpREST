import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, RelationId} from "typeorm";
import {ConsumerEntity} from "../abstract/DataConsumer";
import {Category} from "./Category";
import {Criteria} from "./Criteria";
import {Item} from "./Item";

@Entity()
export class Achievement extends ConsumerEntity {

    @PrimaryColumn()
    public id: number;

    @Column({type: "varchar", length: 150})
    public title: string;

    @Column({type: "tinyint", unsigned: true})
    public points: number;

    @Column({type: "text"})
    public description: string;

    @Column({type: "varchar", length: 200})
    public reward: string;

    @ManyToMany((type) => Item, {cascade: true})
    @JoinTable()
    public rewardItems: Item[];

    @Column({type: "varchar", length: 50})
    public icon: string;

    @Column({type: Boolean})
    public accountWide: boolean;

    @Column({type: "tinyint", unsigned: true})
    public factionId: number;

    @RelationId((achievement: Achievement) => achievement.criteria)
    public criteriaIds: number[];

    @OneToMany((type) => Criteria, (criteria) => criteria.achievement, {cascade: true, nullable: true})
    public criteria: Criteria[];

    @RelationId((achievement: Achievement) => achievement.category)
    public categoryId: number;

    @ManyToOne((type) => Category, (category) => category.achievements)
    public category: Category;

    protected consumeArray(data: object[]) {
        if ("orderIndex" in data[0]) {
            this.criteria = super.mapToClass(data, Criteria);
        }
        if ("itemLevel" in data[0]) {
            this.rewardItems = super.mapToClass(data, Item);
        }
    }
}
