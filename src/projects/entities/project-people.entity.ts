import { EntityHelper } from "src/utils/entity-helper";
import { Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project.entity";

@Entity()
export class ProjectPeople extends EntityHelper {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => Project, {
        eager: true
    })
    project: Project;

    // @ManyToMany(() => Employee, {
    //     eager: true
    // })
    // employee: Employee
}