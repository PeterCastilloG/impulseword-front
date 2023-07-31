import { useSession } from "@/shared/hooks/useSession";
import { analyzerPageContent } from "@/modules/analyzer/services/analyzer.service";
import AnalyzerPage from "@/modules/analyzer/Analyzer";
import NoAnalyze from "@/modules/analyzer/components/no-analyze/No-analyze";


export default async function Page() {

  const { user } = await useSession();

  const analyzerContentPage  = await analyzerPageContent({
    user_id: user.info.userId,
    user_token: user.token,
  });

  if (!analyzerContentPage.challengeOrders.length) return <NoAnalyze />;

  return (
    <AnalyzerPage
      analyzerPage={analyzerContentPage}
      userAuth={{ user_id: user.info.userId, user_token: user.token }}
    />
  );
}
