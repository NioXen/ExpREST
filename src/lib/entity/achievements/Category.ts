import {Column, Entity, ManyToOne, OneToMany, PrimaryColumn, RelationId} from "typeorm";
import {ConsumerEntity} from "../abstract/DataConsumer";
import {Achievement} from "./Achievement";

@Entity()
export class Category extends ConsumerEntity {

    @PrimaryColumn()
    public id: number;

    @Column({type: "varchar", length: 100})
    public name: string;

    @RelationId((category: Category) => category.parentCategory)
    public parentCategoryId: number;

    @ManyToOne((type) => Category, (category) => category.childCategories, {nullable: true})
    public parentCategory: Category;

    @OneToMany((type) => Category, (category) => category.parentCategory, {cascade: true, nullable: true})
    public childCategories: Category[] = [];

    @OneToMany((type) => Achievement, (achievement) => achievement.category, {cascade: true})
    public achievements: Achievement[] = [];

    constructor(data: object) {
        super();
        this.consumeObject(data);
    }

    protected consumeArray(data: object[]) {
        if ("name" in data[0]) {
            this.childCategories = super.mapToClass(data, Category);
        }
        if ("title" in data[0]) {
            this.achievements = super.mapToClass(data, Achievement);
        }
    }
}
