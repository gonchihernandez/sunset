import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Headers,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { ImagesService } from './images.service';
import { UpdateImageDto } from './dto/update-image.dto';
import { CreateImageDto } from './dto/create-image.dto';

@ApiTags('Images')
@Controller('images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @ApiBody({ type: CreateImageDto })
  @ApiOperation({
    summary: 'Create a new AI image',
    description: 'Create a new image entry and process it.',
  })
  @ApiResponse({ status: 201, description: 'Created Successfully' })
  @ApiResponse({
    status: 422,
    description: 'Unprocessable Entity - Bad Request',
  })
  @ApiResponse({ status: 403, description: 'Forbidden - Unauthorized Request' })
  async createImage(
    @Body() formData: CreateImageDto,
    @Res() res: Response,
  ): Promise<any> {
    // Process the form data, save the image, and generate AI result
    const { image } = await this.imagesService.processImage(
      formData.name,
      formData.email,
    );

    // // Send the image to the blockchain
    // const transactionId = await this.imagesService.sendToBlockchain(image);

    // return { transactionId };

    // Set the appropriate content type header
    res.setHeader('Content-Type', 'image/png');

    // Send the image in the response
    res.send(image);

    return res;
  }

  // @Get()
  // findAll() {
  //   return this.imagesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.imagesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
  //   return this.imagesService.update(+id, updateImageDto);
  // }

  // @Get(':id')
  // @ApiCreatedResponse({ description: 'Found Succesfully' })
  // @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  // @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  // async getImage(@Param('id') id: string): Promise<any> {
  //   // Retrieve the image from the blockchain using the ID
  //   const image = await this.imagesService.getImageFromBlockchain(id);
  //   return { image };
  // }

  // @Delete(':id')
  // @ApiCreatedResponse({ description: 'Deleted Succesfully' })
  // @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  // @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  // async deleteImage(@Param('id') id: string): Promise<any> {
  //   // Delete the image from the blockchain using the ID
  //   await this.imagesService.deleteImageFromBlockchain(id);
  //   return { message: 'Image deleted successfully' };
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.imagesService.remove(+id);
  // }
}
