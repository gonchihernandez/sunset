import axios from 'axios';
import fs from 'fs';

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

  async processImage(name: string, email: string): Promise<Buffer> {
    // Use the name and email to generate the AI result and create the image
    // You can use any AI library or algorithm to generate the image
    // Save the image to a temporary directory or buffer
    //const imageBuffer = await generateImage(name, email);

    //await fs.writeFile('path_to_temporary_directory/image.png', imageBuffer);

    // return imageBuffer;
    return null;
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
