export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          message: string | null
          source: string | null
          medium: string | null
          campaign: string | null
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          message?: string | null
          source?: string | null
          medium?: string | null
          campaign?: string | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          message?: string | null
          source?: string | null
          medium?: string | null
          campaign?: string | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
      }
      conversions: {
        Row: {
          id: string
          lead_id: string | null
          event_name: string
          value: number | null
          currency: string
          fbp: string | null
          fbc: string | null
          gclid: string | null
          created_at: string
        }
        Insert: {
          id?: string
          lead_id?: string | null
          event_name: string
          value?: number | null
          currency?: string
          fbp?: string | null
          fbc?: string | null
          gclid?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          lead_id?: string | null
          event_name?: string
          value?: number | null
          currency?: string
          fbp?: string | null
          fbc?: string | null
          gclid?: string | null
          created_at?: string
        }
      }
      admins: {
        Row: {
          id: string
          email: string
          password_hash: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          password_hash: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          password_hash?: string
          created_at?: string
        }
      }
      tracking_config: {
        Row: {
          id: string
          client_id: string
          meta_pixel_id: string | null
          google_analytics_id: string | null
          google_ads_conversion_id: string | null
          google_ads_conversion_label: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id: string
          meta_pixel_id?: string | null
          google_analytics_id?: string | null
          google_ads_conversion_id?: string | null
          google_ads_conversion_label?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          meta_pixel_id?: string | null
          google_analytics_id?: string | null
          google_ads_conversion_id?: string | null
          google_ads_conversion_label?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
