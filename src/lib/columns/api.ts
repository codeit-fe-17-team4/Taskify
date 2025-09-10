import type * as i from '@/lib/columns/interface';
import * as z from '@/lib/columns/type';
import { BASE_API_URL } from '@/lib/constants';
import customFetch from '@/lib/custom-fetch';

export const createColumn = async (
  body: i.CreateColumnBody
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

  try {
    const data = await customFetch(
      `${BASE_API_URL}/columns/${String(columnId)}/card-image`,
      z.imageSchema,
      {
        method: 'POST',
        body: formData,
      }
    );
    return data;
  } catch (error) {
    console.error('이미지 업로드 실패:', error);
    // 이미지 업로드 실패 시 빈 문자열 반환 (서버에서 빈 문자열을 허용하지 않으면 제외됨)
    return {
      imageUrl: '',
    };
  }
};
