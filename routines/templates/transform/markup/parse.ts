import html from 'html-parser';
import { createTask } from '#gear:routines';

import type { TemplateTransformContext } from '../../context';

/**
 * ?
 */
export default createTask<TemplateTransformContext>(
  async (context) =>
  {
    context.document = {};

    // console.log(Bun.inspect(html.parse(context.content)));
    html.parse(context.content, {
      openElement: function (name) { console.log('open: %s', name); },
      closeOpenedElement: function (name, token, unary) { console.log('token: %s, unary: %s', token, unary); },
      closeElement: function (name) { console.log('close: %s', name); },
      comment: function (value) { console.log('comment: %s', value); },
      cdata: function (value) { console.log('cdata: %s', value); },
      attribute: function (name, value) { console.log('attribute: %s=%s', name, value); },
      docType: function (value) { console.log('doctype: %s', value); },
      text: function (value) { console.log('text: %s', value); }
    });
  }
);