import type { Tree } from './transform/markup/create-tree';

/**
 * ?
 */
export interface TemplateTransformContext
{
  /**
   * ?
   */
  id: string;

  /**
   * ?
   */
  file: string;

  /**
   * ?
   */
  head: string | null;

  /**
   * ?
   */
  style: string | null;

  /**
   * ?
   */
  template: string | null;

  /**
   * ?
   */
  tree: Tree;

  /**
   * ?
   */
  output: string[];

  /**
   * ?
   */
  result: string;
}

/**
 * ?
 */
export interface CreateManifestContext
{
  /**
   * ?
   */
  templates: { id: string, name: string; }[];
}