import {
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateColorsDto } from './dto/updatecolor.dto';
import { Colors } from './entities/colors.entity';
@Injectable()
export class ColorsService {
  constructor(
    @InjectRepository(Colors)
    private ColorsRepository: Repository<Colors>,
  ) {}

  findAll(): Promise<Colors[]> {
    return this.ColorsRepository.find();
  }

  async findOne(Colors: number): Promise<Colors> {
    const Color = await this.ColorsRepository.findOne(Colors);
    if (!Color) {
      throw new NotFoundException(`Colors ${Colors} not found`);
    }
    return Color;
  }

  async findOneByQuery(Colors: any): Promise<Colors> {
    const colors = await this.ColorsRepository.findOne(Colors);
    console.log(colors);

    if (!colors) {
      throw new NotFoundException(`Not found`);
    }
    return colors;
  }

  async create(colors: Colors): Promise<Colors> {
    const checking_colors = await this.ColorsRepository.findOne(
      colors.color_name,
    );
    if (!colors.color_name) {
      throw new NotAcceptableException(`colors ${colors.color_name} invalid`);
    }

    if (checking_colors && checking_colors.color_name === colors.color_name) {
      throw new NotAcceptableException(
        `colors ${colors.color_name} already existed  `,
      );
    }

    return this.ColorsRepository.save(colors);
  }

  async update(colorid: number, color: UpdateColorsDto) {
    const updatepro = await this.ColorsRepository.findOne(colorid);
    if (!updatepro) {
      throw new NotFoundException(`colorid not found`);
    }
    return this.ColorsRepository.save(color);
  }

  async remove(colorid: number) {
    const dd = await this.ColorsRepository.findOne(colorid);
    if (!dd) {
      throw new NotFoundException(`colorid not found`);
    }
    return this.ColorsRepository.delete(colorid);
  }
}
