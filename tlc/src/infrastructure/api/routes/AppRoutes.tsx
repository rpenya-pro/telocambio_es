import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../../../ui/pages/HomePage";
import Layout from "../../../ui/layouts/Layout";
import { Dashboard } from "../../../ui/pages/protected/Dashboard";
import ProtectComponent from "../../../ui/pages/ProtectComponent";
import LayoutDashboard from "../../../ui/layouts/LayoutDashboard";
import { NotFoundPage } from "../../../ui/pages/NotFoundPage";
import { ActivitySummary } from "../../../ui/pages/protected/ActivitySummary";
import { ThreadDetail } from "../../../ui/pages/protected/ThreadDetail";
import { PublicThreadDetail } from "../../../ui/pages/PublicThreadDetail";
import { OwnerProfile } from "../../../ui/pages/protected/OwnerProfile";
import { EventDetail } from "../../../ui/pages/protected/EventDetail";
import { DoProposition } from "../../../ui/pages/protected/DoProposition";
import { ProcessStep1 } from "../../../ui/pages/protected/ProcessStep1";
import { PropositionProvider } from "../../context/propositionContext";
import { CurrentProposals } from "../../../ui/pages/protected/CurrentProposals";

const AppRoutes = () => {
  const isProduction = process.env.NODE_ENV === "production";
  const BASENAME = isProduction ? "/telocambio" : "/";

  return (
    <BrowserRouter basename={BASENAME}>
      <PropositionProvider>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <LayoutDashboard>
                <ProtectComponent>
                  <Dashboard />
                </ProtectComponent>
              </LayoutDashboard>
            }
          />

          <Route
            path="/:slug"
            element={
              <LayoutDashboard>
                <ProtectComponent>
                  <ActivitySummary />
                </ProtectComponent>
              </LayoutDashboard>
            }
          />

          <Route
            path="/d/:dataencoded"
            element={
              <LayoutDashboard>
                <ProtectComponent>
                  <ThreadDetail />
                </ProtectComponent>
              </LayoutDashboard>
            }
          />

          <Route
            path="/profiles/:slug"
            element={
              <LayoutDashboard>
                <ProtectComponent>
                  <OwnerProfile />
                </ProtectComponent>
              </LayoutDashboard>
            }
          />

          <Route
            path="/p/:dataencoded"
            element={
              <Layout>
                <PublicThreadDetail />
              </Layout>
            }
          />

          <Route
            path="/event/:slugEvent"
            element={
              <LayoutDashboard>
                <ProtectComponent>
                  <EventDetail />
                </ProtectComponent>
              </LayoutDashboard>
            }
          />

          <Route
            path="/proposal/:cookieName"
            element={
              <LayoutDashboard>
                <ProtectComponent>
                  <DoProposition description={undefined} />
                </ProtectComponent>
              </LayoutDashboard>
            }
          />

          <Route
            path="/step1/:cookieName"
            element={
              <LayoutDashboard>
                <ProtectComponent>
                  <ProcessStep1 />
                </ProtectComponent>
              </LayoutDashboard>
            }
          />
          <Route
            path="/current-proposals"
            element={
              <LayoutDashboard>
                <ProtectComponent>
                  <CurrentProposals />
                </ProtectComponent>
              </LayoutDashboard>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </PropositionProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
