import { Trash2, RefreshCcw, ShieldCheck, ShieldOff } from 'lucide-react';

// Display metadata for admin_events.action values. Shared by the dashboard
// feed and the dedicated audit log page so labels/icons stay consistent.
export const ACTION_META = {
  delete:             { icon: Trash2,      color: 'text-red-500',    label: 'Deleted' },
  bulk_delete:        { icon: Trash2,      color: 'text-red-500',    label: 'Bulk deleted' },
  update_status:      { icon: RefreshCcw,  color: 'text-blue-500',   label: 'Updated status' },
  bulk_update_status: { icon: RefreshCcw,  color: 'text-blue-500',   label: 'Bulk updated status' },
  verify:             { icon: ShieldCheck, color: 'text-green-500',  label: 'Verified teacher' },
  unverify:           { icon: ShieldOff,   color: 'text-yellow-500', label: 'Unverified teacher' },
  promote_admin:      { icon: ShieldCheck, color: 'text-green-500',  label: 'Promoted to admin' },
  demote_admin:       { icon: ShieldOff,   color: 'text-yellow-500', label: 'Demoted from admin' },
  start_review:       { icon: RefreshCcw,  color: 'text-blue-500',   label: 'Started review' },
  approve_application: { icon: ShieldCheck, color: 'text-green-500', label: 'Approved application' },
  reject_application:  { icon: ShieldOff,   color: 'text-red-500',   label: 'Rejected application' },
  request_changes:     { icon: RefreshCcw,  color: 'text-yellow-500', label: 'Requested changes' },
};

export function actionMeta(action) {
  return ACTION_META[action] ?? { icon: RefreshCcw, color: 'text-gray-400', label: action };
}
