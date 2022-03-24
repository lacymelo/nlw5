import {Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn} from "typeorm"
import { User } from "./User"
import { v4 as uuid } from "uuid"

@Entity("connections")
class Connection {
    @PrimaryColumn()
    readonly id: string

    @Column()
    admin_id: string

    @Column()
    user_id: string

    @JoinColumn({ name: "user_id" })
    @OneToOne(() => User)
    user: User

    @Column()
    socket_id: string

    @CreateDateColumn()
    created_at: Date

    @CreateDateColumn()
    updated_at: Date

    constructor() {
        if(!this.id){
            this.id = uuid()
        }
    }
}

export { Connection }
