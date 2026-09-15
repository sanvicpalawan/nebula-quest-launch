import React, { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';

import { useSiteContent } from '../../context/SiteContentContext';
import { listInquiries, updateInquiryStatus, type InquiryRow } from '../../lib/site.functions';

const STATUSES = ['pending', 'contacted', 'fulfilled'] as const;
type Status = (typeof STATUSES)[number];

const STATUS_STYLES: Record<Status, string> = {
  pending: 'bg-amber-100 text-amber-800 border-amber-200',
  contacted: 'bg-blue-100 text-blue-800 border-blue-200',
  fulfilled: 'bg-emerald-100 text-emerald-800 border-emerald-200',
};

export const EnquiriesPanel: React.FC = () => {
  const { adminPasskey } = useSiteContent();
  const [rows, setRows] = useState<InquiryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    if (!adminPasskey) return;
    setLoading(true);
    setError(null);
    try {
      const data = await listInquiries({ data: { passkey: adminPasskey } });
      setRows(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load enquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminPasskey]);

  const setStatus = async (id: string, status: Status) => {
    if (!adminPasskey) return;
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    try {
      await updateInquiryStatus({ data: { passkey: adminPasskey, id, status } });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not update status');
      void load();
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-stone-900">Wholesale enquiries</h3>
          <p className="text-xs text-stone-500 mt-0.5">
            {rows.length} total · sent from the enquiry form
          </p>
        </div>
        <button
          type="button"
          onClick={() => void load()}
          className="inline-flex items-center space-x-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {error && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      {loading && rows.length === 0 && <p className="text-xs text-stone-500">Loading…</p>}

      {!loading && rows.length === 0 && !error && (
        <p className="text-xs text-stone-500">No enquiries yet.</p>
      )}

      <div className="space-y-3">
        {rows.map((row) => (
          <div key={row.id} className="border border-stone-200 rounded-lg p-4 bg-stone-50/60">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-stone-900">{row.business_name}</p>
                <p className="text-xs text-stone-600">
                  {row.contact_person} · {row.business_type}
                </p>
                <p className="text-xs text-stone-600 mt-1">
                  {row.email} · {row.phone}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-stone-400">
                  {new Date(row.created_at).toLocaleString()}
                </span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full border capitalize ${
                    STATUS_STYLES[(row.status as Status) ?? 'pending'] ?? STATUS_STYLES.pending
                  }`}
                >
                  {row.status}
                </span>
              </div>
            </div>

            {row.message && (
              <p className="mt-3 text-xs text-stone-700 whitespace-pre-wrap">{row.message}</p>
            )}

            <div className="mt-3 flex flex-wrap gap-1.5">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => void setStatus(row.id, s)}
                  className={`text-[11px] px-2.5 py-1 rounded-md border capitalize transition-colors ${
                    row.status === s
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
