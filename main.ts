import { createServer } from '#gear:server';
import { serverOptions } from '#workshop:app.config.ts';

/**
 * The main entry point for the application.
 * 
 * It's only used to bootstrap the server, and should not contain any application logic.
 */
export default await createServer(serverOptions).start();