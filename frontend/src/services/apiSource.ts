import api from './api';
import { SourceModel, CreateSourceModel, UpdateSourceModel } from '../models/Source.model';

type ResponseKeys = 'source' | 'sources';

const handleRequest = async <T>(
  method: 'get' | 'post' | 'patch' | 'delete',
  url: string,
  responseKey: ResponseKeys,
  data?: SourceModel | CreateSourceModel | UpdateSourceModel | string
): Promise<T | null> => {
  try {
    const response = await api[method](url, data);
    return response.data.data[responseKey];
  } catch (error) {
    throw new Error(`${method.toUpperCase()} request to ${url} failed`);
  }
};

export const getSources = async () => {
  return await handleRequest<SourceModel[]>('get', '/source', 'sources');
};

export const createSource = async (source: CreateSourceModel) => {
  return await handleRequest<SourceModel>('post', '/source', 'source', source);
};

export const updateSource = async ({ source, sourceId }: UpdateSourceModel) => {
  return await handleRequest<SourceModel>('patch', `/source/${sourceId}`, 'source', source);
};

export const deleteSource = async (sourceId: string) => {
  return await handleRequest<SourceModel>('delete', `/source/${sourceId}`, 'source');
};
