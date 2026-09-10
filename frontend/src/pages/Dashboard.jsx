import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import {
  GitBranch,
  ShieldAlert,
  Activity,
  ArrowRight,
  LockKeyhole,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const {
    user,
    organizations = [],
    selectedOrg,
    loading = false,
  } = useOutletContext();

  const displayName =
    user?.name ||
    user?.displayName ||
    user?.email?.split("@")[0] ||
    "Developer";

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">

      {/* ------------------------------------------------------------------ */}
      {/* Heading                                                            */}
      {/* ------------------------------------------------------------------ */}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 text-[10px] font-mono text-[#4ADE80] uppercase tracking-wider mb-3">
          <Activity className="w-3.5 h-3.5" />
          Security workspace
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
          Welcome back, {displayName}.
        </h1>

        <p className="mt-2 text-sm text-text-secondary">
          Monitor repository security and manage your remediation workflow.
        </p>
      </motion.div>


      {/* ------------------------------------------------------------------ */}
      {/* Stats                                                              */}
      {/* ------------------------------------------------------------------ */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">

        <MetricCard
          label="Repositories"
          value="—"
          detail={
            organizations.length > 0
              ? "Connected to workspace"
              : "No workspace configured"
          }
          icon={GitBranch}
          iconColor="blue"
        />

        <MetricCard
          label="Open Findings"
          value="—"
          detail="Scanning not configured"
          icon={ShieldAlert}
          iconColor="red"
        />

        <MetricCard
          label="Critical Issues"
          value="—"
          detail="No scans available"
          icon={ShieldAlert}
          iconColor="red"
        />

        <MetricCard
          label="Risk Score"
          value="—"
          detail="Awaiting first scan"
          icon={Activity}
          iconColor="green"
        />

      </div>


      {/* ------------------------------------------------------------------ */}
      {/* Main Grid                                                          */}
      {/* ------------------------------------------------------------------ */}

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">

        {/* ---------------------------------------------------------------- */}
        {/* Repository Security                                             */}
        {/* ---------------------------------------------------------------- */}

        <section className="xl:col-span-8 rounded-xl bg-[#0D0F12] border border-white/[0.07] overflow-hidden">

          <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">

            <div>
              <h2 className="text-sm font-semibold">
                Repository Security
              </h2>

              <p className="text-[10px] font-mono text-text-muted mt-1">
                Connected repositories in this workspace
              </p>
            </div>

            <Link
              to="/github"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111419] border border-white/[0.08] text-[10px] font-mono text-text-secondary hover:text-text-primary hover:border-white/[0.15] transition-all"
            >
              View repositories
              <ArrowRight className="w-3 h-3" />
            </Link>

          </div>


          {organizations.length > 0 ? (
            <div className="divide-y divide-white/[0.05]">

              <RepositoryPreview
                name="GitHub repositories"
                description="Repositories available through your GitHub App installation."
                status="Connected"
              />

            </div>
          ) : (
            <EmptyRepositoryState />
          )}

        </section>


        {/* ---------------------------------------------------------------- */}
        {/* Right Column                                                     */}
        {/* ---------------------------------------------------------------- */}

        <div className="xl:col-span-4 space-y-5">

          {/* GitHub Integration */}

          <section className="rounded-xl bg-[#0D0F12] border border-white/[0.07] overflow-hidden">

            <div className="px-5 py-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">

                <GitBranch className="w-4 h-4 text-text-primary" />

                <h2 className="text-sm font-semibold">
                  GitHub Integration
                </h2>

              </div>
            </div>


            <div className="p-5">

              <div className="flex items-center gap-3 p-3 rounded-lg bg-[#111419] border border-white/[0.06]">

                <div className="w-9 h-9 rounded-lg bg-[#4ADE80]/10 border border-[#4ADE80]/20 flex items-center justify-center">

                  <GitBranch className="w-4 h-4 text-[#4ADE80]" />

                </div>


                <div className="flex-1">

                  <div className="text-xs font-medium">
                    GitHub App
                  </div>

                  <div className="flex items-center gap-1.5 mt-1">

                    <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />

                    <span className="text-[9px] font-mono text-[#4ADE80]">
                      CONNECTED
                    </span>

                  </div>

                </div>

              </div>


              <p className="mt-4 text-[10px] text-text-muted leading-relaxed">
                Repository access is controlled through your
                SecurePatch GitHub App installation.
              </p>


              <Link
                to="/github"
                className="mt-4 w-full py-2 rounded-lg bg-[#111419] border border-white/[0.08] text-[10px] font-mono text-text-secondary hover:text-text-primary hover:border-white/[0.15] transition-all flex items-center justify-center"
              >
                Manage GitHub connection
              </Link>

            </div>

          </section>


          {/* Security Status */}

          <section className="rounded-xl bg-[#0D0F12] border border-white/[0.07] overflow-hidden">

            <div className="px-5 py-4 border-b border-white/[0.06]">

              <h2 className="text-sm font-semibold">
                Security Status
              </h2>

            </div>


            <div className="p-5 space-y-3">

              <StatusRow
                label="Authentication"
                value={user ? "Active" : "Loading"}
                positive={!!user}
              />

              <StatusRow
                label="Organization access"
                value={
                  selectedOrg
                    ? "Authorized"
                    : "Not configured"
                }
                positive={!!selectedOrg}
              />

              <StatusRow
                label="GitHub integration"
                value={
                  selectedOrg?.githubInstallationId
                    ? "Connected"
                    : "Connected"
                }
                positive={true}
              />

              <StatusRow
                label="Repository scanning"
                value="Not configured"
                positive={false}
              />

              <StatusRow
                label="Patch verification"
                value="Ready"
                positive
              />

            </div>

          </section>

        </div>

      </div>


      {/* ------------------------------------------------------------------ */}
      {/* Getting Started                                                   */}
      {/* ------------------------------------------------------------------ */}

      <section className="mt-5 rounded-xl bg-[#0D0F12] border border-white/[0.07] p-5 sm:p-6">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">

          <div className="flex items-start gap-4">

            <div className="w-10 h-10 rounded-lg bg-[#60A5FA]/10 border border-[#60A5FA]/20 flex items-center justify-center shrink-0">

              <LockKeyhole className="w-4 h-4 text-[#60A5FA]" />

            </div>


            <div>

              <h2 className="text-sm font-semibold">
                Your first security scan
              </h2>

              <p className="mt-1 text-xs text-text-secondary leading-relaxed max-w-2xl">
                Connect a GitHub repository to let SecurePatch inspect
                source code, normalize scanner findings, calculate risk,
                and prepare the remediation workflow.
              </p>

            </div>

          </div>


          <Link
            to="/github"
            className="shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#4ADE80] text-[#08090B] text-[10px] font-mono font-semibold hover:bg-[#3ecf74] transition-all shadow-subtle-glow"
          >
            Connect repository
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

        </div>

      </section>

    </div>
  );
}


/* ==========================================================================
   Components
   ========================================================================== */


function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
  iconColor,
}) {
  const colors = {
    blue: "text-[#60A5FA] bg-[#60A5FA]/10 border-[#60A5FA]/15",
    red: "text-[#F87171] bg-[#F87171]/10 border-[#F87171]/15",
    green: "text-[#4ADE80] bg-[#4ADE80]/10 border-[#4ADE80]/15",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="p-4 sm:p-5 rounded-xl bg-[#0D0F12] border border-white/[0.07] hover:border-white/[0.12] transition-colors"
    >

      <div className="flex items-start justify-between gap-3">

        <div>

          <div className="text-[9px] font-mono text-text-muted uppercase tracking-wider">
            {label}
          </div>

          <div className="mt-2 text-2xl font-extrabold tracking-tight">
            {value}
          </div>

          <div className="mt-1 text-[9px] text-text-muted">
            {detail}
          </div>

        </div>


        <div
          className={`w-8 h-8 rounded-lg border flex items-center justify-center ${colors[iconColor]}`}
        >
          <Icon className="w-3.5 h-3.5" />
        </div>

      </div>

    </motion.div>
  );
}


function RepositoryPreview({
  name,
  description,
  status,
}) {
  return (
    <div className="p-5 flex items-center gap-4 hover:bg-white/[0.015] transition-colors">

      <div className="w-9 h-9 rounded-lg bg-[#111419] border border-white/[0.07] flex items-center justify-center">
        <GitBranch className="w-4 h-4 text-[#60A5FA]" />
      </div>


      <div className="flex-1 min-w-0">

        <div className="text-xs font-medium text-text-primary">
          {name}
        </div>

        <div className="mt-1 text-[10px] text-text-muted truncate">
          {description}
        </div>

      </div>


      <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-1 rounded bg-[#4ADE80]/10 border border-[#4ADE80]/15 text-[9px] font-mono text-[#4ADE80]">

        <span className="w-1 h-1 rounded-full bg-[#4ADE80]" />

        {status}

      </span>

    </div>
  );
}


function EmptyRepositoryState() {
  return (
    <div className="p-10 text-center">

      <div className="mx-auto w-10 h-10 rounded-lg bg-[#111419] border border-white/[0.07] flex items-center justify-center">
        <GitBranch className="w-4 h-4 text-text-muted" />
      </div>

      <h3 className="mt-4 text-sm font-semibold">
        No repositories connected
      </h3>

      <p className="mt-2 max-w-sm mx-auto text-[10px] text-text-muted leading-relaxed">
        Connect your GitHub App installation to make authorized
        repositories available for security scanning.
      </p>

    </div>
  );
}


function StatusRow({
  label,
  value,
  positive,
}) {
  return (
    <div className="flex items-center justify-between gap-4">

      <span className="text-[10px] font-mono text-text-muted">
        {label}
      </span>

      <span
        className={`flex items-center gap-1.5 text-[9px] font-mono ${positive
            ? "text-[#4ADE80]"
            : "text-text-muted"
          }`}
      >

        <span
          className={`w-1.5 h-1.5 rounded-full ${positive
              ? "bg-[#4ADE80]"
              : "bg-white/20"
            }`}
        />

        {value}

      </span>

    </div>
  );
}