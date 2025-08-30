import type * as i from '@/lib/columns/interface';
import * as z from '@/lib/columns/type';
import { BASE_API_URL } from '@/lib/constants';
import customFetch from '@/lib/custom-fetch';

export const createColumn = async (
  body: i.CreateColumnsParams
): Promise<z.ColumnType> => {
  const data = await customFetch(`${BASE_API_URL}/columns`, z.columnSchema, {
    method: 'POST',
    body: JSON.stringify({
      ...body,
    }),
  });

  return data;
};

export const getColumnList = async (
  dashboardId: number
): Promise<z.ColumnListType> => {
  const data = await customFetch(
    `${BASE_API_URL}/columns?dashboardId=${String(dashboardId)}`,
    z.columnListSchema
  );

  return data;
};

export const editColumn = async ({
  columnId,
  body,
}: i.EditColumnParams): Promise<z.ColumnType> => {
  const data = await customFetch(
    `${BASE_API_URL}/columns/${String(columnId)}`,
    z.columnSchema,
    {
      method: 'PUT',
      body: JSON.stringify({
        ...body,
      }),
    }
  );

  return data;
};

export const deleteColumn = async (columnId: number): Promise<void> => {
  await customFetch(
    `${BASE_API_URL}/columns/${String(columnId)}`,
    z.deleteSchema,
    {
      method: 'DELETE',
    }
  );
};

export const uploadCardImage = async (
  columnId: number,
  imageFile: File
): Promise<z.ImageType> => {
  const formData = new FormData();

  formData.append('image', imageFile);

  const data = await customFetch(
    `${BASE_API_URL}/columns/${String(columnId)}/card-image`,
    z.imageSchema,
    {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return data;
};
