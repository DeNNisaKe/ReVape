import { Controller, Get } from '@nestjs/common';
import { BinService } from '../services/bin.service';

@Controller('api/bins')
export class BinController {
  constructor(private readonly binService: BinService) {}
}
