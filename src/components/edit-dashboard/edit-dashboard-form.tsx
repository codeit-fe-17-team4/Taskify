// 대시보드 이름 및 색상 변경 UI 컴포넌트

import Image from 'next/image';
import { useState } from 'react';
import Button from '@/components/ui/button/button';

const colorCode: { [key: string]: string } = {
  '#7AC555': 'bg-green-500',
  '#760DDE': 'bg-purple-700',
  '#FFA500': 'bg-orange-500',
  '#76A5EA': 'bg-blue-300',
  '#E876EA': 'bg-pink-400',
};

interface EditDashboardFormProps {
  prevTitle: string;
  prevColor: string;
  onSubmit: (formData: { title: string; color: string }) => void;
}

export default function EditDashboardForm({
  prevTitle,
  prevColor,
  onSubmit,
}: EditDashboardFormProps) {
  const [changeTitle, setChangeTitle] = useState(prevTitle);
  const [changeColor, setChangeColor] = useState(prevColor);

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ title: changeTitle, color: changeColor });
  };

  return (
    <div className='tablet:min-w-lg mobile:min-w-2xs tablet:w-full mobile:w-full mt-8 h-[340px] w-[620px] rounded-lg bg-white p-7'>
      <h2 className='text-xl font-bold'>{prevTitle}</h2>
      <form className='mt-4 space-y-4' onSubmit={handleEditSubmit}>
        {/* 이름 수정 */}
        <div>
          <label htmlFor='name' className='font-sm block text-base'>
            대시보드 이름
          </label>
          <input
            id='name'
            key={prevTitle}
            value={changeTitle}
            className='mt-3 block h-12 w-full rounded-md border border-gray-300 px-4 focus:border-violet-500 focus:ring-violet-500 focus:outline-none'
            onChange={(e) => {
              setChangeTitle(e.target.value);
            }}
          />
        </div>
        <div>
          <div className='mt-3 flex items-center gap-2'>
            {Object.entries(colorCode).map(([hex, color]) => {
              return (
                <button
                  key={hex}
                  type='button'
                  className={`flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-2 transition-all ${color} ${
                    changeColor === hex
                      ? 'scale-110 border-transparent'
                      : 'border-transparent hover:scale-110'
                  }`}
                  onClick={() => {
                    setChangeColor(hex);
                  }}
                >
                  {changeColor === hex && (
                    <Image
                      src='/icon/selected.svg'
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
          <Button variant='primary' backgroundColor='violet' label='변경' />
        </div>
      </form>
    </div>
  );
}
