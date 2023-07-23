import { ApiProperty } from '@nestjs/swagger';

export class CreateImageDto {
  // Add properties based on the expected payload
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  readonly name: string;
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  readonly email: string;
}
