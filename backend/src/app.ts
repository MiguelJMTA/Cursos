import express from 'express';
import config from '@infra/config/env';
import Logger from '@infra/logging/logger';
import { checkDatabaseConnection } from '@infra/database/healthCheck';
import sequelize from '@infra/database/sequelize';
import { errorHandler } from '@infra/utils/error.hangler';

async function startServer() {
  const app = express();

  // 1. Verificar conexión a BD antes de iniciar
  const dbConnected = await checkDatabaseConnection();

  if (!dbConnected) {
    Logger.error('La aplicación no puede iniciar sin conexión a la base de datos');
    process.exit(1);
  }

  // 2. Configurar middlewares y rutas
  app.use(express.json());
  // ... resto de la configuración
  app.use(errorHandler)
  // 3. Iniciar servidor
  const server = app.listen(config.server.port, () => {
    Logger.info(`🚀 Servidor iniciado en modo ${config.env} en puerto ${config.server.port}`);
  });

  // 4. Manejar cierre elegante
  const shutdown = async () => {
    Logger.info('Recibida señal de apagado. Cerrando servidor...');
    server.close(async () => {
      Logger.info('Servidor HTTP cerrado');
      await sequelize.close();
      Logger.info('Conexión a BD cerrada');
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

startServer().catch((error) => {
  Logger.error('Error crítico durante el inicio', {
    context: 'Bootstrap',
    error: error instanceof Error ? error.message : 'Error desconocido',
  });
  process.exit(1);
});
