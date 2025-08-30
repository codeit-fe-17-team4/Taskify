import Image from 'next/image';
import { useRouter } from 'next/router';
import { type ReactNode , useState } from 'react';

export default function MydashboardEdit(): ReactNode {
  const membersData = [
    { id: 1, name: '정만철', initial: 'J', color: 'bg-amber-200' },
    { id: 2, name: '김태순', initial: 'K', color: 'bg-sky-200' },
    { id: 3, name: '최주협', initial: 'C', color: 'bg-yellow-400' },
    { id: 4, name: '윤지현', initial: 'Y', color: 'bg-orange-300' },
  ];

  const [members, setMembers] = useState(membersData);
  const router = useRouter();
  const { dashboardId } = router.query;
  const dashboardData = [
    { id: 1, name: '비브리지' },
    { id: 2, name: '코드잇' },
    { id: 3, name: '3분기 계획' },
    { id: 4, name: '회의록' },
    { id: 5, name: '중요 문서함' },
  ];

  // 대시보드 이름 불러오기
  const currentDashboard = dashboardData.find(
    (dashboard) => dashboard.id === Number(dashboardId)
  );

  const handleDeleteMember = (memberId: number) => {
    setMembers((prevMembers) =>
      prevMembers.filter((member) => member.id !== memberId)
    );
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* BG global 생성되면 수정 예정 */}
      {/* 헤더 공간 */}
      <div className='pt-16'>
        {/* 사이드바 공간 */}
        <div className='ml-40'>
          <div className='flex w-full max-w-4xl gap-4'>
            <Image
              src='/icon/goback.svg'
              alt='go-back'
              width={10}
              height={10}
            />
            <span>돌아가기</span>
          </div>
          <div className='mt-8 h-[340px] w-[550px] rounded-lg bg-white p-7'>
            <h2 className='text-xl font-bold'>{currentDashboard?.name}</h2>
            <form className='mt-4 space-y-4'>
              {/* 이름 수정 */}
              <div>
                <label htmlFor='name' className='block text-base font-medium'>
                  대시보드 이름
                </label>
                <input
                  id='name'
                  name='name'
                  type='text'
                  defaultValue={currentDashboard?.name}
                  className='mt-3 block h-12 w-full rounded-md border border-gray-300 px-4 focus:border-violet-500 focus:ring-violet-500 focus:outline-none'
                />
              </div>
              <div>
                <div className='mt-3 flex items-center gap-3'>
                  {/* 색상 선택 */}
                  <Image
                    src='/icon/dot-big/greenDotBig.svg'
                    alt='green-dot'
                    width={25}
                    height={25}
                  />
                  <Image
                    src='/icon/dot-big/purpleDotBig.svg'
                    alt='pruple-dot'
                    width={25}
                    height={25}
                  />
                  <Image
                    src='/icon/dot-big/orangeDotBig.svg'
                    alt='orange-dot'
                    width={25}
                    height={25}
                  />
                  <Image
                    src='/icon/dot-big/blueDotBig.svg'
                    alt='blue-dot'
                    width={25}
                    height={25}
                  />
                  <Image
                    src='/icon/dot-big/pinkDotBig.svg'
                    alt='pink-dot'
                    width={25}
                    height={25}
                  />
                </div>
              </div>
              <div className='mt-10 flex'>
                <button
                  type='submit'
                  className='h-12 w-xl cursor-pointer rounded-md bg-violet-500 px-4 py-2 text-sm font-medium text-white hover:bg-violet-600'
                >
                  변경
                </button>
              </div>
            </form>
          </div>
          {/* 구성원 */}
          <div className='mt-8 h-[340px] w-[550px] rounded-lg bg-white p-7'>
            <div className='flex items-center justify-between'>
              <h2 className='text-xl font-bold'>구성원</h2>
              <div className='flex items-center justify-end gap-2'>
                <span className='text-xs'>1 페이지 중 1</span>
                <div className='flex items-center justify-center'>
                  <button className='flex h-7 w-7 cursor-pointer items-center justify-center rounded border border-gray-200 bg-white'>
                    <Image
                      src='/icon/prevPage.svg'
                      alt='prev'
                      width={7}
                      height={7}
                    />
                  </button>
                  <button className='flex h-7 w-7 cursor-pointer items-center justify-center rounded border border-gray-200 bg-white'>
                    <Image
                      src='/icon/nextPage.svg'
                      alt='prev'
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
                  <th className='text-start font-normal text-gray-400'>이름</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => {
                  return (
                    <tr
                      key={member.id}
                      className='flex items-center justify-between border-b border-gray-200'
                    >
                      <td className='py-3'>
                        <div className='flex items-center gap-2'>
                          <div>{member.initial}</div>
                          <span>{member.name}</span>
                        </div>
                      </td>
                      <td className='py-3'>
                        <button
                          type='button'
                          className='w-15.5 cursor-pointer rounded border border-gray-200 px-3 py-1 text-xs text-violet-500 transition-colors hover:bg-gray-50'
                          onClick={() => { handleDeleteMember(member.id); }}
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
          <div className='mt-8 h-[340px] w-[550px] rounded-lg bg-white p-7'>
            <h2 className='text-xl font-bold'>초대 내역</h2>
          </div>
          {/* 대시보드 삭제 */}
          <div>
            <button
              type='submit'
              className='my-6 h-12 w-xs cursor-pointer rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100'
              onClick={() => {
                alert('대시보드를 삭제하시겠습니까?');
              }}
            >
              대시보드 삭제하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
