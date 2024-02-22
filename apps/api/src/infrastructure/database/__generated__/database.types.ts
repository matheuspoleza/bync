export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      bank_accounts: {
        Row: {
          created_at: string;
          customer_id: string;
          id: string;
          mobilis_account_id: number;
          mobilis_account_name: string;
          type: Database['public']['Enums']['bank_account_types'];
          ynab_account_id: string;
          ynab_account_name: string;
        };
        Insert: {
          created_at?: string;
          customer_id: string;
          id?: string;
          mobilis_account_id: number;
          mobilis_account_name: string;
          type: Database['public']['Enums']['bank_account_types'];
          ynab_account_id: string;
          ynab_account_name: string;
        };
        Update: {
          created_at?: string;
          customer_id?: string;
          id?: string;
          mobilis_account_id?: number;
          mobilis_account_name?: string;
          type?: Database['public']['Enums']['bank_account_types'];
          ynab_account_id?: string;
          ynab_account_name?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'bank_accounts_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers';
            referencedColumns: ['id'];
          },
        ];
      };
      customers: {
        Row: {
          created_at: string;
          full_name: string | null;
          id: string;
        };
        Insert: {
          created_at?: string;
          full_name?: string | null;
          id?: string;
        };
        Update: {
          created_at?: string;
          full_name?: string | null;
          id?: string;
        };
        Relationships: [];
      };
      sessions: {
        Row: {
          bank_account_ids: string[] | null;
          created_at: string;
          end_date: string;
          id: string;
          start_date: string;
        };
        Insert: {
          bank_account_ids?: string[] | null;
          created_at?: string;
          end_date: string;
          id?: string;
          start_date: string;
        };
        Update: {
          bank_account_ids?: string[] | null;
          created_at?: string;
          end_date?: string;
          id?: string;
          start_date?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      bank_account_types: 'checking' | 'savings' | 'credit';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
        Database['public']['Views'])
    ? (Database['public']['Tables'] &
        Database['public']['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database['public']['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never;
