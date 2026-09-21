import { Controller, Post, Get, Body } from '@nestjs/common';
import { VisitasService } from './visitas.service';
import { CreateVisitaDto } from './dto/create-visita.dto';

@Controller('visitas')
export class VisitasController {
  constructor(private readonly visitasService: VisitasService) {}

  @Post()
  create(@Body() dto: CreateVisitaDto) {
    return this.visitasService.create(dto);
  }

  @Get()
  findAll() {
    return this.visitasService.findAll();
  }
}
