import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/../libs/prismaDb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json(users);
  } catch (e) {
    console.log(e);
    return res.status(405).end();
  }
}
