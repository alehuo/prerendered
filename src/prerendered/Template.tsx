import React from 'react';
import { HelmetData } from 'react-helmet';

interface TemplateProps {
  helmet: HelmetData
  markup: string;
  prerenderedData?: string;
}

export const Template: React.FC<TemplateProps> = ({ helmet, markup, prerenderedData = '' }) => {
  const htmlAttrs = helmet.htmlAttributes.toComponent();
  const bodyAttrs = helmet.bodyAttributes.toComponent();
  const { lang, ...otherHtmlAttrs } = htmlAttrs;
  return (
    <html lang={lang || 'en'} {...otherHtmlAttrs}>
      <head>
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        <script dangerouslySetInnerHTML={{ __html: `window.__PRERENDERED__ = '${prerenderedData}'` }} />
      </head>
      <body
        {...bodyAttrs}
      >
        <div
          id="app"
          dangerouslySetInnerHTML={{
            __html: markup,
          }}
        />
      </body>
    </html>
  );
};
