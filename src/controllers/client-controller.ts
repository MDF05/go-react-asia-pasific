import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import redisClient from "../utils/redis";
import { uploadToS3 } from "../utils/s3";

const prisma = new PrismaClient();

export const createClient = async (req: Request, res: Response) => {
  try {
    const { name, slug, isProject, selfCapture, clientPrefix, address, phoneNumber, city } = req.body;
    
    let clientLogo = "no-image.jpg";
    if (req.file) {
      clientLogo = await uploadToS3(req.file);
    }

    const client = await prisma.myClient.create({
      data: {
        name,
        slug,
        isProject,
        selfCapture,
        clientPrefix,
        clientLogo,
        address,
        phoneNumber,
        city,
      },
    });

  
    await redisClient.set(client.slug, JSON.stringify(client));

    res.json(client);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;

    const client = await prisma.myClient.findUnique({
      where: { slug },
    });

    if (!client) {
      res.status(404).json({ message: "Client not found" });
      return;
    }

    res.json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const data = req.body;

    if (req.file) {
      data.clientLogo = await uploadToS3(req.file);
    }

    const updatedClient = await prisma.myClient.update({ where: { slug }, data });

  
    await redisClient.del(slug);
    await redisClient.set(slug, JSON.stringify(updatedClient));

    res.json(updatedClient);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const deletedClient = await prisma.myClient.update({
      where: { slug },
      data: { deletedAt: new Date() },
    });

  
    await redisClient.del(slug);

    res.json({ message: "Client deleted (soft delete)", deletedClient });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
