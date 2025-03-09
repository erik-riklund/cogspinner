/**
 * Configuration settings for the application.
 */
export interface AppSettings
{
  /**
   * The language code for the application (e.g., "en", "es").
   */
  lang: string;

  /**
   * The character set used by the application (e.g., "utf-8").
   */
  charset: string;

  /**
   * The main title of the application.
   */
  title: string;
}