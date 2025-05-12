"use client"
import GFormInput from "@/components/shared/Form/GFormInput";
import GFormTextarea from "@/components/shared/Form/GFormTextarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

const AdminSettings = () => {
    const form = useForm();
    const { control } = form;
    return (
        <div className="my-5">
            <Card>
                <CardHeader>
                    <CardTitle>General Information</CardTitle>
                    <CardDescription>Update your account information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Form {...form}>
                        <form>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="first-name">First name</Label>
                                    <GFormInput
                                        name="name"
                                        control={control}
                                        className="border-green-500 rounded-none"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="last-name">Address</Label>
                                    <GFormInput
                                        name="address"
                                        control={control}
                                        className="border-green-500 rounded-none"
                                        placeholder="Your Address"
                                    />                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-green-500" htmlFor="email">Email *</Label>
                                <GFormInput
                                    name="email"
                                    control={control}
                                    className="border-green-500 "
                                    placeholder="Your Email"
                                />                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <GFormTextarea
                                    name="bio"
                                    control={control}
                                    className="border-green-500 rounded-none"
                                    placeholder="Your Bio"
                                />
                            </div>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter>
                    <Button className="bg-green-500">Save Changes</Button>
                </CardFooter>
            </Card>

            <Card className="mt-3">
                <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>Update your password.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="current-password">Current password</Label>
                        <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="new-password">New password</Label>
                        <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm password</Label>
                        <Input id="confirm-password" type="password" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="bg-amber-500">Change Password</Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default AdminSettings;