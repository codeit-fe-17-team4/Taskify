import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });

 return;
  }

  // access_token 쿠키 만료
  const cookieOptions = [
    'access_token=',
    'HttpOnly',
    'SameSite=Lax',
    'Path=/',
    'Max-Age=0', // 즉시 만료
    // 배포 시 Secure 옵션 추가: 'Secure'
  ].join('; ');

  res.setHeader('Set-Cookie', cookieOptions);

  res.status(200).json({ message: 'Logged out successfully' });
}
