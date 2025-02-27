import { createServer } from '#gear:server';

/**
 * The main entry point for the application.
 * 
 * This file is responsible for creating and starting the server. It should not
 * contain any application logic, and is only used to bootstrap the server.
 */
export default await createServer().start();