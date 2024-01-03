import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
//connect prisma next

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { email, password, name, username } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = "John Doe"; // get the user from prisma next

    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
    return res.status(405).end();
  }
}
