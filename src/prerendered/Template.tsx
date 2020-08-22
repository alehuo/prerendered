import React from 'react';
import { HelmetData } from 'react-helmet';

interface TemplateProps {
  helmet: HelmetData
  markup: string;
}

export const Template: React.FC<TemplateProps> = ({ helmet, markup }) => {
  const htmlAttrs = helmet.htmlAttributes.toComponent();
  const bodyAttrs = helmet.bodyAttributes.toComponent();
  const { lang, ...otherHtmlAttrs } = htmlAttrs;
  return (
    <html lang={lang || 'en'} {...otherHtmlAttrs}>
      <head>
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
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
