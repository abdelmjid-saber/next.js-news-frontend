import { ChangePasswordForm } from "@/components/change-password-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UpdateUserForm from "@/components/update-user-form";
import { getCurrentUser } from "@/lib/session";

export default async function Page() {
  const user = await getCurrentUser();
  return (
    <div className="container space-y-8 mt-10">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Settings</h2>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>Update user</CardTitle>
          </CardHeader>
          <CardContent>
            <UpdateUserForm user={user} />
          </CardContent>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>Change password</CardTitle>
          </CardHeader>
          <CardContent>
            <ChangePasswordForm />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
