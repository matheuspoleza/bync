import { Injectable } from '@nestjs/common';
import { DatabaseService, Tables } from '../../common';
import {
  ConnectionLink,
  ConnectionLinkStatus,
  IConnectionLinkRepository,
} from '../domain/connection-link';

@Injectable()
export class ConnectionLinkRepository implements IConnectionLinkRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  private fromDB(data: Tables<'connection_link'>): ConnectionLink {
    return new ConnectionLink({
      id: data.id,
      customerId: data.customer_id,
      institution: data.institution,
      linkId: data.link_id,
      status: data.status as ConnectionLinkStatus,
    });
  }

  async delete(id: string): Promise<void> {
    await this.databaseService.schema.from('connection_link').delete().eq('id', id);
    await this.databaseService.schema.from('bank_accounts').update({ connection_link_id: undefined }).eq('connection_link_id', id);
  }

  async create(connectionLink: ConnectionLink): Promise<ConnectionLink> {
    const result = await this.databaseService.schema
      .from('connection_link')
      .insert({
        customer_id: connectionLink.customerId,
        institution: connectionLink.institution,
        link_id: connectionLink.linkId,
        status: connectionLink.status,
      })
      .select('*')
      .single();

    if (!result.data || result.error) {
      throw new Error(
        `Failed to create connection link: ${result.error.message}`,
      );
    }

    return this.fromDB(result.data);
  }

  async updateStatus(connectionLink: ConnectionLink): Promise<void> {
    await this.databaseService.schema
      .from('connection_link')
      .update({
        status: connectionLink.status,
      })
      .eq('id', connectionLink.id);
  }

  async getByLinkId(linkId: string): Promise<ConnectionLink | null> {
    const result = await this.databaseService.schema
      .from('connection_link')
      .select('*')
      .eq('link_id', linkId)
      .single();

    if (!result.data || result.error) return null;

    return this.fromDB(result.data);
  }
}
