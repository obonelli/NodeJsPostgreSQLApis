import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "postgres://postgres:123@localhost:5432/tiendavirtual",
  {
    dialect: "postgres",
    logging: false,
  }
);

async function validateConnection() {
  try {
    await sequelize.authenticate();
    console.log(
      "La conexión a la base de datos se ha establecido correctamente."
    );
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
  }
}

validateConnection();

async function syncDatabase() {
  try {
    await sequelize.sync({ alter: true });
    console.log('Las tablas han sido sincronizadas correctamente');
  } catch (error) {
    console.error('Error al sincronizar las tablas:', error);
  }
}

syncDatabase();
export default sequelize;
