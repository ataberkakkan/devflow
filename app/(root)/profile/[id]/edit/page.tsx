import { auth } from "@/auth";
import ProfileForm from "@/components/forms/ProfileForm";
import ROUTES from "@/constants/routes";
import { getUser } from "@/lib/actions/user.action";
import { notFound, redirect } from "next/navigation";

const EditProfile = async ({ params }: RouteParams) => {
  const { id } = await params;

  if (!id) notFound();

  const session = await auth();
  const { success, data, error } = await getUser({ userId: id });

  if (!success)
    return (
      <div>
        <h1 className="h1-bold text-dark100_light900">{error?.message}</h1>
      </div>
    );

  if (session?.user?.id !== id) {
    redirect(ROUTES.HOME);
  }

  const { user } = data!;

  return (
    <main>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>

      <ProfileForm user={user} />
    </main>
  );
};
export default EditProfile;
