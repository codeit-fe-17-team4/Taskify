import type { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { type ReactNode, useState } from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import InviteMemberModal from '@/components/ui/dashboard-header/invite-member-modal';
import { useTheme } from '@/contexts/ThemeContext';
import {
  dashboardColors,
  dashboardEditMockData,
  membersEmailMockData,
  membersNameMockData,
} from '@/lib/mydashboard-mock-data';
import { getStringFromQuery } from '@/utils/getContextQuery';
import { getThemeIcon } from '@/utils/getThemeIcon';

export default function MydashboardEdit(): ReactNode {
  const router = useRouter();
  const { theme } = useTheme();
  const dashboardId = getStringFromQuery(router.query, 'dashboardId');

  // 스타일 상수들
  const CONTAINER_STYLES = {
    dark: 'bg-[var(--auth-input-bg)]',
    light: 'bg-white',
  };

  const TEXT_STYLES = {
    dark: 'text-[var(--auth-text-strong)]',
  };

  const SUBTEXT_STYLES = {
    dark: 'text-[var(--auth-placeholder)]',
    light: 'text-gray-400',
  };

  const BORDER_STYLES = {
    dark: 'border-[var(--auth-border)]',
    light: 'border-gray-200',
  };

  const INPUT_STYLES = {
    dark: 'border-[var(--auth-input-border)] bg-[var(--auth-input-bg)] text-[var(--auth-text-strong)] placeholder:text-[var(--auth-placeholder)] focus:border-[var(--auth-primary)] focus:ring-[var(--auth-primary)]',
    light: 'border-gray-300 focus:border-violet-500 focus:ring-violet-500',
  };

  const BUTTON_STYLES = {
    dark: 'border-[var(--auth-border)] bg-[var(--auth-input-bg)] text-[var(--auth-text-strong)] hover:bg-[var(--auth-input-bg)]',
    light: 'border-gray-200 bg-white hover:bg-gray-100',
  };

  // 중복된 문자열 상수
  const DELETE_BUTTON_STYLES = {
    dark: 'border-[var(--auth-border)] text-[var(--button-reject-text)] hover:bg-[var(--auth-input-bg)]',
    light: 'border-gray-200 text-violet-500 hover:bg-gray-50',
  };

  // 대시보드 이름 불러오기
  const currentDashboard = dashboardEditMockData.find(
    (dashboard) => dashboard.id === Number(dashboardId)
  );

  const [selectedColor, setSelectedColor] = useState('');
  const handleColorChange = (color: { name: string; bgClass: string }) => {
    setSelectedColor(color.name);
  };

  const [members, setMembers] = useState(membersNameMockData);
  const handleDeleteMember = (memberId: number) => {
    setMembers((prevMembers) =>
      prevMembers.filter((member) => member.id !== memberId)
    );
  };

  const [membersEmails, setMembersEmails] = useState(membersEmailMockData);
  const handleDeleteMemberEmail = (memberId: number) => {
    setMembersEmails((prevMembersEmails) =>
      prevMembersEmails.filter((member) => member.id !== memberId)
    );
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitInviteMember = () => {
    handleCloseModal();
  };

  if (!dashboardId) {
    router.push('/');

    return;
  }

  return (
    <div
      className={`min-h-screen ${
        theme === 'dark' ? 'bg-[var(--auth-bg)]' : 'bg-gray-50'
      }`}
    >
      <div className='mr-120 ml-5 min-w-2xs pt-5'>
        <Link href={`/dashboard/${dashboardId}`}>
          <div className='flex w-full cursor-pointer items-center gap-2'>
            <Image
              src={getThemeIcon('goback', theme)}
              alt='go-back'
              width={10}
              height={10}
            />
            <span className={theme === 'dark' ? TEXT_STYLES.dark : ''}>
              돌아가기
            </span>
          </div>
        </Link>

        {/* 대시보드 정보 수정 */}
        <div
          className={`tablet:min-w-lg mobile:min-w-2xs tablet:w-full mobile:w-full mt-8 h-[340px] w-[620px] rounded-lg p-7 ${
            theme === 'dark' ? CONTAINER_STYLES.dark : CONTAINER_STYLES.light
          }`}
        >
          <h2
            className={`text-xl font-bold ${
              theme === 'dark' ? TEXT_STYLES.dark : ''
            }`}
          >
            {currentDashboard?.name}
          </h2>
          <form className='mt-4 space-y-4'>
            {/* 이름 수정 */}
            <div>
              <label
                htmlFor='name'
                className={`font-sm block text-base ${
                  theme === 'dark' ? TEXT_STYLES.dark : ''
                }`}
              >
                대시보드 이름
              </label>
              <input
                id='name'
                name='name'
                type='text'
                defaultValue={currentDashboard?.name}
                className={`mt-3 block h-12 w-full rounded-md border px-4 focus:outline-none ${
                  theme === 'dark' ? INPUT_STYLES.dark : INPUT_STYLES.light
                }`}
              />
            </div>
            <div>
              <div className='mt-3 flex items-center gap-2'>
                {dashboardColors.map((color) => {
                  return (
                    <button
                      key={color.name}
                      type='button'
                      className={`flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-2 transition-all ${
                        color.bgClass
                      } ${
                        selectedColor === color.name
                          ? 'scale-110 border-transparent'
                          : 'border-transparent hover:scale-110'
                      }`}
                      onClick={() => {
                        handleColorChange(color);
                      }}
                    >
                      {selectedColor === color.name && (
                        <Image
                          src={getThemeIcon('selected', theme)}
                          alt='selected'
                          width={14}
                          height={14}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className='mt-10 flex'>
              <button
                type='submit'
                className='h-12 w-xl cursor-pointer rounded-md px-4 py-2 text-sm font-medium text-white hover:opacity-90'
                style={{
                  backgroundColor: 'var(--auth-primary)',
                }}
              >
                변경
              </button>
            </div>
          </form>
        </div>
        {/* 구성원 */}
        <div
          className={`tablet:w-full mobile:w-full tablet:min-w-lg mobile:min-w-2xs mt-8 h-[340px] w-[620px] rounded-lg pt-5 ${
            theme === 'dark' ? CONTAINER_STYLES.dark : CONTAINER_STYLES.light
          }`}
        >
          <div className='flex items-center justify-between pr-8 pl-8'>
            <h2
              className={`text-xl font-bold ${
                theme === 'dark' ? TEXT_STYLES.dark : ''
              }`}
            >
              구성원
            </h2>
            <div className='flex items-center justify-end gap-2'>
              <span
                className={`text-xs ${
                  theme === 'dark' ? TEXT_STYLES.dark : ''
                }`}
              >
                1 페이지 중 1
              </span>
              <div className='flex items-center justify-center'>
                <button
                  className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded border hover:opacity-80 ${
                    theme === 'dark' ? BUTTON_STYLES.dark : BUTTON_STYLES.light
                  }`}
                >
                  <Image
                    src={getThemeIcon('prevPage', theme)}
                    alt='이전 페이지'
                    width={7}
                    height={7}
                  />
                </button>
                <button
                  className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded border hover:opacity-80 ${
                    theme === 'dark' ? BUTTON_STYLES.dark : BUTTON_STYLES.light
                  }`}
                >
                  <Image
                    src={getThemeIcon('nextPage', theme)}
                    alt='다음 페이지'
                    width={7}
                    height={7}
                  />
                </button>
              </div>
            </div>
          </div>
          <table className='mt-5 w-full text-center text-xs'>
            <thead>
              <tr>
                <th
                  className={`pr-8 pl-8 text-start font-normal ${
                    theme === 'dark'
                      ? SUBTEXT_STYLES.dark
                      : SUBTEXT_STYLES.light
                  }`}
                >
                  이름
                </th>
              </tr>
            </thead>
            <tbody>
              {members.slice(0, 4).map((member, index, arr) => {
                const isLastItem = index === arr.length - 1;

                return (
                  <tr
                    key={member.id}
                    className={`flex items-center justify-between pr-8 pl-8 ${
                      !isLastItem
                        ? `border-b ${theme === 'dark' ? BORDER_STYLES.dark : BORDER_STYLES.light}`
                        : ''
                    }`}
                  >
                    <td className='py-3'>
                      <div className='flex items-center gap-2'>
                        <div className='flex h-5 w-5 items-center justify-center rounded-full bg-sky-200 text-sm text-white'>
                          {member.initial}
                        </div>
                        <span
                          className={theme === 'dark' ? TEXT_STYLES.dark : ''}
                        >
                          {member.name}
                        </span>
                      </div>
                    </td>
                    <td className='py-3'>
                      <button
                        type='button'
                        className={`mobile:w-12 w-15.5 cursor-pointer rounded border px-3 py-1 text-xs transition-colors hover:opacity-80 ${
                          theme === 'dark'
                            ? DELETE_BUTTON_STYLES.dark
                            : DELETE_BUTTON_STYLES.light
                        }`}
                        onClick={() => {
                          handleDeleteMember(member.id);
                        }}
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* 초대 내역 */}
        <div
          className={`tablet:min-w-lg mobile:min-w-2xs tablet:w-full mobile:relative mt-8 h-[400px] w-[620px] rounded-lg pt-5 ${
            theme === 'dark' ? CONTAINER_STYLES.dark : CONTAINER_STYLES.light
          }`}
        >
          <div className='flex items-center justify-between pr-8 pl-8'>
            <h2
              className={`text-xl font-bold ${
                theme === 'dark' ? TEXT_STYLES.dark : ''
              }`}
            >
              초대 내역
            </h2>
            <div className='mobile:absolute mobile:right-5 mobile:top-5 flex items-center justify-end gap-3'>
              <div className='flex items-center justify-end gap-2'>
                <span
                  className={`text-xs ${
                    theme === 'dark' ? TEXT_STYLES.dark : ''
                  }`}
                >
                  1 페이지 중 1
                </span>
                <div className='flex items-center justify-center'>
                  <button
                    className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded border hover:opacity-80 ${
                      theme === 'dark'
                        ? BUTTON_STYLES.dark
                        : BUTTON_STYLES.light
                    }`}
                  >
                    <Image
                      src={getThemeIcon('prevPage', theme)}
                      alt='이전 페이지'
                      width={7}
                      height={7}
                    />
                  </button>
                  <button
                    className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded border hover:opacity-80 ${
                      theme === 'dark'
                        ? BUTTON_STYLES.dark
                        : BUTTON_STYLES.light
                    }`}
                  >
                    <Image
                      src={getThemeIcon('nextPage', theme)}
                      alt='다음 페이지'
                      width={7}
                      height={7}
                    />
                  </button>
                </div>
              </div>
              <button
                className='mobile:absolute mobile:right-3 mobile:top-10 flex cursor-pointer items-center gap-2 rounded-sm py-1 pr-2 pl-2 text-white hover:opacity-90'
                style={{
                  backgroundColor: 'var(--auth-primary)',
                }}
                onClick={handleOpenModal}
              >
                <Image
                  src={getThemeIcon('addmember', theme)}
                  alt='add-member'
                  width={20}
                  height={20}
                />
                <span className='text-xs'>초대하기</span>
              </button>
            </div>
          </div>
          <div>
            <table className='mt-5 w-full text-center text-xs'>
              <thead>
                <tr>
                  <th
                    className={`pr-8 pl-8 text-start font-normal ${
                      theme === 'dark'
                        ? SUBTEXT_STYLES.dark
                        : SUBTEXT_STYLES.light
                    }`}
                  >
                    이메일
                  </th>
                </tr>
              </thead>
              <tbody>
                {membersEmails.slice(0, 5).map((member, index, arr) => {
                  const isLastItem = index === arr.length - 1;

                  return (
                    <tr
                      key={member.id}
                      className={`flex items-center justify-between pr-8 pl-8 ${
                        !isLastItem
                          ? `border-b ${theme === 'dark' ? BORDER_STYLES.dark : BORDER_STYLES.light}`
                          : ''
                      }`}
                    >
                      <td className='py-3'>
                        <div className='flex items-center gap-2'>
                          <span
                            className={theme === 'dark' ? TEXT_STYLES.dark : ''}
                          >
                            {member.email}
                          </span>
                        </div>
                      </td>
                      <td className='py-3'>
                        <button
                          type='button'
                          className={`mobile:w-12 w-16 cursor-pointer rounded border px-3 py-1 text-xs transition-colors hover:opacity-80 ${
                            theme === 'dark'
                              ? DELETE_BUTTON_STYLES.dark
                              : DELETE_BUTTON_STYLES.light
                          }`}
                          onClick={() => {
                            handleDeleteMemberEmail(member.id);
                          }}
                        >
                          취소
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {/* 대시보드 삭제 */}
        <div>
          <button
            type='submit'
            className={`mobile:max-w-2xs my-6 h-12 w-xs cursor-pointer rounded-sm border px-4 py-2 text-sm font-medium hover:opacity-80 ${
              theme === 'dark'
                ? 'border-[var(--auth-border)] text-[var(--auth-text-strong)] hover:bg-[var(--auth-input-bg)]'
                : 'border-gray-300 hover:bg-gray-100'
            }`}
            onClick={() => {
              alert('대시보드를 삭제하시겠습니까?');
            }}
          >
            대시보드 삭제하기
          </button>
        </div>
        <InviteMemberModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmitInviteMember}
        />
      </div>
    </div>
  );
}
MydashboardEdit.getLayout = function getLayout(page: ReactNode) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
/**
 * 이재준 작성 - 인증되지 않은 사용자가 대시보드 편집 페이지에 접근할 때 로그인 페이지로 리다이렉트하기 위해 추가
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;

  const accessToken = req.cookies.access_token;

  if (!accessToken) {
    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    };
  }

  return { props: {} };
};
