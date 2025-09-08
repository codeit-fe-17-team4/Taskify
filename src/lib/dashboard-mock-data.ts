import type { ColumnType, TaskType } from '@/components/dashboard/type';

// Mock 컬럼 데이터
export const mockColumns: ColumnType[] = [
  {
    id: '1',
    title: 'To do',
    tasks: [
      {
        id: 't1',
        title: 'Test',
        description:
          '새로운 테스트 태스크입니다. sample-image를 포함한 테스트용 데이터입니다.',
        tags: [
          { label: '테스트', color: 'blue' },
          { label: '샘플', color: 'green' },
        ],
        dueDate: '2025-01-15 14:30',
        imageUrl: '/dashboard/sample-image.png',
        manager: {
          id: 'm1',
          name: '테스터',
          nickname: '테스터',
          profileColor: '#3B82F6',
        },
      },
      {
        id: 't3',
        title: '123433333',
        description: '123433333',
        tags: [
          { label: '프로젝트', color: 'red' },
          { label: '백엔드', color: 'green' },
        ],
        dueDate: '2025-08-28 10:00',
        imageUrl: '',
        manager: {
          id: 'm3',
          name: 'te',
          nickname: 'te',
          profileColor: '#8B5CF6',
        },
      },
    ],
  },
  {
    id: '2',
    title: 'On progress',
    tasks: [
      {
        id: 't2',
        title: '2222',
        description: '2222',
        tags: [{ label: '프로젝트', color: 'red' }],
        dueDate: '2025-08-28 10:30',
        imageUrl: '',
        manager: {
          id: 'm2',
          name: 'te',
          nickname: 'te',
          profileColor: '#8B5CF6',
        },
      },
    ],
  },
  {
    id: '3',
    title: 'Done',
    tasks: [],
  },
];

// Mock 프로필 색상들
export const mockProfileColors = [
  '#8B5CF6', // 보라색
  '#10B981', // 초록색
  '#F59E0B', // 주황색
  '#EF4444', // 빨간색
  '#3B82F6', // 파란색
] as const;
