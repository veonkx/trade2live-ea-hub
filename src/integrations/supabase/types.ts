export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      ea_equity_data: {
        Row: {
          created_at: string
          day_number: number
          ea_type: string
          equity_value: number
          id: string
          record_date: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          day_number: number
          ea_type: string
          equity_value?: number
          id?: string
          record_date?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          day_number?: number
          ea_type?: string
          equity_value?: number
          id?: string
          record_date?: string
          updated_at?: string
        }
        Relationships: []
      }
      ea_monthly_returns: {
        Row: {
          created_at: string
          ea_type: string
          id: string
          month: number
          return_percent: number
          updated_at: string
          year: number
        }
        Insert: {
          created_at?: string
          ea_type: string
          id?: string
          month: number
          return_percent?: number
          updated_at?: string
          year: number
        }
        Update: {
          created_at?: string
          ea_type?: string
          id?: string
          month?: number
          return_percent?: number
          updated_at?: string
          year?: number
        }
        Relationships: []
      }
      ea_performance_stats: {
        Row: {
          created_at: string
          ea_type: string
          id: string
          last_updated_at: string
          max_drawdown: string
          monthly_avg: string
          name: string
          profit_factor: string
          sharpe_ratio: string
          start_date: string
          status: string
          total_return: string
          total_trades: string
          trading_days: string
          updated_at: string
          win_rate: string
        }
        Insert: {
          created_at?: string
          ea_type: string
          id?: string
          last_updated_at?: string
          max_drawdown?: string
          monthly_avg?: string
          name: string
          profit_factor?: string
          sharpe_ratio?: string
          start_date?: string
          status?: string
          total_return?: string
          total_trades?: string
          trading_days?: string
          updated_at?: string
          win_rate?: string
        }
        Update: {
          created_at?: string
          ea_type?: string
          id?: string
          last_updated_at?: string
          max_drawdown?: string
          monthly_avg?: string
          name?: string
          profit_factor?: string
          sharpe_ratio?: string
          start_date?: string
          status?: string
          total_return?: string
          total_trades?: string
          trading_days?: string
          updated_at?: string
          win_rate?: string
        }
        Relationships: []
      }
      license_keys: {
        Row: {
          activated_at: string | null
          broker_name: string | null
          created_at: string
          id: string
          is_active: boolean | null
          license_key: string
          mt_account_number: string | null
          subscription_id: string
        }
        Insert: {
          activated_at?: string | null
          broker_name?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          license_key: string
          mt_account_number?: string | null
          subscription_id: string
        }
        Update: {
          activated_at?: string | null
          broker_name?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          license_key?: string
          mt_account_number?: string | null
          subscription_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "license_keys_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      mt5_investor_accounts: {
        Row: {
          account_name: string
          account_number: string
          broker_name: string | null
          created_at: string
          description: string | null
          ea_type: string
          id: string
          investor_password: string
          is_active: boolean
          server_name: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          account_name: string
          account_number: string
          broker_name?: string | null
          created_at?: string
          description?: string | null
          ea_type?: string
          id?: string
          investor_password: string
          is_active?: boolean
          server_name: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          account_name?: string
          account_number?: string
          broker_name?: string | null
          created_at?: string
          description?: string | null
          ea_type?: string
          id?: string
          investor_password?: string
          is_active?: boolean
          server_name?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          currency: string | null
          id: string
          notes: string | null
          payment_method: string | null
          payment_reference: string | null
          status: Database["public"]["Enums"]["payment_status"]
          subscription_id: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string | null
          id?: string
          notes?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          subscription_id?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string | null
          id?: string
          notes?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          subscription_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string
          ea_type: Database["public"]["Enums"]["ea_type"]
          end_date: string | null
          id: string
          max_accounts: number | null
          package_name: string
          start_date: string | null
          status: Database["public"]["Enums"]["subscription_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          ea_type: Database["public"]["Enums"]["ea_type"]
          end_date?: string | null
          id?: string
          max_accounts?: number | null
          package_name: string
          start_date?: string | null
          status?: Database["public"]["Enums"]["subscription_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          ea_type?: Database["public"]["Enums"]["ea_type"]
          end_date?: string | null
          id?: string
          max_accounts?: number | null
          package_name?: string
          start_date?: string | null
          status?: Database["public"]["Enums"]["subscription_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vps_plans: {
        Row: {
          cpu: string
          created_at: string
          id: string
          is_active: boolean
          is_popular: boolean
          mt_accounts: number
          name: string
          os_type: string
          price_12m_lak: number
          price_12m_usd: number
          price_3m_lak: number
          price_3m_usd: number
          price_6m_lak: number
          price_6m_usd: number
          price_lak: number
          price_usd: number
          ram: string
          sort_order: number
          storage: string
          updated_at: string
        }
        Insert: {
          cpu?: string
          created_at?: string
          id?: string
          is_active?: boolean
          is_popular?: boolean
          mt_accounts?: number
          name: string
          os_type?: string
          price_12m_lak?: number
          price_12m_usd?: number
          price_3m_lak?: number
          price_3m_usd?: number
          price_6m_lak?: number
          price_6m_usd?: number
          price_lak?: number
          price_usd?: number
          ram?: string
          sort_order?: number
          storage?: string
          updated_at?: string
        }
        Update: {
          cpu?: string
          created_at?: string
          id?: string
          is_active?: boolean
          is_popular?: boolean
          mt_accounts?: number
          name?: string
          os_type?: string
          price_12m_lak?: number
          price_12m_usd?: number
          price_3m_lak?: number
          price_3m_usd?: number
          price_6m_lak?: number
          price_6m_usd?: number
          price_lak?: number
          price_usd?: number
          ram?: string
          sort_order?: number
          storage?: string
          updated_at?: string
        }
        Relationships: []
      }
      vps_subscriptions: {
        Row: {
          created_at: string
          end_date: string
          id: string
          ip_address: string | null
          notes: string | null
          password: string | null
          plan_name: string
          start_date: string
          status: string
          updated_at: string
          user_id: string
          username: string | null
          vps_plan_id: string | null
        }
        Insert: {
          created_at?: string
          end_date: string
          id?: string
          ip_address?: string | null
          notes?: string | null
          password?: string | null
          plan_name: string
          start_date?: string
          status?: string
          updated_at?: string
          user_id: string
          username?: string | null
          vps_plan_id?: string | null
        }
        Update: {
          created_at?: string
          end_date?: string
          id?: string
          ip_address?: string | null
          notes?: string | null
          password?: string | null
          plan_name?: string
          start_date?: string
          status?: string
          updated_at?: string
          user_id?: string
          username?: string | null
          vps_plan_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vps_subscriptions_vps_plan_id_fkey"
            columns: ["vps_plan_id"]
            isOneToOne: false
            referencedRelation: "vps_plans"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_license_key: { Args: never; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin_or_staff: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "staff" | "user"
      ea_type: "icf" | "zb" | "bundle"
      payment_status: "pending" | "completed" | "failed" | "refunded"
      subscription_status: "active" | "expired" | "pending" | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "staff", "user"],
      ea_type: ["icf", "zb", "bundle"],
      payment_status: ["pending", "completed", "failed", "refunded"],
      subscription_status: ["active", "expired", "pending", "cancelled"],
    },
  },
} as const
