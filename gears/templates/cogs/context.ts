import { appSettings } from '#workshop:app.config';
import type { RenderContext } from '#type:templates';

/**
 * Creates and returns a new `RenderContext` object, pre-populated with default values from `appSettings`.
 * This function provides a convenient way to initialize the context for rendering a page.
 */
export function useRenderContext (): RenderContext
{
  return {
    /**
     * ?
     */
    lang: appSettings.lang,

    /**
     * An object to store stylesheets, where keys are template IDs and values are stylesheet content.
     */
    styles: {},

    /**
     * An array to store HTML strings representing elements that should be included in the `<head>` of the page.
     */
    head: {
      global:
        `<meta charset="${ appSettings.charset }" />\n` +
        `<meta name="viewport" content="width=device-width, initial-scale=1" />`
    },

    /**
     * ?
     */
    data: {},

    /**
     * The main title of the page, initialized with the value from `appSettings`.
     */
    title: appSettings.title,

    /**
     * Registers a stylesheet with the given template ID and content. If a stylesheet with
     * the same ID does not already exist, it is added to the styles object.
     */
    registerStylesheet: function (id: string, stylesheet: string): void
    {
      this.styles[id] = this.styles[id] ?? stylesheet;
    },

    /**
     * Adds an HTML string representing one or more elements to added to the `head` array.
     * This allows for dynamically adding elements to the `<head>` of the page during rendering.
     */
    includeElement: function (id: string, element: string): void
    {
      this.head[id] = this.head[id] ?? element;
    }
  };
};