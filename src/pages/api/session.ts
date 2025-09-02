import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { accessToken } = req.body;

  if (!accessToken) {
    return res.status(400).json({ message: 'Access token is required' });
  }

  // HttpOnly 쿠키 설정
  const cookieOptions = [
    `access_token=${accessToken}`,
    'HttpOnly',
    'SameSite=Lax',
    'Path=/',
    `Max-Age=${15 * 60}`, // 15분
    // 배포 시 Secure 옵션 추가: 'Secure'
  ].join('; ');

  res.setHeader('Set-Cookie', cookieOptions);

  return res.status(200).json({ message: 'Session created successfully' });
}
