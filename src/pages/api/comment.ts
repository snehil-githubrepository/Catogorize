import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/../libs/prismaDb";
import serverAuth from "../../../libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { postId } = req.query;
    const { body } = req.body;
    const { currentUser } = await serverAuth(req, res);

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID");
    }

    const comment = await prisma.comment.create({
      data: {
        body,
        userId: currentUser.id,
        postId,
      },
    });

    //notif part
    try {
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });
      if (post?.userId) {
        await prisma.notification.create({
          data: {
            body: "Someone replied to your Post!",
            userId: post.userId,
          },
        });
        await prisma.user.update({
          where: {
            id: post.userId,
          },
          data: {
            hasNotification: true,
          },
        });
      }
    } catch (e) {
      console.log(e);
    }

    return res.status(200).json(comment);
  } catch (e) {
    console.log(e);
    return res.status(405).end();
  }
}
