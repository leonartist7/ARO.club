import { ArrowLeft, Bell, ChevronRight, CircleHelp, Globe2, LockKeyhole, Moon, ShieldCheck, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppPanel, AppSectionHeading } from '../components/app/AppPrimitives';

const settings = [
  { label: 'Account', detail: 'Name, email and connected access', icon: UserRound },
  { label: 'Privacy & Trust', detail: 'Visibility, data and safety controls', icon: LockKeyhole },
  { label: 'Notifications', detail: 'Choose when ARO reaches out', icon: Bell },
  { label: 'Language', detail: 'English', icon: Globe2 },
  { label: 'Appearance', detail: 'Auto', icon: Moon },
  { label: 'Help & Support', detail: 'Questions, feedback and contact', icon: CircleHelp },
];

export default function AppSettingsPage() {
  return (
    <div className="px-4 py-6 sm:px-8 sm:py-10">
      <Link to="/app/profile" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-ink/55 hover:text-ink dark:text-bone/55 dark:hover:text-bone"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to profile</Link>
      <AppSectionHeading className="mt-7" eyebrow="Your controls" title="Settings" />
      <AppPanel className="mt-7 divide-y divide-ink/10 dark:divide-bone/10">{settings.map(({ label, detail, icon: Icon }) => <button key={label} type="button" className="flex min-h-[76px] w-full items-center gap-4 px-5 text-left transition-colors hover:bg-ink/[0.03] dark:hover:bg-bone/[0.03] sm:px-6"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-50 text-secondary-700 dark:bg-secondary-900/20 dark:text-secondary-300"><Icon className="h-5 w-5" aria-hidden="true" /></span><span className="flex-1"><strong className="block text-sm">{label}</strong><span className="mt-1 block text-xs text-ink/50 dark:text-bone/50">{detail}</span></span><ChevronRight className="h-5 w-5 text-ink/30 dark:text-bone/30" aria-hidden="true" /></button>)}</AppPanel>
      <AppPanel className="mt-6 flex items-start gap-4 bg-secondary-50 p-5 dark:bg-secondary-900/15"><ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-moss" aria-hidden="true" /><div><h2 className="font-bold">Trust is our foundation.</h2><p className="mt-2 text-sm leading-6 text-ink/60 dark:text-bone/60">You are in control of your data. ARO explains what is visible, why it is used and how to change your mind.</p></div></AppPanel>
      <p className="mt-8 text-center text-xs text-ink/40 dark:text-bone/40">About ARO · Version 0.1 · Human Opportunity Network</p>
    </div>
  );
}
