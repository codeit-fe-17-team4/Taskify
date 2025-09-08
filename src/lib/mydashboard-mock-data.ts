import { email } from 'zod';

export const DASHBOARD_COLORS = {
  green: 'bg-lime-500',
  purple: 'bg-purple-700',
  orange: 'bg-amber-500',
  blue: 'bg-blue-300',
  pink: 'bg-fuchsia-400',
};

export const mydashboardMockData = [
  { id: 1, title: '비브리지', dotcolor: DASHBOARD_COLORS.green, isOwner: true },
  { id: 2, title: '코드잇', dotcolor: DASHBOARD_COLORS.purple, isOwner: false },
  {
    id: 3,
    title: '3분기 계획',
    dotcolor: DASHBOARD_COLORS.orange,
    isOwner: false,
  },
  { id: 4, title: '회의록', dotcolor: DASHBOARD_COLORS.blue, isOwner: true },
  {
    id: 5,
    title: '중요 문서함',
    dotcolor: DASHBOARD_COLORS.pink,
    isOwner: false,
  },
  {
    id: 6,
    title: '프로덕트 디자인',
    dotcolor: DASHBOARD_COLORS.green,
    isOwner: true,
  },
  {
    id: 7,
    title: '새로운 기획 문서',
    dotcolor: DASHBOARD_COLORS.purple,
    isOwner: true,
  },
  { id: 8, title: '유닛 A', dotcolor: DASHBOARD_COLORS.orange, isOwner: false },
  { id: 9, title: '유닛 B', dotcolor: DASHBOARD_COLORS.blue, isOwner: false },
];

export const mydashboardInviteMockData = {
  cursorId: 0,
  invitations: [
    {
      id: 1,
      inviter: { nickname: '손동희', email: 'donghee@example.com', id: 101 },
      teamId: 'team-1',
      dashboard: { title: '프로덕트 디자인', id: 201 },
      invitee: { nickname: '나', email: 'myemail1@example.com', id: 999 },
      inviteAccepted: false,
      createdAt: '2025-09-05T10:00:00.000Z',
      updatedAt: '2025-09-05T10:00:00.000Z',
    },
    {
      id: 2,
      inviter: { nickname: '안귀영', email: 'gwiyeong@example.com', id: 102 },
      teamId: 'team-2',
      dashboard: { title: '새로운 기획 문서', id: 202 },
      invitee: { nickname: '나', email: 'myemail2@example.com', id: 999 },
      inviteAccepted: true,
      createdAt: '2025-09-05T11:00:00.000Z',
      updatedAt: '2025-09-05T11:00:00.000Z',
    },
    {
      id: 3,
      inviter: { nickname: '장혁', email: 'janghyuk@example.com', id: 103 },
      teamId: 'team-3',
      dashboard: { title: '유닛 A', id: 203 },
      invitee: { nickname: '나', email: 'myemail3@example.com', id: 999 },
      inviteAccepted: false,
      createdAt: '2025-09-05T12:00:00.000Z',
      updatedAt: '2025-09-05T12:00:00.000Z',
    },
    {
      id: 4,
      inviter: { nickname: '강나무', email: 'kangnamu@example.com', id: 104 },
      teamId: 'team-4',
      dashboard: { title: '유닛 B', id: 204 },
      invitee: { nickname: '나', email: 'myemail4@example.com', id: 999 },
      inviteAccepted: true,
      createdAt: '2025-09-05T13:00:00.000Z',
      updatedAt: '2025-09-05T13:00:00.000Z',
    },
    {
      id: 5,
      inviter: { nickname: '김태현', email: 'taehyun@example.com', id: 105 },
      teamId: 'team-5',
      dashboard: { title: '유닛 C', id: 205 },
      invitee: { nickname: '나', email: 'myemail5@example.com', id: 999 },
      inviteAccepted: false,
      createdAt: '2025-09-05T14:00:00.000Z',
      updatedAt: '2025-09-05T14:00:00.000Z',
    },
    {
      id: 6,
      inviter: { nickname: '김태현', email: 'taehyun@example.com', id: 105 },
      teamId: 'team-6',
      dashboard: { title: '유닛 D', id: 206 },
      invitee: { nickname: '나', email: 'myemail6@example.com', id: 999 },
      inviteAccepted: true,
      createdAt: '2025-09-05T15:00:00.000Z',
      updatedAt: '2025-09-05T15:00:00.000Z',
    },
    {
      id: 7,
      inviter: { nickname: '권수형', email: 'soohyeong@example.com', id: 106 },
      teamId: 'team-7',
      dashboard: { title: '유닛 E', id: 207 },
      invitee: { nickname: '나', email: 'myemail7@example.com', id: 999 },
      inviteAccepted: false,
      createdAt: '2025-09-05T16:00:00.000Z',
      updatedAt: '2025-09-05T16:00:00.000Z',
    },
    {
      id: 8,
      inviter: { nickname: '박서현', email: 'seohyun@example.com', id: 107 },
      teamId: 'team-8',
      dashboard: { title: '유닛 F', id: 208 },
      invitee: { nickname: '나', email: 'myemail8@example.com', id: 999 },
      inviteAccepted: true,
      createdAt: '2025-09-05T17:00:00.000Z',
      updatedAt: '2025-09-05T17:00:00.000Z',
    },
    {
      id: 9,
      inviter: { nickname: '심예진', email: 'yejin@example.com', id: 108 },
      teamId: 'team-9',
      dashboard: { title: '유닛 G', id: 209 },
      invitee: { nickname: '나', email: 'myemail9@example.com', id: 999 },
      inviteAccepted: false,
      createdAt: '2025-09-05T18:00:00.000Z',
      updatedAt: '2025-09-05T18:00:00.000Z',
    },
    {
      id: 10,
      inviter: { nickname: '이재준', email: 'jaejun@example.com', id: 109 },
      teamId: 'team-10',
      dashboard: { title: '유닛 H', id: 210 },
      invitee: { nickname: '나', email: 'myemail10@example.com', id: 999 },
      inviteAccepted: true,
      createdAt: '2025-09-05T19:00:00.000Z',
      updatedAt: '2025-09-05T19:00:00.000Z',
    },
  ],
};

export const dashboardEditMockData = [
  { id: 1, name: '비브리지' },
  { id: 2, name: '코드잇' },
  { id: 3, name: '3분기 계획' },
  { id: 4, name: '회의록' },
  { id: 5, name: '중요 문서함' },
];

export const dashboardColors = [
  { name: 'green', bgClass: DASHBOARD_COLORS.green },
  { name: 'purple', bgClass: DASHBOARD_COLORS.purple },
  { name: 'orange', bgClass: DASHBOARD_COLORS.orange },
  { name: 'blue', bgClass: DASHBOARD_COLORS.blue },
  { name: 'pink', bgClass: DASHBOARD_COLORS.pink },
];

export const membersMockData = [
  { id: 1, name: '정만철', initial: 'J', email: 'codeitA@codeit.com' },
  { id: 2, name: '김태순', initial: 'K', email: 'codeitB@codeit.com' },
  { id: 3, name: '최주협', initial: 'C', email: 'codeitC@codeit.com' },
  { id: 4, name: '윤지현', initial: 'Y', email: 'codeitD@codeit.com' },
  { id: 5, name: '심예진', initial: 'S', email: 'codeitE@codeit.com' },
  { id: 5, name: '권수형', initial: 'S', email: 'codeitF@codeit.com' },
  { id: 5, name: '박서현', initial: 'S', email: 'codeitG@codeit.com' },
  { id: 5, name: '이재준', initial: 'S', email: 'codeitH@codeit.com' },
];
