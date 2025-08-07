import sequelize from './sequelize'; // Ajusta la ruta a tu instancia de Sequelize
import Logger from '../logging/logger';
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    // Método para probar la conexión
    await sequelize.authenticate();

    Logger.info('✅ Conexión a la base de datos establecida');
    return true;
  } catch (error) {
    Logger.error('❌ Error conectando a la base de datos', {
      context: 'Database',
      error: error instanceof Error ? error.message : 'Error desconocido',
    });
    return false;
  }
}