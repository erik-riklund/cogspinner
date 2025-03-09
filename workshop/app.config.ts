import type { AppSettings } from '~types';
import type { ServerOptions } from '#type:server';

/**
 * Configuration options for the server.
 */
export const serverOptions: ServerOptions =
{
  /**
   * The port number on which the server will listen
   * for incoming requests (default: `81`).
   */
  port: 81
};

/**
 * Application settings.
 */
export const appSettings: AppSettings =
{
  /**
   * The language code for the application (default: `en`).
   */
  lang: 'en',

  /**
   * The character set encoding of the rendered HTML (default: `utf-8`).
   */
  charset: 'utf-8',

  /**
   * The main title of the application.
   */
  title: 'Cogspinner'
};
