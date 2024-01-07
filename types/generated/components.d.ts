import type { Schema, Attribute } from '@strapi/strapi';

export interface BlocksHeader extends Schema.Component {
  collectionName: 'components_blocks_headers';
  info: {
    displayName: 'header';
  };
  attributes: {
    theme: Attribute.Enumeration<['one', 'two', 'three']>;
    label: Attribute.String;
    title: Attribute.String;
  };
}

export interface BlocksHero extends Schema.Component {
  collectionName: 'components_blocks_heroes';
  info: {
    displayName: 'hero';
    description: '';
  };
  attributes: {
    images: Attribute.Media;
    header: Attribute.Component<'blocks.header'>;
    text: Attribute.String;
    buttons: Attribute.Component<'elements.buttons', true>;
  };
}

export interface ElementsButtons extends Schema.Component {
  collectionName: 'components_elements_buttons';
  info: {
    displayName: 'buttons';
  };
  attributes: {
    href: Attribute.String;
    label: Attribute.String;
    target: Attribute.Enumeration<['_blank', '_another']>;
    isExternal: Attribute.Boolean;
  };
}

export interface SeoMeta extends Schema.Component {
  collectionName: 'components_seo_metas';
  info: {
    displayName: 'meta';
  };
  attributes: {
    name: Attribute.String;
    content: Attribute.String;
  };
}

export interface SeoSeo extends Schema.Component {
  collectionName: 'components_seo_seos';
  info: {
    displayName: 'seo';
  };
  attributes: {
    metaTitle: Attribute.String;
    metaDescription: Attribute.String;
    meta: Attribute.Component<'seo.meta', true>;
    metaImage: Attribute.Media;
    preventIndexing: Attribute.Boolean;
    structuredData: Attribute.JSON;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'blocks.header': BlocksHeader;
      'blocks.hero': BlocksHero;
      'elements.buttons': ElementsButtons;
      'seo.meta': SeoMeta;
      'seo.seo': SeoSeo;
    }
  }
}
