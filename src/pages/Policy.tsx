
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Shield, Cookie, Eye, Lock, Mail, Scale } from "lucide-react";

const Policy = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
          <Link to="/" className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link to="/" className="text-xl font-bold text-primary flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-primary"></div>
            Rafiki Fanaka System - RaFa
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-8 py-8 max-w-4xl">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy & Cookie Policy</h1>
            <p className="text-muted-foreground text-lg">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="grid gap-6">
            {/* Privacy Policy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy Policy
                </CardTitle>
                <CardDescription>
                  How we collect, use, and protect your personal information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Information We Collect</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Personal information you provide (name, email, phone number)</li>
                    <li>• Account information and preferences</li>
                    <li>• Usage data and analytics</li>
                    <li>• Device and browser information</li>
                    <li>• Communication records with our support team</li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">How We Use Your Information</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Provide and improve our services</li>
                    <li>• Communicate with you about your account</li>
                    <li>• Send important updates and notifications</li>
                    <li>• Analyze usage patterns to enhance user experience</li>
                    <li>• Comply with legal obligations</li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">Data Protection</h3>
                  <p className="text-muted-foreground">
                    We implement industry-standard security measures to protect your data, including encryption, 
                    secure servers, and regular security audits. We never sell your personal information to third parties.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Cookie Policy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cookie className="h-5 w-5" />
                  Cookie Policy
                </CardTitle>
                <CardDescription>
                  How we use cookies and similar technologies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">What Are Cookies</h3>
                  <p className="text-muted-foreground">
                    Cookies are small text files stored on your device when you visit our website. 
                    They help us provide you with a better experience by remembering your preferences and usage patterns.
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">Types of Cookies We Use</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-primary pl-4">
                      <h4 className="font-medium">Essential Cookies</h4>
                      <p className="text-sm text-muted-foreground">
                        Required for the website to function properly. These cannot be disabled.
                      </p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-medium">Analytics Cookies</h4>
                      <p className="text-sm text-muted-foreground">
                        Help us understand how visitors interact with our website.
                      </p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-medium">Preference Cookies</h4>
                      <p className="text-sm text-muted-foreground">
                        Remember your settings and preferences for a better experience.
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">Managing Cookies</h3>
                  <p className="text-muted-foreground">
                    You can control cookie settings through your browser preferences. However, 
                    disabling certain cookies may affect website functionality.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Data Rights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Your Data Rights
                </CardTitle>
                <CardDescription>
                  You have control over your personal information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <strong>Access:</strong> Request a copy of your personal data</li>
                  <li>• <strong>Correction:</strong> Update inaccurate or incomplete information</li>
                  <li>• <strong>Deletion:</strong> Request deletion of your personal data</li>
                  <li>• <strong>Portability:</strong> Receive your data in a structured format</li>
                  <li>• <strong>Objection:</strong> Object to processing of your personal data</li>
                </ul>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Contact Us
                </CardTitle>
                <CardDescription>
                  Questions about this policy or your data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about this Privacy Policy or Cookie Policy, 
                  or if you want to exercise your data rights, please contact us:
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p>Email: privacy@amortisystem.com</p>
                  <p>Address: 123 Business Street, Suite 100, City, State 12345</p>
                  <p>Phone: +1 (555) 123-4567</p>
                </div>
              </CardContent>
            </Card>

            {/* Legal Compliance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5" />
                  Legal Compliance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This policy complies with applicable data protection laws including GDPR, CCPA, 
                  and other regional privacy regulations. We reserve the right to update this policy 
                  as needed to reflect changes in our practices or legal requirements.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center pt-8">
            <Link to="/">
              <Button size="lg">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Policy;
