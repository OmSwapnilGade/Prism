import { useState } from "react";
import { componentRegistry } from "@/data/componentRegistry";
import { DocPage } from "@/docs/DocPage";
import { Tabs } from "@/components/Tabs/Tabs";

const meta = componentRegistry.find((c) => c.slug === "tabs")!;

export function TabsDoc() {
  const [tab, setTab] = useState("account");

  return (
    <DocPage
      meta={meta}
      preview={
        <div className="w-full max-w-lg">
          <Tabs
            items={[
              { value: "account", label: "Account" },
              { value: "password", label: "Password" },
              { value: "settings", label: "Settings" },
              { value: "billing", label: "Billing", disabled: true },
            ]}
            value={tab}
            onChange={setTab}
          >
            {tab === "account" && (
              <div className="p-4 rounded-[var(--prism-radius-lg)] border border-border bg-card/50">
                <h3 className="text-lg font-semibold mb-2">Account</h3>
                <p className="text-sm text-muted-foreground">
                  Update your account settings here. Try using your keyboard to navigate between tabs.
                </p>
              </div>
            )}
            {tab === "password" && (
              <div className="p-4 rounded-[var(--prism-radius-lg)] border border-border bg-card/50">
                <h3 className="text-lg font-semibold mb-2">Password</h3>
                <p className="text-sm text-muted-foreground">
                  Change your password here.
                </p>
              </div>
            )}
            {tab === "settings" && (
              <div className="p-4 rounded-[var(--prism-radius-lg)] border border-border bg-card/50">
                <h3 className="text-lg font-semibold mb-2">Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your notification preferences.
                </p>
              </div>
            )}
          </Tabs>
        </div>
      }
    />
  );
}
