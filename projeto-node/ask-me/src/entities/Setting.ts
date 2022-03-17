import {Column, CreateDateColumn, Entity, PrimaryColumn} from "typeorm"
import { v4 as uuid } from 'uuid'

@Entity('settings')
class Setting {
    @PrimaryColumn()
    readonly id: string

    @Column()
    username: string
    
    @Column()
    chat: boolean

    @CreateDateColumn()
    created_at: Date

    @CreateDateColumn()
    updated_at: Date

    constructor() {
        /**
         * Será executado sempre que não houver id, significa que um novo
         * settings está sendo criado, portanto um uuid será gerado.
         */

        if(!this.id){
            this.id = uuid()
        }
    }
}

export { Setting }
