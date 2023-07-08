import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  create(@Body() createImageDto: CreateImageDto) {
    return this.imagesService.create(createImageDto);
  }

  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imagesService.update(+id, updateImageDto);
  }

  @Post()
  async uploadImage(
    @Body() formData: { name: string; email: string },
  ): Promise<any> {
    // Process the form data, save the image, and generate AI result
    const image = await this.imagesService.processImage(
      formData.name,
      formData.email,
    );

    // Send the image to the blockchain
    const transactionId = await this.imagesService.sendToBlockchain(image);

    return { transactionId };
  }

  @Get(':id')
  async getImage(@Param('id') id: string): Promise<any> {
    // Retrieve the image from the blockchain using the ID
    const image = await this.imagesService.getImageFromBlockchain(id);
    return { image };
  }

  @Delete(':id')
  async deleteImage(@Param('id') id: string): Promise<any> {
    // Delete the image from the blockchain using the ID
    await this.imagesService.deleteImageFromBlockchain(id);
    return { message: 'Image deleted successfully' };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagesService.remove(+id);
  }
}
