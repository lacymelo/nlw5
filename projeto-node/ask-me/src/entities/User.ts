import {Column, CreateDateColumn, Entity, PrimaryColumn} from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity('users')
class User {
    @PrimaryColumn()
    readonly id: string

    @Column()
    email: string

    @CreateDateColumn()
    created_at: Date

    constructor(){
        /**
         * Será executado sempre que não houver id, significa que um novo
         * user está sendo criado, portanto um uuid será gerado.
         */

        if(!this.id){
            this.id = uuid()
        }
    }
}

export { User }
