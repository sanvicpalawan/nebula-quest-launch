import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const SITE_CONTENT_ID = "singleton";

function checkPasskey(passkey: string) {
  const expected = process.env["ADMIN_PASSKEY"];
  if (!expected || passkey !== expected) {
    throw new Error("Incorrect passkey");
  }
}

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

/** Public read of the stored site content. Returns null when nothing saved yet. */
export const getSiteContent = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = publicClient();
  const { data, error } = await supabase
    .from("site_content")
    .select("content")
    .eq("id", SITE_CONTENT_ID)
    .maybeSingle();
  if (error) {
    console.error("getSiteContent failed", error.message);
    return null;
  }
  return data?.content == null ? null : JSON.stringify(data.content);
});

export const verifyPasskey = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ passkey: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const expected = process.env["ADMIN_PASSKEY"];
    return { ok: Boolean(expected) && data.passkey === expected };
  });

export const saveSiteContent = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ passkey: z.string(), content: z.unknown() }).parse(data))
  .handler(async ({ data }) => {
    checkPasskey(data.passkey);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("site_content")
      .upsert({ id: SITE_CONTENT_ID, content: data.content as never, updated_at: new Date().toISOString() });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

const inquirySchema = z.object({
  businessName: z.string().min(1),
  contactPerson: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  businessType: z.string().min(1),
  message: z.string().default(""),
});

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((data) => inquirySchema.parse(data))
  .handler(async ({ data }) => {
    const supabase = publicClient();
    const { error } = await supabase.from("inquiries").insert({
      business_name: data.businessName,
      contact_person: data.contactPerson,
      email: data.email,
      phone: data.phone,
      business_type: data.businessType,
      message: data.message,
    } as never);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export type InquiryRow = {
  id: string;
  created_at: string;
  business_name: string;
  contact_person: string;
  email: string;
  phone: string;
  business_type: string;
  message: string;
  status: string;
};

export const listInquiries = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ passkey: z.string() }).parse(data))
  .handler(async ({ data }) => {
    checkPasskey(data.passkey);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (rows ?? []) as unknown as InquiryRow[];
  });

export const updateInquiryStatus = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        passkey: z.string(),
        id: z.string(),
        status: z.enum(["pending", "contacted", "fulfilled"]),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    checkPasskey(data.passkey);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("inquiries")
      .update({ status: data.status } as never)
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Uploads a base64 data URL image and returns a public URL served by this app. */
export const uploadSiteImage = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z.object({ passkey: z.string(), fileName: z.string(), dataUrl: z.string() }).parse(data),
  )
  .handler(async ({ data }) => {
    checkPasskey(data.passkey);
    const match = /^data:([^;]+);base64,(.+)$/.exec(data.dataUrl);
    if (!match) throw new Error("Unsupported image data");
    const contentType = match[1]!;
    const bytes = Buffer.from(match[2]!, "base64");
    const ext = (data.fileName.split(".").pop() ?? "png").toLowerCase().slice(0, 5);
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.storage
      .from("site-images")
      .upload(path, bytes, { contentType, upsert: false });
    if (error) throw new Error(error.message);
    return { url: `/api/public/site-image/${path}` };
  });

export const listSiteImages = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ passkey: z.string() }).parse(data))
  .handler(async ({ data }) => {
    checkPasskey(data.passkey);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: files, error } = await supabaseAdmin.storage
      .from("site-images")
      .list("", { limit: 100, sortBy: { column: "created_at", order: "desc" } });
    if (error) throw new Error(error.message);
    return (files ?? [])
      .filter((file) => file.name && file.metadata)
      .map((file) => ({
        name: file.name,
        url: `/api/public/site-image/${encodeURIComponent(file.name)}`,
      }));
  });
