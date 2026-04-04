
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { type Profile, ProfileFormData } from "@/types/profile";
import { ProfileView } from "@/components/profile/ProfileView";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { PasswordUpdateModal } from "@/components/profile/PasswordUpdateModal";

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@housingfinancebank.com",
    phone: "+1 (555) 123-4567",
    position: "Senior Sales Manager",
    department: "Sales",
    bio: "Experienced sales professional with over 8 years in the industry. Passionate about building relationships and driving growth through strategic partnerships.",
    avatar: "",
    receiveEmails: true,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-20T14:30:00Z"
  });

  const handleSave = (formData: ProfileFormData) => {
    const updatedProfile: Profile = {
      ...profile,
      ...formData,
      updatedAt: new Date().toISOString()
    };

    setProfile(updatedProfile);
    setIsEditing(false);
    
    toast({
      title: "Success",
      description: "Profile updated successfully!"
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handlePasswordUpdate = () => {
    setIsPasswordModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Profile</h1>
      </div>

      {isEditing ? (
        <ProfileForm
          profile={profile}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <ProfileView
          profile={profile}
          onEdit={handleEdit}
          onPasswordUpdate={handlePasswordUpdate}
        />
      )}

      <PasswordUpdateModal
        open={isPasswordModalOpen}
        onOpenChange={setIsPasswordModalOpen}
      />
    </div>
  );
};

export default Profile;
