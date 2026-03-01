// AUTO-GENERADO desde supabase/schema.sql
// Regenerar con: npx supabase gen types typescript --project-id <id> > src/lib/supabase/database.types.ts

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
      profiles: {
        Row: {
          id: string;
          username: string | null;
          avatar_url: string | null;
          github_url: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          username?: string | null;
          avatar_url?: string | null;
          github_url?: string | null;
          created_at?: string;
        };
        Update: {
          username?: string | null;
          avatar_url?: string | null;
          github_url?: string | null;
        };
      };
      repos: {
        Row: {
          id: string;
          user_id: string;
          github_owner: string;
          github_repo: string;
          display_name: string | null;
          description: string | null;
          default_branch: string;
          last_synced: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          github_owner: string;
          github_repo: string;
          display_name?: string | null;
          description?: string | null;
          default_branch?: string;
          last_synced?: string | null;
        };
        Update: {
          display_name?: string | null;
          description?: string | null;
          default_branch?: string;
          last_synced?: string | null;
        };
      };
      workspaces: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          color: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          description?: string | null;
          color?: string;
        };
        Update: {
          name?: string;
          description?: string | null;
          color?: string;
        };
      };
      workspace_items: {
        Row: {
          id: string;
          workspace_id: string;
          item_type: "command" | "repo";
          item_id: string;
          added_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          item_type: "command" | "repo";
          item_id: string;
        };
        Update: never;
      };
      progress: {
        Row: {
          id: string;
          user_id: string;
          item_id: string;
          item_type: "command" | "flashcard" | "quiz";
          status: "seen" | "learning" | "mastered";
          score: number | null;
          ease_factor: number;
          interval_days: number;
          next_review: string;
          review_count: number;
          last_reviewed: string | null;
          completed_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          item_id: string;
          item_type: "command" | "flashcard" | "quiz";
          status: "seen" | "learning" | "mastered";
          score?: number | null;
          ease_factor?: number;
          interval_days?: number;
          next_review?: string;
          review_count?: number;
          last_reviewed?: string | null;
          completed_at?: string | null;
        };
        Update: {
          status?: "seen" | "learning" | "mastered";
          score?: number | null;
          ease_factor?: number;
          interval_days?: number;
          next_review?: string;
          review_count?: number;
          last_reviewed?: string | null;
          completed_at?: string | null;
        };
      };
      notes: {
        Row: {
          id: string;
          user_id: string;
          item_id: string;
          item_type: "command" | "doc";
          content: string;
          updated_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          item_id: string;
          item_type: "command" | "doc";
          content: string;
        };
        Update: {
          content?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

// Tipos de conveniencia para uso en componentes
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Repo = Database["public"]["Tables"]["repos"]["Row"];
export type Workspace = Database["public"]["Tables"]["workspaces"]["Row"];
export type WorkspaceItem = Database["public"]["Tables"]["workspace_items"]["Row"];
export type Progress = Database["public"]["Tables"]["progress"]["Row"];
export type Note = Database["public"]["Tables"]["notes"]["Row"];
