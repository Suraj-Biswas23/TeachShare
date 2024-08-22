import { NextApiRequest, NextApiResponse } from "next";
import { Material } from "@/model/User";
import dbConnect from "@/utils/dbConnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const userId = req.query.userId as string;
      const materials = await Material.find({ uploadedBy: userId });
      res.status(200).json({ materials });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch materials" });
    }
  } else if (req.method === "POST") {
    try {
      const { title, description, fileType, subject, course, specificCourse, tags, uploadedBy, fileUrl } = req.body;
      const material = await Material.create({
        title,
        description,
        fileType,
        subject,
        course,
        specificCourse,
        tags,
        uploader: uploadedBy,
        fileUrl,
      });
      res.status(201).json({ material });
    } catch (error) {
      res.status(500).json({ error: "Failed to create material" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}