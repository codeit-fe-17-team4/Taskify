import { useCallback, useEffect, useState } from 'react';
import { type ColumnType, TAG_COLORS } from '@/components/dashboard/type';
import { getColumnList } from '@/lib/columns/api';
import { getMemberList } from '@/lib/members/api';

interface UseDashboardDataProps {
  dashboardId: number;
  getCardList: (params: { columnId: number; size: number }) => Promise<{
    cursorId: number | null;
    totalCount: number;
    cards: {
      id: number;
      title: string;
      description: string;
      tags: string[];
      dueDate: string | null;
      imageUrl: string | null;
      assignee: {
        id: number;
        nickname: string;
        profileImageUrl: string | null;
      };
      teamId: string;
      columnId: number;
      createdAt: string;
      updatedAt: string;
      order?: number;
    }[];
  }>;
}

export const useDashboardData = ({
  dashboardId,
  getCardList,
}: UseDashboardDataProps) => {
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [members, setMembers] = useState<
    {
      userId: number;
      nickname: string;
      email: string;
      profileImageUrl: string | null;
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * 내부에서 함수들 정의
   */
  const getTagColorByLabel = (
    label: string
  ): 'blue' | 'pink' | 'green' | 'brown' | 'red' => {
    const hash = [...label].reduce((acc, char) => acc + char.charCodeAt(0), 0);

    return TAG_COLORS[hash % TAG_COLORS.length];
  };

  const getCardOrder = useCallback(
    (columnId: string): string[] | null => {
      const orderKey = `card-order-${dashboardId}-${columnId}`;
      const saved = localStorage.getItem(orderKey);

      return saved ? (JSON.parse(saved) as string[]) : null;
    },
    [dashboardId]
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        const columnsData = await getColumnList(Number(dashboardId));
        const columnsWithTasks = await Promise.all(
          columnsData.data.map(async (column) => {
            const cardsData = await getCardList({
              columnId: column.id,
              size: 100,
            });

            const cardTasks = cardsData.cards.map((card) => {
              return {
                id: String(card.id),
                title: card.title,
                description: card.description,
                tags: card.tags.map((tag) => {
                  return {
                    label: tag,
                    color: getTagColorByLabel(tag),
                  };
                }),
                dueDate: card.dueDate || undefined,
                imageUrl: card.imageUrl || '',
                manager: {
                  id: String(card.assignee.id),
                  name: card.assignee.nickname,
                  nickname: card.assignee.nickname,
                  profileColor: '#7AC555',
                  profileImageUrl: card.assignee.profileImageUrl,
                },
              };
            });

            const savedOrder = getCardOrder(String(column.id));
            const sortedTasks = savedOrder
              ? [
                  ...savedOrder
                    .map((taskId) =>
                      cardTasks.find((task) => task.id === taskId)
                    )
                    .filter(
                      (task): task is NonNullable<typeof task> =>
                        task !== undefined
                    ),
                  ...cardTasks.filter((task) => !savedOrder.includes(task.id)),
                ]
              : cardTasks;

            return {
              id: String(column.id),
              title: column.title,
              tasks: sortedTasks,
            };
          })
        );

        setColumns(columnsWithTasks);

        const membersData = await getMemberList({
          dashboardId: Number(dashboardId),
          size: 100,
        });

        setMembers(membersData.members);
      } catch {
        setColumns([
          { id: '1', title: 'To do', tasks: [] },
          { id: '2', title: 'On progress', tasks: [] },
          { id: '3', title: 'Done', tasks: [] },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [dashboardId, getCardList, getCardOrder]);

  return {
    columns,
    setColumns,
    members,
    isLoading,
  };
};
