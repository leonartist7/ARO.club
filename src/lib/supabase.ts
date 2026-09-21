"use client";
import { createBrowserClient } from "@supabase/ssr";
import { accountsEnabled, supabaseKey, supabaseUrl } from "./auth/config";
export const isSupabaseConfigured = accountsEnabled;
export const supabaseConfigError = new Error(
  "Account access is not active in this ARO preview yet. You can still explore the public experience.",
);
export const supabase = accountsEnabled
  ? createBrowserClient(supabaseUrl, supabaseKey)
  : null;
