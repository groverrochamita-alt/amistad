import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVisitaDto } from './dto/create-visita.dto';

@Injectable()
export class VisitasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateVisitaDto) {
    return this.prisma.visita.create({
      data: {
        nombre: dto.nombre,
        apPaterno: dto.apPaterno,
        apMaterno: dto.apMaterno,
        genero: dto.genero,
      },
    });
  }

  async findAll() {
    return this.prisma.visita.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
