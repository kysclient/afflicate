import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey);

export function createClient() {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey);
}

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          category_id: string | null;
          title: string;
          description: string | null;
          original_price: number | null;
          sale_price: number | null;
          discount_rate: number | null;
          image_url: string | null;
          coupang_url: string;
          affiliate_url: string | null;
          brand: string | null;
          rating: number | null;
          review_count: number | null;
          is_featured: boolean | null;
          is_active: boolean | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category_id?: string | null;
          title: string;
          description?: string | null;
          original_price?: number | null;
          sale_price?: number | null;
          discount_rate?: number | null;
          image_url?: string | null;
          coupang_url: string;
          affiliate_url?: string | null;
          brand?: string | null;
          rating?: number | null;
          review_count?: number | null;
          is_featured?: boolean | null;
          is_active?: boolean | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          category_id?: string | null;
          title?: string;
          description?: string | null;
          original_price?: number | null;
          sale_price?: number | null;
          discount_rate?: number | null;
          image_url?: string | null;
          coupang_url?: string;
          affiliate_url?: string | null;
          brand?: string | null;
          rating?: number | null;
          review_count?: number | null;
          is_featured?: boolean | null;
          is_active?: boolean | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      rankings: {
        Row: {
          id: string;
          category_id: string | null;
          product_id: string | null;
          rank_position: number;
          ranking_type: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category_id?: string | null;
          product_id?: string | null;
          rank_position: number;
          ranking_type?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          category_id?: string | null;
          product_id?: string | null;
          rank_position?: number;
          ranking_type?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      price_history: {
        Row: {
          id: string;
          product_id: string | null;
          price: number;
          recorded_at: string;
        };
        Insert: {
          id?: string;
          product_id?: string | null;
          price: number;
          recorded_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string | null;
          price?: number;
          recorded_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          product_id: string | null;
          title: string;
          content: string;
          rating: number | null;
          pros: string[] | null;
          cons: string[] | null;
          is_featured: boolean | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          product_id?: string | null;
          title: string;
          content: string;
          rating?: number | null;
          pros?: string[] | null;
          cons?: string[] | null;
          is_featured?: boolean | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string | null;
          title?: string;
          content?: string;
          rating?: number | null;
          pros?: string[] | null;
          cons?: string[] | null;
          is_featured?: boolean | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};
