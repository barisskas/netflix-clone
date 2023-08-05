import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }
  try {
    const { movieId } = req.query;
    if (!movieId) throw new Error("Movie ID required");

    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId as string,
      },
    });

    if (!movie) throw new Error("Movie not found");

    return res.status(200).json(movie);
  } catch (error) {
    return res.status(500).end();
  }
}
