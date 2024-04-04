import { Controller, Delete, Param } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Delete('links/:linkId')
  async deleteBankingLink(@Param('linkId') linkId: string): Promise<void> {
    return this.adminService.deleteLink(linkId);
  }
}
