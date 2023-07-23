import axios from 'axios';
import { generateAsync } from 'stability-client';
import { Injectable } from '@nestjs/common';

import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

@Injectable()
export class ImagesService {
  create(createImageDto: CreateImageDto) {
    return 'This action adds a new image';
  }

  findAll() {
    return `This action returns all images`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }

  async processImage(name: string, email: string): Promise<any> {
    // Use the name and email to generate the AI result and create the image
    // You can use any AI library or algorithm to generate the image

    try {
      const { res, images }: any = await generateAsync({
        prompt: name + email + Math.random(),
        apiKey: process.env.STABLE_DIFFUSION,
        width: 512,
        height: 512,
        steps: 10,
        engine: 'stable-diffusion-512-v2-1',
        cfgScale: 10,
        noStore: true,
        samples: 1,
        diffusion: 'ddim',
      });

      const responseApi = res;
      const imageResponse = images[0];

      const image = Buffer.from(imageResponse.buffer, 'base64');

      const response = { responseApi, image };
      return response;
    } catch (error) {
      console.log('error', error);
    }

    return ''; // Return an empty string if the image generation fails
  }

  async sendToBlockchain(image: Buffer): Promise<string> {
    // Use the provided image and send it to the blockchain
    // You can use a free and performant blockchain service like IPFS (InterPlanetary File System)
    // Upload the image to IPFS and obtain the transaction ID or hash
    const { data } = await axios.post('https://api.example.com/upload', {
      image: image.toString('base64'),
    });

    const transactionId = data.transactionId; // Extract the transaction ID from the response
    return transactionId;
  }

  async getImageFromBlockchain(id: string): Promise<Buffer> {
    // Retrieve the image from the blockchain using the provided ID
    // You will need to implement the logic to fetch the image from the blockchain service
    // For example, if you are using IPFS, you can use the IPFS gateway to fetch the image using the transaction ID or hash
    const { data } = await axios.get<any, any>(
      `https://ipfs.example.com/${id}`,
    );
    const imageBuffer = Buffer.from(data, 'base64');

    return imageBuffer;
  }

  async deleteImageFromBlockchain(id: string): Promise<void> {
    // Delete the image from the blockchain using the provided ID
    // You will need to implement the logic to delete the image from the blockchain service
    // For example, if you are using IPFS, you can use the IPFS API to remove the image using the transaction ID or hash
    await axios.delete(`https://api.example.com/delete/${id}`);
  }
}
