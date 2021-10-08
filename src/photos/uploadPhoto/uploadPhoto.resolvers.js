import client from "../../client";
import { uploadToS3 } from "../../shared/sheard.utils";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

const resolverFn = async (_, { file, caption }, { loggedInUser }) => {
    let hashtagObj = [];
    if (caption) {
        // parse caption
        hashtagObj = processHashtags(caption);
    }

    const fileUrl = await uploadToS3(file, loggedInUser.id, "uploads");
    // get or create Hashtags
    return await client.photo.create({
        data: {
            file: fileUrl,
            caption,
            user: {
                connect: {
                    id: loggedInUser.id,
                },
            },
            ...(hashtagObj.length > 0 && {
                hashtags: {
                    connectOrCreate: hashtagObj,
                },
            }),
        },
    });

    // save the photo WITH the parsed hashtags
    // add the photo to the hashtags
};

export default {
    Mutation: {
        uploadPhoto: protectedResolver(resolverFn),
    },
};
