import { createWriteStream } from "fs";
import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";

const resolverFn = async (
    _,
    {
        firstName,
        lastName,
        username,
        email,
        password: newPassword,
        bio,
        avatar,
    },
    { loggedInUser }
) => {
    try {
        let avatarUrl = null;
        if (avatar) {
            const { filename, createReadStream } = await avatar;
            const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
            const readStream = createReadStream();
            const writeStream = createWriteStream(
                `${process.cwd()}/uploads/${newFilename}/`
            );
            readStream.pipe(writeStream);
            avatarUrl = `http://localhost:4000/static/${newFilename}`;
        }

        const uglyPassword = newPassword
            ? await bcrypt.hash(newPassword, 10)
            : null;

        const updatedUser = await client.user.update({
            where: {
                id: loggedInUser.id,
            },
            data: {
                firstName,
                lastName,
                username,
                email,
                bio,
                ...(uglyPassword && { password: uglyPassword }),
                ...(avatarUrl && { avatar: avatarUrl }),
            },
        });

        if (updatedUser.id) {
            return {
                ok: true,
            };
        } else {
            return {
                ok: false,
                error: "Could not update profile",
            };
        }
    } catch (e) {
        return {
            ok: false,
            error: e.message,
        };
    }
};

export default {
    Mutation: {
        editProfile: protectedResolver(resolverFn),
    },
};
