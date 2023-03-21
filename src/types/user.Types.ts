// Add this at the top of the file
import { Sequelize, Model, Optional } from 'sequelize';

// ...

// Define the interface for the user instance type
interface UserAttributes {
id: number;
username: string;
password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export interface UserInstance
extends Model<UserAttributes, UserCreationAttributes>,
UserAttributes {}