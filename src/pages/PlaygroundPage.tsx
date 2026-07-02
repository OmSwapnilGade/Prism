import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { Textarea } from "@/components/Textarea/Textarea";
import { Badge } from "@/components/Badge/Badge";
import { Toggle } from "@/components/Toggle/Toggle";
import { Tabs } from "@/components/Tabs/Tabs";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/Card/Card";
import { Tooltip } from "@/components/Tooltip/Tooltip";
import { Modal } from "@/components/Modal/Modal";
import { ThemeRoulette } from "@/components/ThemeRoulette/ThemeRoulette";
import { useToast } from "@/components/Toast/Toast";
import { cn } from "@/utils/cn";

/**
 * Interactive playground — a single page where every component can be exercised
 * in real time. Doubles as a kitchen-sink demo and a stress test for the theme engine.
 */
export function PlaygroundPage() {
  const { toast } = useToast();
  const [tab, setTab] = useState("interactive");
  const [modalOpen, setModalOpen] = useState(false);
  const [toggleA, setToggleA] = useState(true);
  const [toggleB, setToggleB] = useState(false);

  return (
    <div className="space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Playground
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Test every component in real time. Switch themes and watch them all adapt instantly.
        </p>
      </motion.div>

      {/* Theme Roulette Feature */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
          <span className="text-2xl">🎰</span> Theme Roulette
        </h2>
        <div
          className={cn(
            "rounded-[var(--prism-radius-xl)] border border-border",
            "bg-card/50 p-8 md:p-12",
            "flex items-center justify-center"
          )}
        >
          <ThemeRoulette />
        </div>
      </motion.section>

      {/* Interactive playground */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
          <span className="text-2xl">🧪</span> Component Sandbox
        </h2>

        <Tabs
          items={[
            { value: "interactive", label: "Interactive" },
            { value: "form", label: "Form Demo" },
            { value: "feedback", label: "Feedback" },
          ]}
          value={tab}
          onChange={setTab}
        >
          {/* Interactive Tab */}
          {tab === "interactive" && (
            <div className="grid gap-6 md:grid-cols-2">
              {/* Buttons */}
              <Card>
                <CardHeader>
                  <h3 className="text-base font-semibold">Buttons</h3>
                  <p className="text-sm text-muted-foreground">All variants and sizes</p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="primary" size="sm">Primary SM</Button>
                    <Button variant="secondary">Secondary MD</Button>
                    <Button variant="danger" size="lg">Danger LG</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="primary" loading>Loading</Button>
                    <Button variant="secondary" disabled>Disabled</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Badges */}
              <Card>
                <CardHeader>
                  <h3 className="text-base font-semibold">Badges</h3>
                  <p className="text-sm text-muted-foreground">Semantic variants</p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="success">Active</Badge>
                    <Badge variant="warning">Pending</Badge>
                    <Badge variant="error">Failed</Badge>
                    <Badge variant="info">New</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Toggles */}
              <Card>
                <CardHeader>
                  <h3 className="text-base font-semibold">Toggles</h3>
                  <p className="text-sm text-muted-foreground">All sizes</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Toggle checked={toggleA} onChange={setToggleA} label="Notifications" size="sm" />
                    <Toggle checked={toggleB} onChange={setToggleB} label="Dark mode" />
                    <Toggle checked={false} onChange={() => {}} label="Disabled" disabled />
                  </div>
                </CardContent>
              </Card>

              {/* Tooltips */}
              <Card>
                <CardHeader>
                  <h3 className="text-base font-semibold">Tooltips</h3>
                  <p className="text-sm text-muted-foreground">All placements</p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4 justify-center py-4">
                    <Tooltip content="Top" side="top">
                      <Button variant="secondary" size="sm">Top</Button>
                    </Tooltip>
                    <Tooltip content="Bottom" side="bottom">
                      <Button variant="secondary" size="sm">Bottom</Button>
                    </Tooltip>
                    <Tooltip content="Left" side="left">
                      <Button variant="secondary" size="sm">Left</Button>
                    </Tooltip>
                    <Tooltip content="Right" side="right">
                      <Button variant="secondary" size="sm">Right</Button>
                    </Tooltip>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Form Demo Tab */}
          {tab === "form" && (
            <Card>
              <CardHeader>
                <h3 className="text-base font-semibold">Sample Form</h3>
                <p className="text-sm text-muted-foreground">
                  Inputs, textareas, and validation states
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-w-md">
                  <Input label="Full name" placeholder="Jane Doe" />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="jane@example.com"
                    helperText="We'll never share your email."
                  />
                  <Input
                    label="Username"
                    error="This username is already taken"
                    defaultValue="johndoe"
                  />
                  <Textarea
                    label="Bio"
                    placeholder="Tell us about yourself…"
                    autoResize
                    helperText="Markdown supported."
                  />
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex gap-3">
                  <Button
                    variant="primary"
                    onClick={() =>
                      toast({
                        title: "Form submitted!",
                        description: "Your data has been saved.",
                        variant: "success",
                      })
                    }
                  >
                    Submit
                  </Button>
                  <Button variant="ghost">Cancel</Button>
                </div>
              </CardFooter>
            </Card>
          )}

          {/* Feedback Tab */}
          {tab === "feedback" && (
            <div className="grid gap-6 md:grid-cols-2">
              {/* Toasts */}
              <Card>
                <CardHeader>
                  <h3 className="text-base font-semibold">Toasts</h3>
                  <p className="text-sm text-muted-foreground">Fire them all</p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      size="sm"
                      onClick={() =>
                        toast({ title: "Saved!", variant: "success" })
                      }
                    >
                      Success
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() =>
                        toast({
                          title: "Error occurred",
                          description: "Please try again.",
                          variant: "error",
                        })
                      }
                    >
                      Error
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        toast({
                          title: "Heads up!",
                          description: "Storage almost full.",
                          variant: "warning",
                        })
                      }
                    >
                      Warning
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() =>
                        toast({ title: "Default notification" })
                      }
                    >
                      Default
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Modal */}
              <Card>
                <CardHeader>
                  <h3 className="text-base font-semibold">Modal</h3>
                  <p className="text-sm text-muted-foreground">
                    Focus-trapped dialog with animations
                  </p>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
                  <Modal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title="Playground Modal"
                    description="This modal demonstrates focus trapping and Escape-to-close."
                    footer={
                      <div className="flex gap-3">
                        <Button
                          variant="ghost"
                          onClick={() => setModalOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() => {
                            setModalOpen(false);
                            toast({
                              title: "Confirmed!",
                              variant: "success",
                            });
                          }}
                        >
                          Confirm
                        </Button>
                      </div>
                    }
                  >
                    <p className="text-sm text-muted-foreground">
                      Try pressing Tab to cycle through focusable elements, or
                      Escape to close. The focus is trapped inside.
                    </p>
                  </Modal>
                </CardContent>
              </Card>
            </div>
          )}
        </Tabs>
      </motion.section>
    </div>
  );
}
