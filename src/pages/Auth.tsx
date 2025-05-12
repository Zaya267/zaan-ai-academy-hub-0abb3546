
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { InfoIcon, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [userType, setUserType] = useState<"tutor" | "student" | "educator" | "admin" | "">("");
  const [isOrganization, setIsOrganization] = useState(false);
  const [orgName, setOrgName] = useState("");
  const [orgType, setOrgType] = useState<"school" | "tutor_center" | "">("");
  const [authError, setAuthError] = useState<string | null>(null);
  
  useEffect(() => {
    // Check if user is already logged in
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session) {
        setSession(data.session);
        navigate("/");
      }
    };
    
    getSession();
    
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        setSession(currentSession);
        if (currentSession) {
          navigate("/");
        }
      }
    );
    
    return () => subscription.unsubscribe();
  }, [navigate]);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });
      
      if (error) throw error;
      
      if (data?.user) {
        toast({
          title: "Login successful",
          description: "Welcome back to AtZaan AI Labs",
        });
        navigate("/");
      }
    } catch (error: any) {
      setAuthError(error.message || "Failed to log in. Please try again.");
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "Please check your credentials and try again.",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthError(null);
    
    // Validation
    if (registerPassword !== confirmPassword) {
      setAuthError("Passwords do not match");
      setLoading(false);
      return;
    }
    
    if (!userType) {
      setAuthError("Please select a user type");
      setLoading(false);
      return;
    }
    
    if (isOrganization && (!orgName || !orgType)) {
      setAuthError("Please complete all organization fields");
      setLoading(false);
      return;
    }
    
    try {
      // Register user
      const { data: userData, error: userError } = await supabase.auth.signUp({
        email: registerEmail,
        password: registerPassword,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            user_type: userType,
          },
        },
      });
      
      if (userError) throw userError;
      
      // If registering as an organization, create organization record
      if (isOrganization && userData.user) {
        const { error: orgError } = await supabase.from("organizations").insert({
          name: orgName,
          org_type: orgType,
          contact_email: registerEmail,
          contact_phone: phone,
        });
        
        if (orgError) throw orgError;
      }
      
      toast({
        title: "Registration successful",
        description: "Welcome to AtZaan AI Labs",
      });
      
    } catch (error: any) {
      setAuthError(error.message || "Failed to register. Please try again.");
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-md bg-gradient-to-br from-atzaan-light-purple to-atzaan-purple"></div>
          <h1 className="mt-4 text-3xl font-serif font-semibold text-atzaan-purple">AtZaan AI Labs</h1>
          <p className="mt-2 text-gray-600">AI education for everyone</p>
        </div>
        
        <Tabs defaultValue="login" className="mt-8">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Access your AtZaan AI Labs account</CardDescription>
              </CardHeader>
              <CardContent>
                {authError && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{authError}</AlertDescription>
                  </Alert>
                )}
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="you@example.com" 
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                      autoComplete="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-atzaan-purple hover:bg-atzaan-purple/90"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>Join AtZaan AI Labs</CardDescription>
              </CardHeader>
              <CardContent>
                {authError && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{authError}</AlertDescription>
                  </Alert>
                )}
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="registerEmail">Email</Label>
                    <Input 
                      id="registerEmail" 
                      type="email" 
                      placeholder="you@example.com" 
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      required
                      autoComplete="email"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="userType">I am a</Label>
                    <Select onValueChange={(value: any) => setUserType(value)} required>
                      <SelectTrigger id="userType">
                        <SelectValue placeholder="Select user type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tutor">Tutor</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="educator">Educator</SelectItem>
                        <SelectItem value="admin">Administrator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="isOrg" 
                      checked={isOrganization}
                      onCheckedChange={(checked) => setIsOrganization(checked === true)}
                    />
                    <Label htmlFor="isOrg" className="text-sm font-medium leading-none">
                      I am registering on behalf of a school or tutor center
                    </Label>
                  </div>
                  
                  {isOrganization && (
                    <div className="space-y-4 p-4 border rounded-lg border-slate-200 bg-slate-50">
                      <div className="space-y-2">
                        <Label htmlFor="orgName">Organization Name</Label>
                        <Input 
                          id="orgName" 
                          value={orgName}
                          onChange={(e) => setOrgName(e.target.value)}
                          required={isOrganization}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="orgType">Organization Type</Label>
                        <Select 
                          onValueChange={(value: any) => setOrgType(value)}
                          required={isOrganization}
                        >
                          <SelectTrigger id="orgType">
                            <SelectValue placeholder="Select organization type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="school">School</SelectItem>
                            <SelectItem value="tutor_center">Tutor Center</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="registerPassword">Password</Label>
                    <Input 
                      id="registerPassword" 
                      type="password"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                      autoComplete="new-password"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input 
                      id="confirmPassword" 
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      autoComplete="new-password"
                    />
                  </div>
                  
                  <Alert className="bg-blue-50 border-blue-200">
                    <InfoIcon className="h-4 w-4 text-blue-600" />
                    <AlertTitle className="text-blue-800">Privacy Notice</AlertTitle>
                    <AlertDescription className="text-blue-700 text-sm">
                      By registering, you agree to our Terms of Service and Privacy Policy.
                    </AlertDescription>
                  </Alert>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-atzaan-purple hover:bg-atzaan-purple/90"
                    disabled={loading}
                  >
                    {loading ? "Creating account..." : "Create account"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-4 text-center">
          <Button 
            variant="link" 
            onClick={() => navigate("/")}
            className="text-atzaan-purple"
          >
            Back to home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
