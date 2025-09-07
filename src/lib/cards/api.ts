import type * as i from '@/lib/cards/interface';
import {
  cardListSchema,
  type CardListType,
  cardSchema,
  type CardType,
  deleteSchema,
} from '@/lib/cards/type';
import { BASE_API_URL } from '@/lib/constants';
import customFetch from '@/lib/custom-fetch';

export const createCard = async (
  body: i.CreateCardParams
): Promise<CardType> => {
  const data = await customFetch(`${BASE_API_URL}/cards`, cardSchema, {
    method: 'POST',
    body: JSON.stringify({ ...body }),
  });

  return data;
};

export const getCardList = async ({
  size = 10,
  cursorId = 0,
  columnId,
}: i.GetCardListParams): Promise<CardListType> => {
  const queryParams = new URLSearchParams({
    size: String(size),
    columnId: String(columnId),
  });

  if (cursorId && cursorId !== 0) {
    queryParams.append('cursorId', String(cursorId));
  }

  const data = await customFetch(
    `${BASE_API_URL}/cards?${queryParams}`,
    cardListSchema
  );

  return data;
};

export const getCard = async (cardId: number): Promise<CardType> => {
  const data = await customFetch(
    `${BASE_API_URL}/cards/${String(cardId)}`,
    cardSchema
  );

  return data;
};

export const editCard = async ({
  cardId,
  body,
}: i.EditCardParams): Promise<CardType> => {
  const data = await customFetch(
    `${BASE_API_URL}/cards/${String(cardId)}`,
    cardSchema,
    {
      method: 'PUT',
      body: JSON.stringify({
        ...body,
      }),
    }
  );

  return data;
};

export const deleteCard = async (cardId: number): Promise<void> => {
  await customFetch(`${BASE_API_URL}/cards/${String(cardId)}`, deleteSchema, {
    method: 'DELETE',
  });
};
