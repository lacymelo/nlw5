import { EntityRepository, Repository } from "typeorm";
import { Connection } from "../entities/Connection";

@EntityRepository(Connection)
class ConnectionsRepositories extends Repository<Connection> {}

export { ConnectionsRepositories }