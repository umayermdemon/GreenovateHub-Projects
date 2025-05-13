import SettingsForm from "@/components/modules/Settings/SettingsForm";
import { getMyProfile } from "@/services/auth";
import { TAuthor } from "@/types";

const Settings = async () => {
    const { data } = await getMyProfile();
    return (
        <div>
            <SettingsForm data={data as TAuthor} />
        </div>
    );
};

export default Settings;