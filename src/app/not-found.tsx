import Layout from "../components/layout/Layout";
import LegacyFixtureState from "../components/features/LegacyFixtureState";
export default function NotFound() {
  return (
    <Layout>
      <LegacyFixtureState kind="missing" />
    </Layout>
  );
}
