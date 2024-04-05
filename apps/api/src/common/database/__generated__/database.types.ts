export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      banking_bank_accounts: {
        Row: {
          account_name: string
          balance: number
          connection_link_id: string | null
          created_at: string
          customer_id: string
          id: string
          institution: string
          last_synced_at: string | null
          number: string
          type: string
          ynab_account_id: string | null
        }
        Insert: {
          account_name: string
          balance: number
          connection_link_id?: string | null
          created_at?: string
          customer_id: string
          id?: string
          institution: string
          last_synced_at?: string | null
          number: string
          type: string
          ynab_account_id?: string | null
        }
        Update: {
          account_name?: string
          balance?: number
          connection_link_id?: string | null
          created_at?: string
          customer_id?: string
          id?: string
          institution?: string
          last_synced_at?: string | null
          number?: string
          type?: string
          ynab_account_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bank_accounts_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "identity_customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bank_accounts_link_id_fkey"
            columns: ["connection_link_id"]
            isOneToOne: false
            referencedRelation: "banking_connection_link"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_bank_accounts_ynab_account_id_fkey"
            columns: ["ynab_account_id"]
            isOneToOne: false
            referencedRelation: "ynab_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      banking_connection_link: {
        Row: {
          customer_id: string
          id: string
          institution: string
          link_id: string
          status: string
        }
        Insert: {
          customer_id: string
          id?: string
          institution: string
          link_id: string
          status?: string
        }
        Update: {
          customer_id?: string
          id?: string
          institution?: string
          link_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_banking_account_link_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "identity_customers"
            referencedColumns: ["id"]
          },
        ]
      }
      identity_customers: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "customers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      sync_sessions: {
        Row: {
          bank_account_ids: string[] | null
          created_at: string
          end_date: string
          id: string
          start_date: string
        }
        Insert: {
          bank_account_ids?: string[] | null
          created_at?: string
          end_date: string
          id?: string
          start_date: string
        }
        Update: {
          bank_account_ids?: string[] | null
          created_at?: string
          end_date?: string
          id?: string
          start_date?: string
        }
        Relationships: []
      }
      ynab_accounts: {
        Row: {
          balance: number
          bank_account_id: string | null
          budget_id: string
          created_at: string
          customer_id: string
          id: string
          last_synced_at: string | null
          name: string
          type: string
          ynab_account_id: string
        }
        Insert: {
          balance?: number
          bank_account_id?: string | null
          budget_id: string
          created_at?: string
          customer_id: string
          id?: string
          last_synced_at?: string | null
          name: string
          type: string
          ynab_account_id: string
        }
        Update: {
          balance?: number
          bank_account_id?: string | null
          budget_id?: string
          created_at?: string
          customer_id?: string
          id?: string
          last_synced_at?: string | null
          name?: string
          type?: string
          ynab_account_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_ynab_account_bank_account_id_fkey"
            columns: ["bank_account_id"]
            isOneToOne: false
            referencedRelation: "banking_bank_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ynab_account_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "identity_customers"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      bank_account_types: "checking" | "savings" | "credit"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
