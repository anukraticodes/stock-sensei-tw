"use client"

import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from "@/contexts/theme-context"
import {
  Moon,
  Sun,
  Bell,
  Shield,
  User,
  Palette,
  Briefcase,
  TrendingUp,
  Database,
  Trash2,
  Plus,
  Lock,
  AlertTriangle,
} from "lucide-react"
import { useState, useEffect } from "react"

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [portfolios, setPortfolios] = useState([
    { id: 1, name: "Main Portfolio", value: "$10,234.56", stocks: 5 },
    { id: 2, name: "Tech Stocks", value: "$5,678.90", stocks: 3 },
    { id: 3, name: "Dividend Portfolio", value: "$3,456.78", stocks: 8 },
  ])

  useEffect(() => {
    setMounted(true)
  }, [])

  const deletePortfolio = (id: number) => {
    setPortfolios(portfolios.filter((p) => p.id !== id))
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600 mt-1">Loading...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your account and investment preferences.</p>
          </div>

          <div className="space-y-6">
            {/* Portfolio Management */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  <CardTitle className="dark:text-gray-100">Portfolio Management</CardTitle>
                </div>
                <CardDescription className="dark:text-gray-400">
                  Create, edit, and manage your investment portfolios.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium dark:text-gray-200">Your Portfolios</h4>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Portfolio
                  </Button>
                </div>

                <div className="space-y-3">
                  {portfolios.map((portfolio) => (
                    <div
                      key={portfolio.id}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div>
                        <div className="font-medium dark:text-gray-200">{portfolio.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {portfolio.value} • {portfolio.stocks} stocks
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deletePortfolio(portfolio.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t dark:border-gray-600">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium dark:text-gray-200">Default Portfolio</Label>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Portfolio to use for new stock purchases
                      </div>
                    </div>
                    <Select defaultValue="main">
                      <SelectTrigger className="w-48 dark:bg-gray-700 dark:border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                        <SelectItem value="main">Main Portfolio</SelectItem>
                        <SelectItem value="tech">Tech Stocks</SelectItem>
                        <SelectItem value="dividend">Dividend Portfolio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stock Market Preferences */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  <CardTitle className="dark:text-gray-100">Stock Market Preferences</CardTitle>
                </div>
                <CardDescription className="dark:text-gray-400">
                  Configure your trading and market data preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="dark:text-gray-200">Default Currency</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                        <SelectItem value="gbp">GBP (£)</SelectItem>
                        <SelectItem value="jpy">JPY (¥)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="dark:text-gray-200">Market Data Refresh</Label>
                    <Select defaultValue="1min">
                      <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                        <SelectItem value="30sec">30 seconds</SelectItem>
                        <SelectItem value="1min">1 minute</SelectItem>
                        <SelectItem value="5min">5 minutes</SelectItem>
                        <SelectItem value="15min">15 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base font-medium dark:text-gray-200">Real-time Quotes</Label>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Enable live market data updates</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base font-medium dark:text-gray-200">After-hours Trading</Label>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Show pre-market and after-hours data</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base font-medium dark:text-gray-200">Fractional Shares</Label>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Allow purchasing partial shares</div>
                  </div>
                  <Switch />
                </div>

                <div className="space-y-2">
                  <Label className="dark:text-gray-200">Risk Tolerance</Label>
                  <Select defaultValue="moderate">
                    <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                      <SelectItem value="conservative">Conservative</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="aggressive">Aggressive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Appearance Settings */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  <CardTitle className="dark:text-gray-100">Appearance</CardTitle>
                </div>
                <CardDescription className="dark:text-gray-400">
                  Customize how the application looks and feels.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base font-medium dark:text-gray-200">Dark Mode</Label>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Switch between light and dark themes</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} aria-label="Toggle dark mode" />
                    <Moon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="dark:text-gray-200">Chart Style</Label>
                  <Select defaultValue="line">
                    <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                      <SelectItem value="line">Line Chart</SelectItem>
                      <SelectItem value="candlestick">Candlestick</SelectItem>
                      <SelectItem value="bar">Bar Chart</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base font-medium dark:text-gray-200">Compact View</Label>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Show more data in less space</div>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  <CardTitle className="dark:text-gray-100">Notifications</CardTitle>
                </div>
                <CardDescription className="dark:text-gray-400">
                  Configure how you receive notifications and alerts.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base font-medium dark:text-gray-200">Price Alerts</Label>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Get notified when stocks reach target prices
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base font-medium dark:text-gray-200">Portfolio Updates</Label>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Daily portfolio performance summaries
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base font-medium dark:text-gray-200">Market News</Label>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Breaking market news and analysis</div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base font-medium dark:text-gray-200">Dividend Notifications</Label>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Upcoming dividend payments and ex-dates
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base font-medium dark:text-gray-200">Earnings Alerts</Label>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Earnings announcements for your stocks
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label className="dark:text-gray-200">Notification Method</Label>
                  <Select defaultValue="email">
                    <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                      <SelectItem value="email">Email Only</SelectItem>
                      <SelectItem value="push">Push Notifications</SelectItem>
                      <SelectItem value="both">Email + Push</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <CardTitle className="dark:text-gray-100">Account Information</CardTitle>
                </div>
                <CardDescription className="dark:text-gray-400">
                  Manage your personal information and account details.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="dark:text-gray-200">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="dark:text-gray-200">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="dark:text-gray-200">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="dark:text-gray-200">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone" className="dark:text-gray-200">
                    Timezone
                  </Label>
                  <Select defaultValue="est">
                    <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">Eastern Time (EST)</SelectItem>
                      <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                      <SelectItem value="cst">Central Time (CST)</SelectItem>
                      <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Privacy & Data */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  <CardTitle className="dark:text-gray-100">Privacy & Data</CardTitle>
                </div>
                <CardDescription className="dark:text-gray-400">
                  Control your data privacy and sharing preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base font-medium dark:text-gray-200">Data Analytics</Label>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Help improve our service with usage analytics
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base font-medium dark:text-gray-200">Marketing Communications</Label>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Receive investment tips and product updates
                    </div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base font-medium dark:text-gray-200">Third-party Data Sharing</Label>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Share anonymized data with research partners
                    </div>
                  </div>
                  <Switch />
                </div>

                <div className="pt-4 border-t dark:border-gray-600">
                  <Button variant="outline" className="w-full">
                    <Database className="h-4 w-4 mr-2" />
                    Download My Data
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Security */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  <CardTitle className="dark:text-gray-100">Security</CardTitle>
                </div>
                <CardDescription className="dark:text-gray-400">
                  Manage your security settings and authentication methods.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base font-medium dark:text-gray-200">Two-Factor Authentication</Label>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Add an extra layer of security</div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base font-medium dark:text-gray-200">Biometric Login</Label>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Use fingerprint or face recognition</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="dark:text-gray-200">
                    Current Password
                  </Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="dark:text-gray-200">
                    New Password
                  </Label>
                  <Input
                    id="newPassword"
                    type="password"
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="dark:text-gray-200">
                    Confirm New Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  />
                </div>

                <Button variant="outline" className="w-full">
                  <Lock className="h-4 w-4 mr-2" />
                  View Login History
                </Button>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="dark:bg-gray-800 dark:border-gray-700 border-red-200 dark:border-red-800">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <CardTitle className="dark:text-gray-100 text-red-600 dark:text-red-400">Danger Zone</CardTitle>
                </div>
                <CardDescription className="dark:text-gray-400">Irreversible and destructive actions.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">Delete Account</h4>
                  <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                    Once you delete your account, there is no going back. This will permanently delete your account, all
                    portfolios, transaction history, and remove all associated data.
                  </p>
                  <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </div>

                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Reset All Data</h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-4">
                    This will delete all your portfolios and transaction history but keep your account active.
                  </p>
                  <Button variant="outline" className="border-yellow-600 text-yellow-600 hover:bg-yellow-50">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Reset All Data
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end gap-4">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
