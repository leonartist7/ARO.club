import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, ShieldCheck, Cookie, AlertCircle } from 'lucide-react';
import { Card, CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';

/**
 * Terms, Privacy and Cookie pages.
 *
 * These were `to="#"` in the footer and `/terms` / `/privacy` links from the
 * auth forms pointed at routes that didn't exist, so agreeing to terms led
 * to a 404. Real policy text needs a lawyer, so rather than invent
 * authoritative-sounding legal copy these state plainly what the product
 * currently does with your data and mark themselves as not yet reviewed.
 */

const DOCUMENTS = {
  terms: {
    icon: FileText,
    title: 'Terms of Service',
    intro:
      'The rules for using ARO. This is a plain-language summary of how the product works today.',
    sections: [
      {
        heading: 'What ARO is',
        body: 'ARO is a human opportunity platform. Its first live path connects language learners with verified local teachers for small-group experiences in real places. Hosts run their own sessions and set their own approved terms.',
      },
      {
        heading: 'Your account',
        body: 'You are responsible for what happens under your account. Keep your sign-in details to yourself, and tell us if you think someone else has them.',
      },
      {
        heading: 'Bookings and cancellations',
        body: 'Booking reserves you a place in a session. Payment is not yet processed through the platform, so any money changes hands directly with the teacher and is between the two of you.',
      },
      {
        heading: 'Points, badges and shop items',
        body: 'Points, badges, streaks and anything you buy in the shop have no cash value, cannot be exchanged for money, and exist only inside your account.',
      },
      {
        heading: 'Behaviour',
        body: 'Treat teachers and other learners with respect. Harassment, discrimination and unsafe behaviour get accounts removed.',
      },
    ],
  },
  privacy: {
    icon: ShieldCheck,
    title: 'Privacy Policy',
    intro: 'What ARO knows about you, and where it is kept.',
    sections: [
      {
        heading: 'What is stored on your device',
        body: 'Almost everything. Your profile, points, streak, badges, inventory, bookings, saved searches, favourites, theme and language preference are all held in your browser’s local storage. Clearing your browser data clears them.',
      },
      {
        heading: 'What leaves your device',
        body: 'If you create an account, your email and profile details are stored with our authentication provider so you can sign back in. Nothing else is transmitted at present.',
      },
      {
        heading: 'What we do not do',
        body: 'We do not sell your data, and we do not run advertising or third-party tracking on the site.',
      },
      {
        heading: 'Getting your data removed',
        body: 'Signing out clears local session data. To request account deletion, email privacy@aro.club.',
      },
    ],
  },
  cookies: {
    icon: Cookie,
    title: 'Cookie Policy',
    intro: 'ARO uses browser storage rather than tracking cookies.',
    sections: [
      {
        heading: 'What we use',
        body: 'Local storage, not cookies, for the things that make the app work: your session, your progress, your theme and your chosen language.',
      },
      {
        heading: 'What we do not use',
        body: 'No advertising cookies, no analytics cookies, no cross-site trackers.',
      },
      {
        heading: 'Clearing it',
        body: 'Clearing site data in your browser settings removes everything ARO has stored locally, including local progress.',
      },
    ],
  },
};

export default function LegalPage({ document: documentKey }) {
  const params = useParams();
  const key = documentKey ?? params.document;
  const doc = DOCUMENTS[key];

  if (!doc) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <Card className="max-w-md">
          <CardBody className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-primary-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Document not found
            </h1>
            <Link to="/">
              <Button variant="primary">Back to home</Button>
            </Link>
          </CardBody>
        </Card>
      </div>
    );
  }

  const Icon = doc.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
    >
      <div className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white py-14">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <Icon className="w-12 h-12 mb-4" />
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">{doc.title}</h1>
          <p className="text-white/90">{doc.intro}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl py-10">
        {/* Said up front rather than buried - this text has not been reviewed. */}
        <div className="flex gap-3 p-4 mb-8 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-900 dark:text-amber-200">
            ARO is still in development and this document has not been reviewed
            by a lawyer. It describes what the product actually does today rather
            than serving as a binding agreement.
          </p>
        </div>

        <Card>
          <CardBody className="space-y-8">
            {doc.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {section.heading}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {section.body}
                </p>
              </section>
            ))}
          </CardBody>
        </Card>

        <div className="flex flex-wrap gap-3 mt-8">
          {Object.entries(DOCUMENTS)
            .filter(([otherKey]) => otherKey !== key)
            .map(([otherKey, other]) => (
              <Link key={otherKey} to={`/${otherKey}`}>
                <Button variant="outline" size="sm">
                  {other.title}
                </Button>
              </Link>
            ))}
          <Link to="/contact">
            <Button variant="ghost" size="sm">
              Ask us something
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
